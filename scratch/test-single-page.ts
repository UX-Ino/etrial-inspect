import { AccessibilityAuditor } from '../src/lib/accessibility-auditor';

async function main() {
  console.log('🚀 Starting single page audit for http://localhost:8080/kor/company/ceo.jsp ...');
  
  const auditor = new AccessibilityAuditor({
    enableDynamicCheck: false, // Turn off dynamic clicks to avoid noise
    screenshotOnViolation: false,
    headless: true
  });

  try {
    await auditor.init();
    const result = await auditor.auditPage('http://localhost:8080/kor/business/global.jsp');
    await auditor.close();

    console.log('\n✅ Audit completed!');
    console.log(`Page Title: ${result.title}`);
    console.log(`Violations Found: ${result.violations.length}`);

    result.violations.forEach((v, i) => {
      console.log(`\n[Violation ${i + 1}] KWCAG ${v.kwcagId}: ${v.kwcagName} (${v.axeRuleId})`);
      console.log(`Description: ${v.description}`);
      console.log(`Impact: ${v.impact}`);
      console.log(`Help: ${v.help}`);
      console.log('Nodes:');
      v.nodes.forEach((n, ni) => {
        console.log(`  - Node ${ni + 1}:`);
        console.log(`    HTML: ${n.html}`);
        console.log(`    Target Selector: ${n.target?.join(' > ')}`);
        console.log(`    Failure Summary: ${n.failureSummary}`);
      });
    });
  } catch (error) {
    console.error('❌ Single page audit failed:', error);
  }
}

main();
