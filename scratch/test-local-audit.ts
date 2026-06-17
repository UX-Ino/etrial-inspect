import { runAudit } from '../src/services/AuditExecutor';
import { AuditConfig } from '../src/types';

async function main() {
  console.log('🚀 Starting local audit test for localhost:8080...');
  
  const config: AuditConfig = {
    targetUrl: 'http://localhost:8080/kor/company/ceo.jsp',
    enableLogin: false,
    loginUrl: '',
    loginId: '',
    loginPassword: '',
    enableAccessibilityCheck: true,
    enableSEOCheck: true,
    enableAICheck: true,
    platform: 'PC',
    inspector: '테스트',
    excludePaths: '',
  };

  try {
    const result = await runAudit(config, (progress) => {
      if (progress.type === 'log') {
        console.log(`[Log] ${progress.message}`);
      } else if (progress.type === 'progress') {
        console.log(`[Progress] ${progress.current}/${progress.total} - ${progress.url}`);
      }
    });

    console.log('\n✅ Audit completed successfully!');
    console.log(`Total Pages: ${result.totalPages}`);
    console.log(`Total Violations: ${result.totalViolations}`);
    console.log('\n--- Page List ---');
    result.pages.forEach(p => console.log(` - ${p.title} (${p.url})`));

    console.log('\n--- Violation Summary ---');
    console.log(JSON.stringify(result.summary, null, 2));

    if (result.seoResult) {
      console.log('\n--- SEO Result ---');
      console.log('Overall Score:', result.seoResult.overallScore);
    }
  } catch (error) {
    console.error('❌ Audit execution failed:', error);
  }
}

main();
