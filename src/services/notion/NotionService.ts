import { Client } from '@notionhq/client';
import { AuditResult } from '@/types';

export class NotionService {
  private notion: Client;
  private databaseId: string;

  constructor(apiKey: string, databaseId: string) {
    this.notion = new Client({ auth: apiKey });
    this.databaseId = databaseId;
  }

  /**
   * Notion 페이지 ID로 진단 결과(JSON)를 조회
   */
  /**
   * Notion 페이지 ID로 진단 결과(JSON)를 조회
   */
  async getAuditResult(pageId: string): Promise<AuditResult | null> {
    console.log('NotionService keys:', Object.keys(this.notion));
    if (this.notion.databases) {
      console.log('NotionService.databases keys:', Object.keys(this.notion.databases));
    } else {
      console.log('NotionService.databases is undefined');
    }

    try {
      let jsonContent = '';
      let hasMore = true;
      let startCursor: string | undefined = undefined;

      // 페이지의 모든 블록을 순회하며 JSON 코드를 찾음 (청크로 나뉜 경우 모두 합침)
      while (hasMore) {
        const response = await this.notion.blocks.children.list({
          block_id: pageId,
          start_cursor: startCursor,
        });

        for (const block of response.results) {
          if ('type' in block && block.type === 'code' && block.code.language === 'json') {
            const chunk = block.code.rich_text.map(t => t.plain_text).join('');
            jsonContent += chunk;
          }
        }

        hasMore = response.has_more;
        startCursor = response.next_cursor || undefined;
      }

      if (!jsonContent) {
        console.error('No JSON block found in Notion page');
        return null;
      }

      // 3. JSON 파싱
      try {
        return JSON.parse(jsonContent);
      } catch (e) {
        console.error('Failed to parse JSON from Notion:', e);
        return null;
      }
    } catch (error) {
      console.error('Error fetching from Notion:', error);
      return null;
    }
  }

  /**
   * 진단 결과를 Notion 데이터베이스에 저장
   */
  async saveAuditResult(result: AuditResult, reportUrl?: string) {
    try {
      // 1. 위반 사항을 Impact 별로 정렬 및 그룹화 (중복 제거)
      const groupedViolations = result.violations.reduce((acc, v) => {
        const impact = v.impact || 'minor';
        if (!acc[impact]) acc[impact] = {};

        // KWCAG ID와 이름으로 유니크 키 생성
        const key = `${v.kwcagId} ${v.kwcagName}`;
        if (!acc[impact][key]) {
          acc[impact][key] = {
            count: 0,
            description: v.description,
            pages: new Set<string>()
          };
        }
        acc[impact][key].count++;
        acc[impact][key].pages.add(v.pageUrl);
        return acc;
      }, {} as Record<string, Record<string, { count: number; description: string; pages: Set<string> }>>);

      // Notion Block 생성
      const children: any[] = [
        {
          object: 'block',
          type: 'heading_2',
          heading_2: { rich_text: [{ text: { content: '📊 진단 결과 요약' } }] },
        },
        {
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: { rich_text: [{ text: { content: `총 페이지 수: ${result.pages.length}개` } }] },
        },
        {
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: { rich_text: [{ text: { content: `발견된 총 위반: ${result.totalViolations}건` } }] },
        },
        {
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: { rich_text: [{ text: { content: `SEO 점수: ${result.seoResult?.overallScore.seo || 0}점` } }] },
        },
        {
          object: 'block',
          type: 'heading_2',
          heading_2: { rich_text: [{ text: { content: '🚨 상세 위반 사항 (Impact별 정렬)' } }] },
        },
      ];

      // Impact 순서: Critical -> Serious -> Moderate -> Minor
      const impactOrder = ['critical', 'serious', 'moderate', 'minor'];
      const impactLabels: Record<string, string> = {
        critical: '🔴 치명적 (Critical)',
        serious: '🟠 중요 (Serious)',
        moderate: '🟡 보통 (Moderate)',
        minor: '⚪ 낮음 (Minor)'
      };

      impactOrder.forEach(impact => {
        const violations = groupedViolations[impact];
        if (violations && Object.keys(violations).length > 0) {
          // Impact Heading
          children.push({
            object: 'block',
            type: 'heading_3',
            heading_3: {
              rich_text: [{ text: { content: `${impactLabels[impact]} - ${Object.values(violations).reduce((sum, v) => sum + v.count, 0)}건` } }]
            },
          });

          // Violation Items
          Object.entries(violations).forEach(([title, data]) => {
            children.push({
              object: 'block',
              type: 'toggle',
              toggle: {
                rich_text: [{ text: { content: `[${data.count}건] ${title}` } }],
                children: [
                  {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: { rich_text: [{ text: { content: `설명: ${data.description.substring(0, 100)}...` } }] }
                  },
                  {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: { rich_text: [{ text: { content: `발견된 페이지 (${data.pages.size}개):` } }] }
                  },
                  ...Array.from(data.pages).slice(0, 5).map(url => ({
                    object: 'block',
                    type: 'bulleted_list_item',
                    bulleted_list_item: {
                      rich_text: [{
                        text: { content: url, link: { url: url } }
                      }]
                    }
                  })),
                  data.pages.size > 5 ? {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: { rich_text: [{ text: { content: `...외 ${data.pages.size - 5}개 페이지` } }] }
                  } : null
                ].filter(Boolean)
              }
            });
          });
        }
      });

      // JSON 데이터 (마지막에 추가)
      children.push({
        object: 'block',
        type: 'heading_2',
        heading_2: { rich_text: [{ text: { content: '💾 원본 데이터 (JSON)' } }] },
      });

      const jsonString = JSON.stringify(result, null, 2);
      const jsonChunks = this.createRichTextChunks(jsonString);

      // Notion Block limit: rich_text array size <= 100
      const richTextLimit = 100;
      for (let i = 0; i < jsonChunks.length; i += richTextLimit) {
        const chunkBatch = jsonChunks.slice(i, i + richTextLimit);
        children.push({
          object: 'block',
          type: 'code',
          code: {
            language: 'json',
            rich_text: chunkBatch,
            caption: i > 0 ? [{ text: { content: `(Part ${Math.floor(i / richTextLimit) + 1})` } }] : [],
          },
        });
      }

      const response = await this.notion.pages.create({
        parent: { database_id: this.databaseId },
        properties: {
          'Page URL': {
            title: [{ text: { content: result.pages[0]?.url || 'Unknown URL' } }],
          },
          'Date': {
            date: { start: new Date().toISOString() },
          },
          'Score (Total)': {
            number: result.seoResult?.overallScore.total || 0,
          },
          'Violations': {
            number: result.totalViolations,
          },
          'Status': {
            status: { name: '완료' },
          },
          'Report Link': {
            url: reportUrl || null,
          }
        },
        children: children.slice(0, 100), // First 100 blocks
      });

      const pageId = response.id;

      // 100개 이상의 블록이 있다면 추가로 저장 (Chunking)
      if (children.length > 100) {
        const remainingBlocks = children.slice(100);
        // Notion API limit: append takes up to 100 blocks at a time
        const chunkSize = 100;
        for (let i = 0; i < remainingBlocks.length; i += chunkSize) {
          const chunk = remainingBlocks.slice(i, i + chunkSize);
          await this.notion.blocks.children.append({
            block_id: pageId,
            children: chunk,
          });
        }
      }

      return pageId;
    } catch (error) {
      console.error('Error saving to Notion:', error);
      throw error;
    }
  }

