import * as dotenv from 'dotenv';
import * as path from 'path';
import { NotionService } from '../src/services/notion/NotionService';

// Load .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function main() {
  const apiKey = process.env.NOTION_API_KEY;
  const dbId = process.env.NOTION_DATABASE_ID;

  if (!apiKey || !dbId) {
    console.error('Notion credentials missing in .env!');
    process.exit(1);
  }

  console.log('API Key exists:', !!apiKey);
  console.log('Database ID:', dbId);

  const notionService = new NotionService(apiKey, dbId);
  const history = await notionService.getAuditHistory();

  console.log('\n--- Notion Audit History ---');
  history.forEach((h, i) => {
    console.log(`[${i+1}] ID: ${h.id}`);
    console.log(`    Date: ${h.date}`);
    console.log(`    URL: ${h.url}`);
    console.log(`    Score: ${h.score}`);
    console.log(`    Violations: ${h.violationCount}`);
    console.log(`    Report Link: ${h.reportLink}`);
  });
}

main();
