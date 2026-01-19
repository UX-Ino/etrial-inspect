import { LaunchOptions } from 'playwright-core';

/**
 * Returns platform-specific Playwright launch options.
 * In production/distribution environments, it prioritizes using the system-installed 
 * Google Chrome or Microsoft Edge to avoid requiring Playwright browser binaries.
 * 
 * @param isHeadless Whether to run in headless mode.
 * @returns Playwright LaunchOptions
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getBrowserLaunchOptions = async (isHeadless: boolean = true): Promise<LaunchOptions> => {
  const isDev = process.env.NODE_ENV === 'development';
  const isVercel = process.env.VERCEL === '1';

  const options: LaunchOptions = {
    headless: isHeadless,
    args: isVercel ? [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu'
    ] : undefined,
  };

  if (isVercel) {
    try {
      const chromium = await import('@sparticuz/chromium');
      // @sparticuz/chromium requires a specific version of non-headless chromium binary? 
      // Actually it downloads minified chromium.
      // We need to set the executable path.

      // Note: sparticuz/chromium is mainly for Puppeteer, but Playwright can use it if we launch via launch({ executablePath })
      // However, Playwright is picky. 
      // Let's try to set executablePath.

      options.executablePath = await chromium.default.executablePath();
    } catch (e) {
      console.error('Failed to load @sparticuz/chromium:', e);
    }
  } else {
    // Local: Try system Chrome
    options.channel = 'chrome';
  }

  return options;
};

/**
 * Returns a user-friendly error message for browser launch failures.
 */
export const getBrowserErrorGuide = (error: unknown): string => {
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes('Executable doesn\'t exist') || message.includes('browserType.launch:')) {
    return 'Google Chrome 브라우저가 설치되어 있지 않거나 경로를 찾을 수 없습니다. Chrome 브라우저를 설치하거나 최신 버전으로 업데이트해 주세요.';
  }
  return message;
};
