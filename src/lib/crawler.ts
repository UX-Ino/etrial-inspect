import { chromium, Browser, BrowserContext, Page } from 'playwright-core';
import { PageInfo } from '@/types';
import { getBrowserLaunchOptions } from './browser-utils';

export interface CrawlerOptions {
  maxDepth?: number;
  maxPages?: number;
  excludePatterns?: RegExp[];
  includePatterns?: RegExp[];
  headless?: boolean;
}

export interface CrawlResult {
  pages: PageInfo[];
  totalFound: number;
  errors: string[];
}

export class WebCrawler {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private options: CrawlerOptions;
  private visitedUrls: Set<string> = new Set();
  private baseUrl: string = '';
  private baseDomain: string = '';

  constructor(options: CrawlerOptions = {}) {
    this.options = {
      maxDepth: 4,
      maxPages: 500,
      excludePatterns: [
        /\.(jpg|jpeg|png|gif|svg|webp|ico|pdf|zip|exe|dmg)$/i,
        /logout/i,
        /delete/i,
        /signout/i,
        /#$/,
        /javascript:/i,
        /mailto:/i,
        /tel:/i,
      ],
      headless: true, // Default to true
      ...options,
    };
  }

  async init(): Promise<void> {
    const launchOptions = await getBrowserLaunchOptions(this.options.headless);
    this.browser = await chromium.launch(launchOptions);
    this.context = await this.browser.newContext({
      viewport: { width: 1920, height: 1080 },
    });
  }

  async close(): Promise<void> {
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }

  async login(loginUrl: string, targetUrl: string): Promise<boolean> {
    if (!this.context) throw new Error('Crawler not initialized');

    const page = await this.context.newPage();
    try {
      console.log(`로그인 페이지로 이동 중: ${loginUrl}`);
      console.log(`사용자 로그인 대기 중... (목표 URL: ${targetUrl})`);

      await page.goto(loginUrl, { waitUntil: 'domcontentloaded' });

      console.log('로그인 완료 후 창이 닫히기를 기다리는 중...');

      // 사용자가 직접 로그인을 완료하고 창을 닫을 때까지 대기
      await new Promise<void>((resolve) => {
        page.on('close', () => {
          console.log('로그인 창이 닫혔습니다.');
          resolve();
        });
      });

      console.log('브라우저 창이 닫힘. 로그인이 완료된 것으로 간주합니다.');

      // 로그인 상태(쿠키/스토리지)가 context에 저장됨
      return true;
    } catch (error) {
      console.error('Manual login process interrupted:', error);
      return false;
    }
    // finally block removed as user closes the page
  }

  async crawl(
    startUrl: string,
    onProgress?: (progress: { current: number; found: number; url: string }) => void
  ): Promise<CrawlResult> {
    if (!this.context) throw new Error('Crawler not initialized');

    this.baseUrl = startUrl;
    const urlObj = new URL(startUrl);
    this.baseDomain = urlObj.hostname;
    this.visitedUrls.clear();

    const pages: PageInfo[] = [];
    const errors: string[] = [];
    const queue: { url: string; depth: number; path: string[]; linkText?: string }[] = [
      { url: startUrl, depth: 1, path: [] },
    ];

    while (queue.length > 0 && pages.length < (this.options.maxPages || 500)) {
      const current = queue.shift();
      if (!current) break;

      const { url, depth, path, linkText } = current;
      const normalizedUrl = this.normalizeUrl(url);

      if (this.visitedUrls.has(normalizedUrl)) continue;
      if (depth > (this.options.maxDepth || 4)) continue;
      if (!this.isValidUrl(normalizedUrl)) continue;

      this.visitedUrls.add(normalizedUrl);

      try {
        const page = await this.context.newPage();
        // Use domcontentloaded as primary wait condition
        await page.goto(normalizedUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });

        try {
          // Best-effort wait for network idle
          await page.waitForLoadState('networkidle', { timeout: 10000 });
        } catch (e) {
          // Ignore network idle timeout
        }

        const realTitle = await page.title();
        // Use linkText if available (from button), otherwise fallback to page title
        const displayTitle = linkText ? linkText.trim() : (realTitle || 'Untitled');

        const depthPath = this.calculateDepthPath(path, displayTitle);

        pages.push({
          url: normalizedUrl,
          title: displayTitle,
          depth1: depthPath[0] || '',
          depth2: depthPath[1] || '',
          depth3: depthPath[2] || '',
          depth4: depthPath[3] || '',
        });

        onProgress?.({
          current: pages.length,
          found: this.visitedUrls.size + queue.length,
          url: normalizedUrl,
        });

        // 링크 수집
        if (depth < (this.options.maxDepth || 4)) {
          const links = await this.collectLinks(page);
          for (const link of links) {
            if (!this.visitedUrls.has(link.url)) {
              queue.push({
                url: link.url,
                depth: depth + 1,
                path: [...path, displayTitle],
                linkText: link.text,
              });
            }
          }
        }

        await page.close();
      } catch (error) {
        errors.push(`Error crawling ${normalizedUrl}: ${error}`);
      }
    }

    return {
      pages,
      totalFound: this.visitedUrls.size,
      errors,
    };
  }

  private async collectLinks(page: Page): Promise<{ url: string; text: string }[]> {
    const links = await page.$$eval('a[href]', (anchors) =>
      anchors.map((a) => ({
        url: (a as HTMLAnchorElement).href,
        text: (a as HTMLAnchorElement).innerText || (a as HTMLAnchorElement).textContent || ''
      }))
    );

    return links
      .filter((link) => this.isValidUrl(link.url))
      .map((link) => ({ ...link, url: this.normalizeUrl(link.url) }))
      // Unique by URL
      .filter((link, index, self) =>
        self.findIndex(l => l.url === link.url) === index
      );
  }

  private normalizeUrl(url: string): string {
    try {
      const urlObj = new URL(url, this.baseUrl);
      // 해시와 쿼리스트링 정규화
      urlObj.hash = '';
      // 마지막 슬래시 제거
      let normalized = urlObj.href;
      if (normalized.endsWith('/') && normalized.length > 1) {
        normalized = normalized.slice(0, -1);
      }
      return normalized;
    } catch {
      return url;
    }
  }

  private isValidUrl(url: string): boolean {
    try {
      const urlObj = new URL(url, this.baseUrl);

      // 같은 도메인인지 확인
      if (urlObj.hostname !== this.baseDomain) return false;

      // 제외 패턴 체크
      for (const pattern of this.options.excludePatterns || []) {
        if (pattern.test(url)) return false;
      }

      return true;
    } catch {
      return false;
    }
  }

  private calculateDepthPath(parentPath: string[], currentTitle: string): string[] {
    const fullPath = [...parentPath.slice(0, 3), currentTitle];
    const result: string[] = [];

    for (let i = 0; i < 4; i++) {
      result.push(fullPath[i] || '');
    }

    return result;
  }

  // 스토리지 상태 저장
  async saveStorageState(path: string): Promise<void> {
    if (this.context) {
      await this.context.storageState({ path });
    }
  }

  // 스토리지 상태 로드
  async loadStorageState(statePath: string): Promise<void> {
    if (this.browser) {
      const fs = await import('fs');
      if (fs.existsSync(statePath)) {
        this.context = await this.browser.newContext({
          storageState: statePath,
          viewport: { width: 1920, height: 1080 },
        });
      }
    }
  }
}

export default WebCrawler;
