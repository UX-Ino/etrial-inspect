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
  const isVercel = process.env.VERCEL === '1' || !!process.env.AWS_LAMBDA_FUNCTION_NAME;

  console.log(`[Browser Launch] Environment Check: isVercel=${isVercel}, NODE_ENV=${process.env.NODE_ENV}`);

  if (isVercel) {
    try {
      console.log('[Browser Launch] Attempting to load @sparticuz/chromium...');
      const chromium = await import('@sparticuz/chromium');

      const executablePath = await chromium.default.executablePath();
      console.log(`[Browser Launch] Executable Path: ${executablePath}`);

      return {
        args: chromium.default.args,
        executablePath: executablePath,
        headless: true,
      };
    } catch (e) {
      console.error('[Browser Launch] Failed to load @sparticuz/chromium:', e);
      throw e;
    }
  }

  // Local: Try system Chrome
  console.log('[Browser Launch] Using System Chrome (Local Development)');
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