  /**
   * 페이지 속성 업데이트 (예: Report Link 추가)
   */
  async updatePageProperty(pageId: string, properties: any) {
    try {
      await this.notion.pages.update({
        page_id: pageId,
        properties: properties,
      });
    } catch (error) {
      console.error('Error updating Notion page:', error);
      // 업데이트 실패는 전체 실패로 간주하지 않음 (로깅만)
    }
  }

  /**
   * Notion Rich Text 제한(2000자) 처리 헬퍼
   */
  private createRichTextChunks(content: string): any[] {
    const output = [];
    const maxLength = 2000;

    for (let i = 0; i < content.length; i += maxLength) {
      output.push({
        text: {
          content: content.substring(i, i + maxLength)
        }
      });
    }
    return output;
  }

  /**
   * 히스토리 목록 조회 (Deleted=false 인 항목만)
   */
  /**
   * 히스토리 목록 조회 (Deleted=false 인 항목만)
   */
  async getAuditHistory() {
    console.log('getAuditHistory - databaseId:', this.databaseId);
    console.log('Notion Client keys:', Object.keys(this.notion));

    // UUID Format Helper
    const formatUUID = (id: string) => {
      if (id.length === 32) {
        return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;
      }
      return id;
    };

    const formattedDbId = formatUUID(this.databaseId);
    console.log('Formatted DB ID:', formattedDbId);

    try {
      /* 
         Fallback: Using 'request' method explicitly.
         'databases.query' might be missing at runtime due to bundling/version issues.
      */
      const response = await this.notion.request({
        path: `databases/${formattedDbId}/query`,
        method: 'post',
        body: {
          filter: {
            property: 'Deleted',
            checkbox: {
              equals: false,
            },
          },
          sorts: [
            {
              property: 'Date',
              direction: 'descending',
            },
          ],
        },
      }) as any;

      return response.results.map((page: any) => {
        const props = page.properties;
        return {
          id: page.id,
          url: props['Page URL']?.title[0]?.plain_text || '',
          date: props['Date']?.date?.start || '',
          score: props['Score (Total)']?.number || 0,
          violationCount: props['Violations']?.number || 0,
          reportLink: props['Report Link']?.url || null,
        };
      });
    } catch (error) {
      console.error('Error fetching audit history:', error);
      return [];
    }
  }

  /**
   * 페이지 Soft Delete (Deleted=true 업데이트)
   */
  async softDeletePage(pageId: string) {
    try {
      await this.notion.pages.update({
        page_id: pageId,
        properties: {
          'Deleted': {
            checkbox: true,
          },
        },
      });
      return true;
    } catch (error) {
      console.error('Error soft deleting page:', error);
      return false;
    }
  }
}
