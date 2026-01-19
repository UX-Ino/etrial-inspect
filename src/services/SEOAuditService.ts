import { XMLParser } from 'fast-xml-parser';

// Node-전용 패키지 동적 로드 (Next.js 빌드 및 런타임 호환성 확보)
let SeoAnalyzer: any;
let analyzeReadability: any;
let PatternAnalyzer: any;

try {
  // eval('require')를 사용하여 번들러(Webpack/Turbopack)가 정적으로 분석하지 않도록 함
  const dynamicRequire = typeof require !== 'undefined' ? require : (null as any);

  if (typeof window === 'undefined') {
    const safeRequire = (mod: string) => {
      try {
        // eslint-disable-next-line no-eval
        return eval('require')(mod);
      } catch (e) {
        return null;
      }
    };

    SeoAnalyzer = safeRequire('seo-analyzer');
    const capyseo = safeRequire('@capyseo/core');
    analyzeReadability = capyseo?.analyzeReadability;
    const houtini = safeRequire('@houtini/geo-analyzer');
    PatternAnalyzer = houtini?.PatternAnalyzer;
  }
} catch (e) {
  // 빌드 시점에만 발생하는 무시 가능한 경고
  if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') {
    console.warn('Professional SEO packages could not be loaded statically (this is expected during Next.js build):', e);
  }
}

import {
  SitemapAnalysisResult,
  LlmsTxtAnalysisResult,
  MetadataAnalysisResult,
  SEOAuditResult,
} from '@/types/seo';

/**
 * SEO 및 AI 최적화 진단 서비스
 * Phase 1: Sitemap.xml 파서 구현
 */
export class SEOAuditService {
  private xmlParser: XMLParser;

