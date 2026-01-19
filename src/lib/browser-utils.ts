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
  const isVercel = process.env.VERCEL === '1';

  if (isVercel) {
    try {
      const chromium = await import('@sparticuz/chromium');
      return {
        args: chromium.default.args,
        defaultViewport: chromium.default.defaultViewport,
        executablePath: await chromium.default.executablePath(),
        headless: chromium.default.headless,
      };
    } catch (e) {
      console.error('Failed to load @sparticuz/chromium:', e);
      throw e;
    }
  }

  // Local: Try system Chrome
  return {
    channel: 'chrome',
    headless: isHeadless,
  };
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
