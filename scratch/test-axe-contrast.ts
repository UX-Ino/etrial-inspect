import { chromium } from 'playwright-core';
import AxeBuilder from '@axe-core/playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    await page.goto('http://localhost:8080/kor/business/global.jsp', { waitUntil: 'domcontentloaded' });
    
    const axeResults = await new AxeBuilder({ page })
      .include('li.notification')
      .analyze();
      
    console.log('Violations found on li.notification:');
    console.log(JSON.stringify(axeResults.violations, null, 2));
    
  } catch (err) {
    console.error('Error running axe:', err);
  } finally {
    await context.close();
    await browser.close();
  }
}

main();