  constructor() {
    this.xmlParser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });
  }

  /**
   * Sitemap.xml 분석
   * @param targetUrl 대상 사이트 URL
   * @returns Sitemap 분석 결과
   */
  async analyzeSitemap(targetUrl: string): Promise<SitemapAnalysisResult> {
    const baseUrl = new URL(targetUrl).origin;
    const result: SitemapAnalysisResult = {
      exists: false,
      robotsTxtReference: false,
      xmlValid: false,
      totalUrls: 0,
      sampledUrls: [],
      errors: [],
      score: 0,
      analysisSource: 'custom',
    };

    try {
      // 1. robots.txt 확인
      result.robotsTxtReference = await this.checkRobotsTxt(baseUrl);

      // 2. sitemap.xml 가져오기
      const sitemapUrl = `${baseUrl}/sitemap.xml`;
      const sitemapContent = await this.fetchSitemap(sitemapUrl);

      if (!sitemapContent) {
        result.errors.push('Sitemap.xml 파일을 찾을 수 없습니다.');
        return result;
      }

      result.exists = true;

      // 3. XML 파싱
      const parsed = await this.parseSitemap(sitemapContent);
      if (!parsed) {
        result.errors.push('XML 파싱 실패: 유효하지 않은 XML 형식');
        return result;
      }

      result.xmlValid = true;

      // 4. URL 추출
      const urls = this.extractUrls(parsed);
      result.totalUrls = urls.length;

      // 5. 샘플링 (최대 10개)
      const sampleUrls = this.sampleUrls(urls, 10);
      result.sampledUrls = await this.validateUrls(sampleUrls);

      // 6. 점수 산출
      result.score = this.calculateSitemapScore(result);

    } catch (error) {
      result.errors.push(
        `Sitemap 분석 중 오류: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    return result;
  }

  /**
   * robots.txt에서 sitemap 경로 확인
   */
  private async checkRobotsTxt(baseUrl: string): Promise<boolean> {
    try {
      const response = await fetch(`${baseUrl}/robots.txt`);
      if (!response.ok) return false;

      const text = await response.text();
      return /Sitemap:/i.test(text);
    } catch {
      return false;
    }
  }

  /**
   * Sitemap.xml 파일 가져오기
   */
  private async fetchSitemap(url: string): Promise<string | null> {
    try {
      const response = await fetch(url);
      if (!response.ok) return null;

      return await response.text();
    } catch {
      return null;
    }
  }

  /**
   * XML 파싱
   */
  private async parseSitemap(xmlContent: string): Promise<any | null> {
    try {
      return this.xmlParser.parse(xmlContent);
    } catch {
      return null;
    }
  }

  /**
   * URL 추출
   */
  private extractUrls(parsed: any): string[] {
    const urls: string[] = [];

    // Sitemap index 처리
    if (parsed.sitemapindex) {
      const sitemaps = Array.isArray(parsed.sitemapindex.sitemap)
        ? parsed.sitemapindex.sitemap
        : [parsed.sitemapindex.sitemap];

      for (const sitemap of sitemaps) {
        if (sitemap?.loc) {
          urls.push(sitemap.loc);
        }
      }
    }

    // 일반 Sitemap 처리
    if (parsed.urlset) {
      const urlEntries = Array.isArray(parsed.urlset.url)
        ? parsed.urlset.url
        : [parsed.urlset.url];

      for (const entry of urlEntries) {
        if (entry?.loc) {
          urls.push(entry.loc);
        }
      }
    }

    return urls;
  }

  /**
   * URL 샘플링
   */
  private sampleUrls(urls: string[], maxSamples: number): { url: string; lastModified?: string }[] {
    const shuffled = urls.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, maxSamples).map(url => ({ url }));
  }

  /**
   * URL 유효성 검증 (HTTP 상태 코드 확인)
   */
  private async validateUrls(
    urls: { url: string; lastModified?: string }[]
  ): Promise<{ url: string; statusCode: number; lastModified?: string }[]> {
    const validated = [];

    for (const { url, lastModified } of urls) {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        validated.push({
          url,
          statusCode: response.status,
          lastModified,
        });
      } catch {
        validated.push({
          url,
          statusCode: 0, // 네트워크 오류
          lastModified,
        });
      }
    }

    return validated;
  }

  /**
   * Sitemap 점수 계산
   * - 파일 존재: 30점
   * - XML 유효성: 30점
   * - URL 접근성: 30점
   * - robots.txt 연동: 10점
   */
  private calculateSitemapScore(result: SitemapAnalysisResult): number {
    let score = 0;

    // 파일 존재
    if (result.exists) score += 30;

    // XML 유효성
    if (result.xmlValid) score += 30;

    // URL 접근성 (샘플의 80% 이상이 200 OK)
    if (result.sampledUrls.length > 0) {
      const successfulUrls = result.sampledUrls.filter(
        u => u.statusCode === 200
      ).length;
      const successRate = successfulUrls / result.sampledUrls.length;
      score += Math.round(successRate * 30);
    }

    // robots.txt 연동
    if (result.robotsTxtReference) score += 10;

    return Math.min(score, 100);
  }

  /**
   * llms.txt 분석
   * @param targetUrl 대상 사이트 URL
   * @returns llms.txt 분석 결과
   */
  async analyzeLlmsTxt(targetUrl: string): Promise<LlmsTxtAnalysisResult> {
    const baseUrl = new URL(targetUrl).origin;
    const result: LlmsTxtAnalysisResult = {
      exists: false,
      structure: {
        hasH1: false,
        hasH2: false,
        hasH3: false,
        paragraphCount: 0,
        wordCount: 0,
        codeBlockCount: 0,
      },
      contentQuality: {
        hasSummary: false,
        hasKeywords: false,
        readabilityScore: 0,
        structureScore: 0,
      },
      brokenLinks: [],
      score: 0,
      generatorSource: 'llms-txt-generator',
    };

    try {
      // 1. llms.txt 가져오기
      const llmsTxtUrl = `${baseUrl}/llms.txt`;
      const content = await this.fetchLlmsTxt(llmsTxtUrl);

      if (!content) {
        // 파일이 없으면 자동 생성 제안
        result.suggestedContent = this.generateLlmsTxtSuggestion(targetUrl);
        return result;
      }

      result.exists = true;

      // 2. 구조 분석
      result.structure = this.analyzeLlmsTxtStructure(content);

      // 3. 내부 링크 검증
      result.brokenLinks = await this.validateLlmsTxtLinks(content, baseUrl);

      // 4. 품질 평가 (규칙 기반)
      result.contentQuality = this.evaluateLlmsTxtQuality(content, targetUrl);

      // 5. 종합 점수 산출
      result.score = this.calculateLlmsTxtScore(result);
    } catch (error) {
      console.error('llms.txt 분석 오류:', error);
    }

    return result;
  }

  /**
   * llms.txt 파일 가져오기
   */
  private async fetchLlmsTxt(url: string): Promise<string | null> {
    try {
      const response = await fetch(url);
      if (!response.ok) return null;
      return await response.text();
    } catch {
      return null;
    }
  }

  /**
   * llms.txt 구조 분석
   */
  private analyzeLlmsTxtStructure(content: string) {
    const h1Count = (content.match(/^# /gm) || []).length;
    const h2Count = (content.match(/^## /gm) || []).length;
    const h3Count = (content.match(/^### /gm) || []).length;
    const paragraphs = content.split(/\n\n+/).filter(p => p.trim().length > 0);
    const words = content.split(/\s+/).filter(w => w.length > 0);
    const codeBlocks = (content.match(/```[\s\S]*?```/g) || []).length;

    return {
      hasH1: h1Count > 0,
      hasH2: h2Count > 0,
      hasH3: h3Count > 0,
      paragraphCount: paragraphs.length,
      wordCount: words.length,
      codeBlockCount: codeBlocks,
    };
  }

  /**
   * llms.txt 내부 링크 검증
   */
  private async validateLlmsTxtLinks(content: string, baseUrl: string): Promise<string[]> {
    const brokenLinks: string[] = [];
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const matches = [...content.matchAll(linkRegex)];

    for (const match of matches) {
      const linkUrl = match[2];

      // 상대 경로를 절대 경로로 변환
      const absoluteUrl = linkUrl.startsWith('http')
        ? linkUrl
        : `${baseUrl}${linkUrl.startsWith('/') ? '' : '/'}${linkUrl}`;

      try {
        const response = await fetch(absoluteUrl, { method: 'HEAD' });
        if (!response.ok) {
          brokenLinks.push(linkUrl);
        }
      } catch {
        brokenLinks.push(linkUrl);
      }
    }

    return brokenLinks;
  }

  /**
   * llms.txt 품질 평가 (규칙 기반)
   */
  private evaluateLlmsTxtQuality(content: string, targetUrl: string) {
    const domain = new URL(targetUrl).hostname.replace('www.', '');
    const domainKeywords = domain.split('.')[0];

    // 1. 구조 점수 (H1 단일성, H2 적절성)
    const h1Count = (content.match(/^# /gm) || []).length;
    const h2Count = (content.match(/^## /gm) || []).length;
    let structureScore = 0;
    structureScore += h1Count === 1 ? 15 : 0;
    structureScore += h2Count >= 2 && h2Count <= 5 ? 15 : 5;

    // 2. 요약 존재 (첫 단락 확인)
    const paragraphs = content.split(/\n\n+/).filter(p => p.trim().length > 0);
    const firstParagraph = paragraphs[0] || '';
    const hasSummary = firstParagraph.length > 50 && firstParagraph.length < 300;

    // 3. 키워드 밀도
    const keywordRegex = new RegExp(domainKeywords, 'gi');
    const keywordMatches = content.match(keywordRegex) || [];
    const hasKeywords = keywordMatches.length >= 3;

    // 4. 가독성 (리스트 사용 여부)
    const listCount = (content.match(/^[\-\*] /gm) || []).length;
    const readabilityScore = listCount > 0 ? 10 : 5;

    return {
      hasSummary,
      hasKeywords,
      readabilityScore,
      structureScore,
    };
  }

  /**
   * llms.txt 종합 점수 계산
   * - 구조 점수: 30점
   * - 분량 점수: 25점
   * - 요약 존재: 20점
   * - 키워드 밀도: 15점
   * - 가독성: 10점
   */
  private calculateLlmsTxtScore(result: LlmsTxtAnalysisResult): number {
    let score = 0;

    // 1. 구조 점수 (30점)
    score += result.contentQuality.structureScore;

    // 2. 분량 점수 (25점)
    const wordCount = result.structure.wordCount;
    if (wordCount >= 100 && wordCount <= 500) {
      score += 25;
    } else if (wordCount > 50) {
      score += 15;
    }

    // 3. 요약 존재 (20점)
    if (result.contentQuality.hasSummary) {
      score += 20;
    }

    // 4. 키워드 밀도 (15점)
    if (result.contentQuality.hasKeywords) {
      score += 15;
    }

    // 5. 가독성 (10점)
    score += result.contentQuality.readabilityScore;

    return Math.min(score, 100);
  }

  /**
   * llms.txt 자동 생성 제안
   */
  private generateLlmsTxtSuggestion(targetUrl: string): string {
    const domain = new URL(targetUrl).hostname.replace('www.', '');
    const siteName = domain.split('.')[0];

    return `# ${siteName} - AI 친화적 웹사이트

## 서비스 개요
${siteName}는 [서비스 설명]을 제공하는 웹사이트입니다.

## 주요 기능
- 기능 1: [설명]
- 기능 2: [설명]
- 기능 3: [설명]

## 기술 스택
- Frontend: [기술명]
- Backend: [기술명]
- Database: [기술명]

## 연락처
- 웹사이트: ${targetUrl}
- 이메일: contact@${domain}

> 이 파일은 AI 언어 모델이 ${siteName}의 정보를 효율적으로 이해하고 요약할 수 있도록 작성되었습니다.
`;
  }

  /**
   * 메타데이터 분석
   * @param targetUrl 대상 사이트 URL
   * @returns 메타데이터 분석 결과
   */
  async analyzeMetadata(targetUrl: string): Promise<MetadataAnalysisResult> {
    const result: MetadataAnalysisResult = {
      title: { exists: false, length: 0, optimal: false },
      description: { exists: false, length: 0, optimal: false },
      canonical: { exists: false },
      openGraph: {
        hasTitle: false,
        hasDescription: false,
        hasImage: false,
        hasUrl: false,
      },
      viewport: { exists: false, mobileFriendly: false },
      score: 0,
      analysisSource: 'seo-analyzer',
    };

    try {
      // HTML 페이지 가져오기 (간단한 fetch 사용)
      const response = await fetch(targetUrl);
      if (!response.ok) {
        return result;
      }

      const html = await response.text();

      // 메타 태그 파싱
      result.title = this.extractTitle(html);
      result.description = this.extractDescription(html);
      result.canonical = this.extractCanonical(html);
      result.openGraph = this.extractOpenGraph(html);
      result.viewport = this.extractViewport(html);

      // professional package를 통한 정밀 분석 (seo-analyzer 연동)
      try {
        let analyzerReport = '';
        await new SeoAnalyzer()
          .inputHTMLStrings([{ text: html, source: targetUrl }])
          .useRule('titleLengthRule', { min: 30, max: 60 })
          .useRule('metaDescriptionRule', { min: 120, max: 160 })
          .useRule('canonicalLinkRule')
          .useRule('metaBaseRule')
          .useRule('headingsStructureRule')
          .outputJson((json: string) => { analyzerReport = json; })
          .run();

        const parsedResults = typeof analyzerReport === 'string' ? JSON.parse(analyzerReport) : analyzerReport;

        // Results mapping
        if (Array.isArray(parsedResults) && parsedResults.length > 0) {
          const defects = parsedResults[0].report || [];
          if (defects.length > 0) {
            console.log(`[seo-analyzer] Found ${defects.length} defects for ${targetUrl}:`, defects);
          }
        }

        // 3. AI Enrichment (Professional Findings)
        // GEO Analysis (@houtini/geo-analyzer)
        const patternAnalyzer = new PatternAnalyzer();
        const geoResults = patternAnalyzer.analyze(html, 'SEO optimization', html);

        // Readability Analysis (@capyseo/core)
        // HTML에서 텍스트만 추출 (간단하게 태그 제거)
        const textOnly = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        const readability = analyzeReadability(textOnly);

        // 정밀 분석 결과 취합
        const professionalFindings: string[] = [];
        if (geoResults && geoResults.metrics) {
          professionalFindings.push(`[GEO] Claim Density: ${geoResults.metrics.claimDensity.density.toFixed(2)} facts/chunk`);
          professionalFindings.push(`[GEO] Citability Score: ${geoResults.scores.citability.toFixed(2)}/1.0`);
        }
        if (readability) {
          professionalFindings.push(`[Readability] Ease: ${readability.fleschReadingEase.toFixed(1)}/100, Grade: ${readability.fleschKincaidGrade.toFixed(1)}`);
        }

        // 결과 객체에 포함 (AIPromptData 생성 시 활용을 위해 MetadataAnalysisResult에는 없지만 런타임에 주입)
        (result as any).professionalFindings = professionalFindings;

        // TODO: parsedResults를 MetadataAnalysisResult에 매핑하는 고도화 작업 진행
      } catch (e) {
        console.error('seo-analyzer failed, falling back to custom rules', e);
        result.analysisSource = 'custom';
      }

      // 종합 점수 산출 (기존 로직 유지하며 seo-analyzer 데이터 활용 가능하게 확장 예정)
      result.score = this.calculateMetadataScore(result);

    } catch (error) {
      console.error('메타데이터 분석 오류:', error);
    }

    return result;
  }

  /**
   * Title 태그 추출
   */
  private extractTitle(html: string) {
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';

    return {
      exists: !!title,
      length: title.length,
      optimal: title.length >= 50 && title.length <= 60,
    };
  }

  /**
   * Meta Description 추출
   */
  private extractDescription(html: string) {
    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
    const description = descMatch ? descMatch[1].trim() : '';

    return {
      exists: !!description,
      length: description.length,
      optimal: description.length >= 150 && description.length <= 160,
    };
  }

  /**
   * Canonical URL 추출
   */
  private extractCanonical(html: string) {
    const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
    const canonicalUrl = canonicalMatch ? canonicalMatch[1].trim() : null;

    return {
      exists: !!canonicalUrl,
      url: canonicalUrl || undefined,
    };
  }

  /**
   * Open Graph 태그 추출
   */
  private extractOpenGraph(html: string) {
    const ogTitle = /<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i.test(html);
    const ogDescription = /<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i.test(html);
    const ogImage = /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i.test(html);
    const ogUrl = /<meta\s+property=["']og:url["']\s+content=["']([^"']+)["']/i.test(html);

    return {
      hasTitle: ogTitle,
      hasDescription: ogDescription,
      hasImage: ogImage,
      hasUrl: ogUrl,
    };
  }

  /**
   * Viewport 태그 추출
   */
  private extractViewport(html: string) {
    const viewportMatch = html.match(/<meta\s+name=["']viewport["']\s+content=["']([^"']+)["']/i);
    const viewportContent = viewportMatch ? viewportMatch[1].trim() : '';
    const mobileFriendly = /width=device-width/i.test(viewportContent);

    return {
      exists: !!viewportContent,
      mobileFriendly,
    };
  }

  /**
   * 메타데이터 종합 점수 계산
   * - Title 최적화: 25점
   * - Description 최적화: 25점
   * - Canonical URL: 20점
   * - Open Graph: 20점
   * - Viewport: 10점
   */
  private calculateMetadataScore(result: MetadataAnalysisResult): number {
    let score = 0;

    // Title (25점)
    if (result.title.optimal) {
      score += 25;
    } else if (result.title.exists) {
      score += 15;
    }

    // Description (25점)
    if (result.description.optimal) {
      score += 25;
    } else if (result.description.exists) {
      score += 15;
    }

    // Canonical URL (20점)
    if (result.canonical.exists) {
      score += 20;
    }

    // Open Graph (20점)
    const ogScore =
      (result.openGraph.hasTitle ? 5 : 0) +
      (result.openGraph.hasDescription ? 5 : 0) +
      (result.openGraph.hasImage ? 5 : 0) +
      (result.openGraph.hasUrl ? 5 : 0);
    score += ogScore;

    // Viewport (10점)
    if (result.viewport.mobileFriendly) {
      score += 10;
    } else if (result.viewport.exists) {
      score += 5;
    }

    return Math.min(score, 100);
  }

  /**
   * 통합 SEO 진단 (Phase 2에서 완성 예정)
   */
  async runFullAudit(targetUrl: string): Promise<SEOAuditResult> {
    const sitemap = await this.analyzeSitemap(targetUrl);
    const llmsTxt = await this.analyzeLlmsTxt(targetUrl);
    const metadata = await this.analyzeMetadata(targetUrl);

    const seoScore = (sitemap.score + metadata.score) / 2;
    const geoScore = llmsTxt.score;
    const totalScore = (seoScore + geoScore) / 2;

    return {
      url: targetUrl,
      timestamp: new Date(),
      sitemap,
      llmsTxt,
      metadata,
      overallScore: {
        seo: Math.round(seoScore),
        geoAI: Math.round(geoScore),
        total: Math.round(totalScore),
      },
      recommendations: [],
    };
  }
}

// 싱글톤 인스턴스 export
export const seoAuditService = new SEOAuditService();
