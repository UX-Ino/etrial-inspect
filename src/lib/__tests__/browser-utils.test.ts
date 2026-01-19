/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBrowserLaunchOptions } from '../browser-utils';

describe('getBrowserLaunchOptions', () => {
  const originalEnv = process.env.NODE_ENV;

  afterEach(() => {
    (process.env as any).NODE_ENV = originalEnv;
  });

  it('should return default options in development', () => {
    (process.env as any).NODE_ENV = 'development';
    const options = getBrowserLaunchOptions(true);
    expect(options.headless).toBe(true);
    expect(options.channel).toBeUndefined();
  });

  it('should return chrome channel in production', () => {
    (process.env as any).NODE_ENV = 'production';
    const options = getBrowserLaunchOptions(true);
    expect(options.headless).toBe(true);
    expect(options.channel).toBe('chrome');
  });

  it('should respect headless parameter', () => {
    (process.env as any).NODE_ENV = 'production';
    const options = getBrowserLaunchOptions(false);
    expect(options.headless).toBe(false);
    expect(options.channel).toBe('chrome');
  });
});
