
import { runAudit } from '../src/services/AuditExecutor';
import { AuditConfig } from '../src/types';
import { NotionService } from '../src/services/notion/NotionService';

async function main() {
  const targetUrl = process.env.TARGET_URL;
  if (!targetUrl) {
    console.error('Error: TARGET_URL environment variable is required');
    process.exit(1);
  }

  const config: AuditConfig = {
    targetUrl: targetUrl,
    enableLogin: false, // Default to false for GHA for now, or pass via env
    enableAccessibilityCheck: true,
    enableSEOCheck: true,
    platform: 'PC',
    inspector: 'GitHub Actions'
  };

  console.log('Starting Audit for:', targetUrl);

  try {
    const result = await runAudit(config, (progress) => {
      console.log(`[Progress] ${progress.type}: ${progress.message || ''}`, progress);
    });

    console.log('Audit Completed successfully.');
    console.log(JSON.stringify(result, null, 2));

    // Check if any errors occurred during audit logic that didn't throw
    if (result.violations.length > 0) {
      console.log(`Found ${result.violations.length} violations.`);
    }

    // Notion에 결과 저장
    const notionApiKey = process.env.NOTION_API_KEY;
    const notionDatabaseId = process.env.NOTION_DATABASE_ID;

    if (notionApiKey && notionDatabaseId) {
      console.log('Saving results to Notion...');
      const notionService = new NotionService(notionApiKey, notionDatabaseId);
      const pageId = await notionService.saveAuditResult(result);
      console.log(`✅ Notion 저장 완료! Page ID: ${pageId}`);
    } else {
      console.warn('⚠️ Notion credentials not found. Skipping Notion save.');
    }

  } catch (error) {
    console.error('Audit failed:', error);
    process.exit(1);
  }
}

main();
