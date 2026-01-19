import ExcelJS from 'exceljs';
import { Violation, PageInfo, AuditResult } from '@/types';
import { SEOAuditResult } from '@/types/seo';

export interface ExcelGeneratorOptions {
  includeViolations: boolean;
  platform: string;
  inspector: string;
}

export class ExcelGenerator {
  private options: ExcelGeneratorOptions;

  constructor(options: ExcelGeneratorOptions) {
    this.options = options;
  }

  // IA 모드: 기본 엑셀 생성 (1~4뎁스, 페이지명, URL)
  async generateIAReport(pages: PageInfo[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('IA 구조');

    // 헤더 설정
    worksheet.columns = [
      { header: '1뎁스', key: 'depth1', width: 20 },
      { header: '2뎁스', key: 'depth2', width: 20 },
      { header: '3뎁스', key: 'depth3', width: 20 },
      { header: '4뎁스', key: 'depth4', width: 20 },
      { header: '페이지명', key: 'title', width: 40 },
      { header: 'URL', key: 'url', width: 60 },
    ];

    // 헤더 스타일링
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4472C4' },
    };
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

    // 데이터 추가
    pages.forEach((page) => {
      worksheet.addRow({
        depth1: page.depth1,
        depth2: page.depth2,
        depth3: page.depth3,
        depth4: page.depth4,
        title: page.title,
        url: page.url,
      });
    });

    // 필터 적용
    worksheet.autoFilter = {
      from: 'A1',
      to: 'F1',
    };

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  /**
   * 진단 리포트 생성 (접근성 전용 또는 통합)
   */
  async generateAuditReport(result: AuditResult): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();

    // 1. 접근성 진단 결과 시트
    this.addAccessibilitySheet(workbook, result.violations);

    // 2. 요약 시트
    this.addSummarySheet(workbook, result);

    // 3. IA 구조 시트
    this.addIASheet(workbook, result.pages);

    // 4. SEO/AI 결과가 있으면 추가
    if (result.seoResult) {
      this.addSEOAnalysisSheet(workbook, result.seoResult);
      this.addAIOptimizationSheet(workbook, result.seoResult);
      this.addSEOScoreSheet(workbook, result.seoResult);
    }

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  /**
   * 접근성 진단 결과 시트 추가 (private)
   */
  private addAccessibilitySheet(workbook: ExcelJS.Workbook, violations: Violation[]): void {
    const auditSheet = workbook.addWorksheet('접근성 진단 결과');
    auditSheet.columns = [
      { header: '1뎁스', key: 'depth1', width: 15 },
      { header: '2뎁스', key: 'depth2', width: 15 },
      { header: '3뎁스', key: 'depth3', width: 15 },
      { header: '4뎁스', key: 'depth4', width: 15 },
      { header: '페이지명', key: 'pageTitle', width: 30 },
      { header: 'URL', key: 'pageUrl', width: 50 },
      { header: '플랫폼', key: 'platform', width: 10 },
      { header: '점검자', key: 'inspector', width: 15 },
      { header: '점검일', key: 'inspectionDate', width: 15 },
      { header: '번호', key: 'violationNumber', width: 8 },
      { header: '지침명', key: 'kwcagName', width: 25 },
      { header: '영향도', key: 'impactKo', width: 12 },
      { header: '오류내용', key: 'description', width: 50 },
      { header: '영향받는 요소 코드', key: 'affectedCode', width: 60 },
      { header: '해결방안', key: 'help', width: 50 },
    ];

    const headerRow = auditSheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF2E7D32' },
    };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

    const kwcagIdMap: Record<string, number> = {
      '1.1.1': 1, '1.2.1': 2, '1.3.2': 3, '1.3.1': 4,
      '1.4.2': 6, '1.4.3': 7, '1.4.1': 8, '1.4.4': 9,
      '2.1.1': 10, '2.1.2': 11, '2.1.3': 12, '2.1.4': 13,
      '2.2.1': 14, '2.2.2': 15, '2.3.1': 16, '2.4.1': 17,
      '2.4.2': 18, '2.4.3': 19, '2.4.4': 20, '2.5.1': 21,
      '2.5.2': 22, '2.5.3': 23, '2.5.4': 24, '3.1.1': 25,
      '3.2.1': 26, '3.4.1': 28, '3.4.2': 29, '3.4.3': 30,
      '3.4.4': 31, '4.1.1': 32, '4.1.2': 33,
    };

    violations.forEach((violation) => {
      const mappedNumber = kwcagIdMap[violation.kwcagId] || '-';
      const impactKo = {
        critical: '치명적',
        serious: '중요',
        moderate: '보통',
        minor: '낮음',
      }[violation.impact] || violation.impact;

      const row = auditSheet.addRow({
        depth1: violation.depth1,
        depth2: violation.depth2,
        depth3: violation.depth3,
        depth4: violation.depth4,
        pageTitle: violation.pageTitle,
        pageUrl: violation.pageUrl,
        platform: violation.platform,
        inspector: violation.inspector,
        inspectionDate: violation.inspectionDate,
        violationNumber: mappedNumber,
        kwcagName: `${violation.kwcagId} ${violation.kwcagName}`,
        impactKo: impactKo,
        description: violation.description,
        affectedCode: violation.affectedCode,
        help: violation.help,
      });

      const impactColors: Record<string, string> = {
        critical: 'FFFF0000',
        serious: 'FFFF6600',
        moderate: 'FFFFCC00',
        minor: 'FF99CC00',
      };

      if (violation.impact && impactColors[violation.impact]) {
        row.getCell('kwcagName').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: impactColors[violation.impact] },
        };
      }
    });

    auditSheet.autoFilter = { from: 'A1', to: 'N1' };
  }

  /**
   * 요약 시트 추가 (private)
   */
  private addSummarySheet(workbook: ExcelJS.Workbook, result: AuditResult): void {
    const summarySheet = workbook.addWorksheet('요약');
    summarySheet.columns = [
      { header: '항목', key: 'item', width: 30 },
      { header: '값', key: 'value', width: 20 },
    ];

    summarySheet.addRow({ item: '진단 시작 시간', value: result.startTime });
    summarySheet.addRow({ item: '진단 종료 시간', value: result.endTime });
    summarySheet.addRow({ item: '총 페이지 수', value: result.totalPages });
    summarySheet.addRow({ item: '총 위반 사항', value: result.totalViolations });
    summarySheet.addRow({ item: '', value: '' });
    summarySheet.addRow({ item: '--- 원칙별 위반 ---', value: '' });

    Object.entries(result.summary?.byPrinciple || {}).forEach(([principle, count]) => {
      summarySheet.addRow({ item: principle, value: count });
    });

    summarySheet.addRow({ item: '', value: '' });
    summarySheet.addRow({ item: '--- 영향도별 위반 ---', value: '' });

    const impactLabels: Record<string, string> = {
      critical: '심각',
      serious: '높음',
      moderate: '보통',
      minor: '낮음',
    };

    Object.entries(result.summary?.byImpact || {}).forEach(([impact, count]) => {
      summarySheet.addRow({ item: impactLabels[impact] || impact, value: count });
    });
  }

  /**
   * IA 구조 시트 추가 (private)
   */
  private addIASheet(workbook: ExcelJS.Workbook, pages: PageInfo[]): void {
    const iaSheet = workbook.addWorksheet('IA 구조');
    iaSheet.columns = [
      { header: '1뎁스', key: 'depth1', width: 20 },
      { header: '2뎁스', key: 'depth2', width: 20 },
      { header: '3뎁스', key: 'depth3', width: 20 },
      { header: '4뎁스', key: 'depth4', width: 20 },
      { header: '페이지명', key: 'title', width: 40 },
      { header: 'URL', key: 'url', width: 60 },
    ];

    pages.forEach((page) => {
      iaSheet.addRow({
        depth1: page.depth1,
        depth2: page.depth2,
        depth3: page.depth3,
        depth4: page.depth4,
        title: page.title,
        url: page.url,
      });
    });
  }

  /**
   * SEO/AI 통합 리포트 생성 (신규)
   * @param seoResult SEO/AI 진단 결과
   * @returns Excel 파일 버퍼
   */
  async generateSEOReport(seoResult: SEOAuditResult): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();

    // 1. SEO 분석 시트
    this.addSEOAnalysisSheet(workbook, seoResult);

    // 2. AI 최적화 시트
    this.addAIOptimizationSheet(workbook, seoResult);

    // 3. 종합 점수 시트
    this.addSEOScoreSheet(workbook, seoResult);

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  /**
   * SEO 분석 시트 추가 (private)
   */
  private addSEOAnalysisSheet(workbook: ExcelJS.Workbook, result: SEOAuditResult): void {
    const sheet = workbook.addWorksheet('SEO 분석');

    // 타이틀
    sheet.mergeCells('A1:D1');
    const titleCell = sheet.getCell('A1');
    titleCell.value = '📊 SEO 분석 리포트';
    titleCell.font = { size: 16, bold: true };
    titleCell.alignment = { horizontal: 'center' };

    sheet.getCell('A2').value = '진단 URL:';
    sheet.getCell('B2').value = result.url || '-';
    sheet.getCell('A3').value = '진단 일시:';

    // Date 객체인지 확인 (직렬화 시 문자열로 변환될 수 있음)
    const timestamp = result.timestamp ? new Date(result.timestamp) : new Date();
    sheet.getCell('B3').value = timestamp.toLocaleString('ko-KR');

    // Sitemap 섹션
    sheet.getCell('A5').value = '1. Sitemap.xml 분석';
    sheet.getCell('A5').font = { size: 14, bold: true };

    const sitemapRows = [
      ['항목', '상태', '상세'],
      ['파일 존재', (result.sitemap?.exists) ? '✅' : '❌', (result.sitemap?.exists) ? '정상' : '파일 없음'],
      ['XML 유효성', (result.sitemap?.xmlValid) ? '✅' : '❌', (result.sitemap?.xmlValid) ? '유효한 XML' : 'XML 파싱 실패'],
      ['robots.txt 연동', (result.sitemap?.robotsTxtReference) ? '✅' : '⚠️', (result.sitemap?.robotsTxtReference) ? '연동됨' : '미연동'],
      ['전체 URL 수', '', (result.sitemap?.totalUrls || 0).toString() + '개'],
      ['샘플 검증', '', `${(result.sitemap?.sampledUrls || []).filter(u => u.statusCode === 200).length}/${(result.sitemap?.sampledUrls || []).length} 정상`],
      ['종합 점수', '🎯', (result.sitemap?.score || 0).toString() + '/100'],
    ];

    let row = 6;
    sitemapRows.forEach((data, idx) => {
      sheet.getRow(row).values = data;
      if (idx === 0) {
        sheet.getRow(row).font = { bold: true };
        sheet.getRow(row).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9E1F2' } };
      }
      row++;
    });

    // 메타데이터 섹션
    row += 2;
    sheet.getCell(`A${row}`).value = '2. 메타데이터 분석';
    sheet.getCell(`A${row}`).font = { size: 14, bold: true };
    row++;

    const metaRows = [
      ['항목', '상태', '길이/상세'],
      ['Title', result.metadata?.title?.exists ? (result.metadata.title.optimal ? '✅ 최적' : '⚠️ 조정 필요') : '❌', (result.metadata?.title?.length || 0) + '자 (권장: 50~60자)'],
      ['Description', result.metadata?.description?.exists ? (result.metadata.description.optimal ? '✅ 최적' : '⚠️ 조정 필요') : '❌', (result.metadata?.description?.length || 0) + '자 (권장: 150~160자)'],
      ['Canonical URL', result.metadata?.canonical?.exists ? '✅' : '❌', result.metadata?.canonical?.url || '미설정'],
      ['OG: Title', result.metadata?.openGraph?.hasTitle ? '✅' : '❌', ''],
      ['OG: Description', result.metadata?.openGraph?.hasDescription ? '✅' : '❌', ''],
      ['OG: Image', result.metadata?.openGraph?.hasImage ? '✅' : '❌', ''],
      ['OG: URL', result.metadata?.openGraph?.hasUrl ? '✅' : '❌', ''],
      ['Viewport', result.metadata?.viewport?.mobileFriendly ? '✅ 모바일 친화적' : (result.metadata?.viewport?.exists ? '⚠️' : '❌'), ''],
      ['종합 점수', '🎯', (result.metadata?.score || 0) + '/100'],
    ];

    metaRows.forEach((data, idx) => {
      sheet.getRow(row).values = data;
      if (idx === 0) {
        sheet.getRow(row).font = { bold: true };
        sheet.getRow(row).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9E1F2' } };
      }
      row++;
    });

    sheet.getColumn('A').width = 25;
    sheet.getColumn('B').width = 20;
    sheet.getColumn('C').width = 40;
    sheet.getColumn('D').width = 20;
  }

  /**
   * AI 최적화 시트 추가 (private)
   */
  private addAIOptimizationSheet(workbook: ExcelJS.Workbook, result: SEOAuditResult): void {
    const sheet = workbook.addWorksheet('AI 최적화');

    // 타이틀
    sheet.mergeCells('A1:C1');
    const titleCell = sheet.getCell('A1');
    titleCell.value = '🤖 AI 친화도 분석 (GEO)';
    titleCell.font = { size: 16, bold: true };
    titleCell.alignment = { horizontal: 'center' };

    sheet.getCell('A3').value = 'llms.txt 파일 분석';
    sheet.getCell('A3').font = { size: 14, bold: true };

    const llmsRows = [
      ['항목', '상태/값'],
      ['파일 존재', result.llmsTxt?.exists ? '✅ 존재' : '❌ 없음'],
      ['H1 헤더', result.llmsTxt?.structure?.hasH1 ? '✅' : '❌'],
      ['H2 헤더', result.llmsTxt?.structure?.hasH2 ? '✅' : '❌'],
      ['H3 헤더', result.llmsTxt?.structure?.hasH3 ? '✅' : '❌'],
      ['총 단어 수', (result.llmsTxt?.structure?.wordCount || 0) + '개 (권장: 100~500개)'],
      ['단락 수', (result.llmsTxt?.structure?.paragraphCount || 0) + '개'],
      ['', ''],
      ['품질 평가', ''],
      ['상단 요약', result.llmsTxt?.contentQuality?.hasSummary ? '✅ 있음' : '❌ 없음'],
      ['키워드 밀도', result.llmsTxt?.contentQuality?.hasKeywords ? '✅ 충분' : '⚠️ 부족'],
      ['구조 점수', (result.llmsTxt?.contentQuality?.structureScore || 0) + '/30'],
      ['가독성 점수', (result.llmsTxt?.contentQuality?.readabilityScore || 0) + '/10'],
      ['', ''],
      ['종합 점수', '🎯 ' + (result.llmsTxt?.score || 0) + '/100'],
    ];

    let row = 4;
    llmsRows.forEach((data, idx) => {
      sheet.getRow(row).values = data;
      if (idx === 0 || idx === 8 || idx === 14) {
        sheet.getRow(row).font = { bold: true };
        sheet.getRow(row).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFE599' } };
      }
      row++;
    });

    // llms.txt 제안
    if (!result.llmsTxt.exists && result.llmsTxt.suggestedContent) {
      row += 2;
      sheet.getCell(`A${row}`).value = '💡 추천: llms.txt 파일 생성 템플릿';
      sheet.getCell(`A${row}`).font = { size: 13, bold: true, color: { argb: 'FFFF0000' } };
      row++;

      sheet.mergeCells(`A${row}:C${row + 15}`);
      const suggestionCell = sheet.getCell(`A${row}`);
      suggestionCell.value = result.llmsTxt.suggestedContent;
      suggestionCell.alignment = { vertical: 'top', wrapText: true };
      suggestionCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFF0' } };
      sheet.getRow(row).height = 300;
    }

    sheet.getColumn('A').width = 25;
    sheet.getColumn('B').width = 40;
    sheet.getColumn('C').width = 20;
  }

  /**
   * 종합 점수 시트 추가 (private)
   */
  private addSEOScoreSheet(workbook: ExcelJS.Workbook, result: SEOAuditResult): void {
    const sheet = workbook.addWorksheet('종합 점수');

    // 타이틀
    sheet.mergeCells('A1:D1');
    const titleCell = sheet.getCell('A1');
    titleCell.value = '📈 SEO & AI 최적화 종합 점수';
    titleCell.font = { size: 18, bold: true };
    titleCell.alignment = { horizontal: 'center' };

    sheet.getCell('A3').value = '진단 URL:';
    sheet.getCell('B3').value = result.url;

    // 종합 점수
    sheet.getCell('A5').value = '종합 점수';
    sheet.getCell('A5').font = { size: 14, bold: true };

    const scoreRows = [
      ['영역', '점수', '등급', '상태'],
      ['SEO 최적화', (result.overallScore?.seo || 0) + '/100', this.getGrade(result.overallScore?.seo || 0), this.getStatusEmoji(result.overallScore?.seo || 0)],
      ['AI 친화도 (GEO)', (result.overallScore?.geoAI || 0) + '/100', this.getGrade(result.overallScore?.geoAI || 0), this.getStatusEmoji(result.overallScore?.geoAI || 0)],
      ['', '', '', ''],
      ['최종 점수', (result.overallScore?.total || 0) + '/100', this.getGrade(result.overallScore?.total || 0), this.getStatusEmoji(result.overallScore?.total || 0)],
    ];

    let row = 6;
    scoreRows.forEach((data, idx) => {
      sheet.getRow(row).values = data;
      if (idx === 0) {
        sheet.getRow(row).font = { bold: true, color: { argb: 'FFFFFFFF' } };
        sheet.getRow(row).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };
      } else if (idx === 4) {
        sheet.getRow(row).font = { bold: true, size: 13 };
        sheet.getRow(row).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFEB3B' } };
      }
      row++;
    });

    // 상세 항목
    row += 2;
    sheet.getCell(`A${row}`).value = '상세 분석';
    sheet.getCell(`A${row}`).font = { size: 14, bold: true };
    row++;

    const detailRows = [
      ['카테고리', '항목', '점수'],
      ['SEO', 'Sitemap.xml', (result.sitemap?.score || 0) + '/100'],
      ['SEO', '메타데이터', (result.metadata?.score || 0) + '/100'],
      ['AI/GEO', 'llms.txt', (result.llmsTxt?.score || 0) + '/100'],
    ];

    detailRows.forEach((data, idx) => {
      sheet.getRow(row).values = data;
      if (idx === 0) {
        sheet.getRow(row).font = { bold: true };
        sheet.getRow(row).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9E1F2' } };
      }
      row++;
    });

    sheet.getColumn('A').width = 20;
    sheet.getColumn('B').width = 20;
    sheet.getColumn('C').width = 15;
    sheet.getColumn('D').width = 20;
  }

  /**
   * 점수에 따른 등급 (private)
   */
  private getGrade(score: number): string {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }

  /**
   * 점수에 따른 상태 이모지 (private)
   */
  private getStatusEmoji(score: number): string {
    if (score >= 90) return '🟢 우수';
    if (score >= 70) return '🟡 양호';
    if (score >= 50) return '🟠 보통';
    return '🔴 개선 필요';
  }
}

export default ExcelGenerator;
