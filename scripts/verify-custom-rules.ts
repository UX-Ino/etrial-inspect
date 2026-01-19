import { AccessibilityAuditor } from '../src/lib/accessibility-auditor';
import * as path from 'path';

async function main() {
  const auditor = new AccessibilityAuditor({ headless: true });
  await auditor.init();

  const fixturePath = path.resolve(__dirname, 'fixtures/bad-aria.html');
  const url = `file://${fixturePath}`;

  console.log(`Auditing ${url}...`);
  const result = await auditor.auditPage(url);

  console.log('Violations found:', result.violations.length);
  result.violations.forEach(v => {
    if (v.axeRuleId.startsWith('custom-aria')) {
      console.log(`[CUSTOM DETECTED] ${v.axeRuleId}: ${v.description}`);
    } else {
      console.log(`[AXE DETECTED] ${v.axeRuleId}`);
    }
  });

  await auditor.close();
}

main().catch(console.error);
