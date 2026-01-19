import { WebCrawler } from '@/lib/crawler';
import { AccessibilityAuditor } from '@/lib/accessibility-auditor';
import { Violation, AuditResult, PageInfo, AuditConfig } from '@/types';
import * as fs from 'fs';
import * as path from 'path';
import { seoAuditService } from './SEOAuditService';
import { getBrowserErrorGuide } from '@/lib/browser-utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function runAudit(config: AuditConfig, onProgress?: (data: any) => void): Promise<AuditResult> {
  const startTime = new Date().toISOString();
  // TODO: Make this path configurable for Electron (userData)
  const authStatePath = path.resolve(process.cwd(), 'auth_state.json');

  const log = (message: string) => {
    console.log(message);
    if (onProgress) onProgress({ type: 'log', message });
  };

  // 1. Login Phase
  if (config.enableLogin && config.loginUrl) {
    log('🔐 로그인 프로세스 시작... (브라우저 창을 확인하세요)');
    const loginCrawler = new WebCrawler({
      headless: false
    });

    try {
      await loginCrawler.init();
      const loginSuccess = await loginCrawler.login(config.loginUrl, config.targetUrl);

      if (loginSuccess) {
        log('✅ 로그인 성공 감지');
        await loginCrawler.saveStorageState(authStatePath);
      } else {
        console.warn('⚠️ 로그인 실패 또는 타임아웃, 비로그인 상태로 진행');
      }
    } catch (e) {
      console.error('로그인 중 에러:', e);
    } finally {
      await loginCrawler.close();
    }
  }

  // 2. Crawler Init
  const isVercel = process.env.VERCEL === '1' || !!process.env.AWS_LAMBDA_FUNCTION_NAME;
  const crawler = new WebCrawler({
    maxDepth: isVercel ? 2 : 10,
    maxPages: isVercel ? 5 : 1000,
    headless: true
  });

  const auditor = new AccessibilityAuditor({
    enableDynamicCheck: true,
    screenshotOnViolation: true,
    headless: true
  });

  try {
    log('🕷️ 크롤러 초기화 중...');
    try {
      await crawler.init();
    } catch (e) {
      const guide = getBrowserErrorGuide(e);
      throw new Error(`크롤러 초기화 실패: ${guide}`);
    }

    if (config.enableLogin && fs.existsSync(authStatePath)) {
      await crawler.loadStorageState(authStatePath);
    }

    // 3. Crawling
    log(`🔍 페이지 크롤링 시작: ${config.targetUrl}`);
    const crawlResult = await crawler.crawl(config.targetUrl, (progress) => {
      log(`  크롤링: ${progress.current}/${progress.found} - ${progress.url}`);
    });

    log(`✅ 크롤링 완료: ${crawlResult.pages.length}개 페이지 발견`);

    const pages: PageInfo[] = crawlResult.pages;
    const violations: Violation[] = [];
    let violationNumber = 0;

    // 4. Accessibility Check
    if (config.enableAccessibilityCheck) {
      log('♿ 접근성 검사 시작...');
      try {
        await auditor.init();
      } catch (e) {
        const guide = getBrowserErrorGuide(e);
        throw new Error(`접근성 검사 엔진 초기화 실패: ${guide}`);
      }

      if (config.enableLogin && fs.existsSync(authStatePath)) {
        await auditor.loadStorageState(authStatePath);
      }

      const uniqueViolationMap = new Map<string, Violation>();
      const COMMON_UI_REGEX = /(header|footer|nav|gnb|lnb|sidebar|aside|menu|global)/i;

      // Concurrency Control
      const CONCURRENCY_LIMIT = 5;
      let completedCount = 0;
      let nextPageIndex = 0;

      const auditPageWrapper = async (page: PageInfo, index: number) => {
        log(`  검사 시작 (${index + 1}/${pages.length}): ${page.url}`);

        try {
          const auditResult = await auditor.auditPage(page.url);

          for (const kwcagViolation of auditResult.violations) {
            for (const node of kwcagViolation.nodes) {
              const selector = node.target && node.target.length > 0 ? node.target.join(' > ') : '';
              const signature = `${kwcagViolation.axeRuleId}||${selector}||${node.html}`;
              const isCommonUI = COMMON_UI_REGEX.test(selector);

              if (uniqueViolationMap.has(signature)) {
                const existing = uniqueViolationMap.get(signature)!;
                if (existing.occurrenceCount !== undefined) {
                  existing.occurrenceCount++;
                }
                continue;
              }

              violationNumber++; // Note: strictly speaking this isn't atomic but JS is single threaded event loop so it's fine
              const violation: Violation = {
                pageUrl: page.url,
                pageTitle: page.title,
                depth1: page.depth1,
                depth2: page.depth2,
                depth3: page.depth3,
                depth4: page.depth4,
                platform: config.platform || 'PC',
                inspector: config.inspector || '시스템',
                inspectionDate: new Date().toLocaleDateString('ko-KR'),
                violationNumber,
                kwcagId: kwcagViolation.kwcagId,
                kwcagName: kwcagViolation.kwcagName,
                principle: kwcagViolation.principle,
                axeRuleId: kwcagViolation.axeRuleId,
                description: kwcagViolation.description,
                impact: kwcagViolation.impact,
                affectedCode: node.html,
                help: kwcagViolation.help || node.failureSummary,
                helpUrl: kwcagViolation.helpUrl,
                selector: selector,
                occurrenceCount: 1,
                isCommon: isCommonUI,
                boundingBox: node.boundingBox,
                screenshotPath: auditResult.screenshotPaths?.[0]
              };

              uniqueViolationMap.set(signature, violation);
              violations.push(violation);
            }
          }
        } catch (error) {
          console.error(`  ❌ 검사 오류 (${page.url}):`, error);
          log(`❌ 검사 오류: ${page.url}`);
        } finally {
          completedCount++;
          if (onProgress) {
            onProgress({ type: 'progress', current: completedCount, total: pages.length, url: page.url });
          }
          log(`  검사 완료 (${completedCount}/${pages.length}): ${page.url}`);
        }
      };

      const worker = async () => {
        while (nextPageIndex < pages.length) {
          const currentIndex = nextPageIndex++;
          const page = pages[currentIndex];
          await auditPageWrapper(page, currentIndex);
        }
      };

      // Start workers
      const workers = Array(Math.min(pages.length, CONCURRENCY_LIMIT))
        .fill(null)
        .map(() => worker());

      await Promise.all(workers);

      await auditor.close();
    }

    log('✅ 크롤링 및 접근성 검사 완료');
    await crawler.close();

    // 5. SEO & AI Audit
    let seoResult;
    if (config.enableSEOCheck || config.enableAICheck) {
      log('🌐 SEO 및 AI 친화도 분석을 시작합니다...');
      try {
        // Sitemap 분석
        log('  [SEO] Sitemap.xml 분석 중...');
        const sitemap = await seoAuditService.analyzeSitemap(config.targetUrl);

        // Metadata 분석
        log('  [SEO] 메타데이터 및 콘텐츠 분석 중...');
        const metadata = await seoAuditService.analyzeMetadata(config.targetUrl);

        // AI 친화도 분석
        log('  [AI] AI 친화도(GEO) 및 llms.txt 분석 중...');
        const llmsTxt = await seoAuditService.analyzeLlmsTxt(config.targetUrl);

        const seoScore = (sitemap.score + metadata.score) / 2;
        const geoScore = llmsTxt.score;
        const totalScore = (seoScore + geoScore) / 2;

        seoResult = {
          url: config.targetUrl,
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

        log('✅ SEO 및 AI 친화도 분석 완료');
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        log(`❌ SEO/AI 분석 중 오류 발생: ${errorMsg}`);
        console.error('SEO/AI Audit Error:', error);
      }
    }

    const endTime = new Date().toISOString();

    const summary = {
      byPrinciple: {} as Record<string, number>,
      byImpact: { critical: 0, serious: 0, moderate: 0, minor: 0 } as Record<string, number>,
      byKwcagItem: {} as Record<string, number>,
    };

    violations.forEach((v) => {
      summary.byPrinciple[v.principle] = (summary.byPrinciple[v.principle] || 0) + 1;
      summary.byImpact[v.impact] = (summary.byImpact[v.impact] || 0) + 1;
      summary.byKwcagItem[v.kwcagId] = (summary.byKwcagItem[v.kwcagId] || 0) + 1;
    });

    const result: AuditResult = {
      startTime,
      endTime,
      totalPages: pages.length,
      totalViolations: violations.length,
      pages,
      violations,
      seoResult,
      summary,
    };

    log('✅ 진단 완료');
    return result;

  } catch (error) {
    try { await crawler.close(); } catch { }
    try { await auditor.close(); } catch { }
    throw error;
  }
}
