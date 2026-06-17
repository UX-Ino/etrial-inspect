import { chromium } from 'playwright-core';

async function main() {
  console.log('Checking computed style for li.notification...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:8080/kor/business/global.jsp', { waitUntil: 'domcontentloaded' });
    
    const element = page.locator('li.notification').first();
    const style = await element.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        color: computed.color,
        backgroundColor: computed.backgroundColor,
        display: computed.display,
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight
      };
    });
    
    console.log('li.notification Computed Styles:', style);
    
  } catch (err) {
    console.error('Failed to get styles:', err);
  } finally {
    await browser.close();
  }
}

main();
