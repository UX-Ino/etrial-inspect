import { LaunchOptions } from 'playwright';

/**
 * Returns platform-specific Playwright launch options.
 * In production/distribution environments, it prioritizes using the system-installed 
 * Google Chrome or Microsoft Edge to avoid requiring Playwright browser binaries.
 * 
 * @param isHeadless Whether to run in headless mode.
 * @returns Playwright LaunchOptions
 */
export const getBrowserLaunchOptions = (isHeadless: boolean = true): LaunchOptions => {
  const isDev = process.env.NODE_ENV === 'development';
  const isVercel = process.env.VERCEL === '1';

  const options: LaunchOptions = {
    headless: isHeadless,
  };

  // If on Vercel, do NOT force 'chrome' channel. Let Playwright use its bundled version (if configured)
  // or rely on AWS Lambda layers if using chrome-aws-lambda (though simple playwright usage might fail on standard Vercel functions).
  // Standard Vercel Serverless Functions have size limits that Playwright often exceeds.
  // However, removing 'channel: chrome' is the first step to standard behavior.
  if (!isVercel) {
    // Only force system Chrome in local/non-serverless environments
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
