import * as dotenv from 'dotenv';
import * as path from 'path';
import { NotionService } from '../src/services/notion/NotionService';

// Load .env
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function main() {
  const apiKey = process.env.NOTION_API_KEY;
  const dbId = process.env.NOTION_DATABASE_ID;

  if (!apiKey || !dbId) {
    console.error('Notion credentials missing!');
    process.exit(1);
  }

  const notionService = new NotionService(apiKey, dbId);
  const pageId = '38172f61-c22d-812d-a36c-caea54728185';
  
  console.log('Fetching audit result for page:', pageId);
  const result = await notionService.getAuditResult(pageId);
  
  if (!result) {
    console.log('No result found or failed to parse.');
  } else {
    console.log('Result found:');
    console.log(' - Start Time:', result.startTime);
    console.log(' - Total Pages:', result.totalPages);
    console.log(' - Total Violations:', result.totalViolations);
    console.log(' - Pages:', result.pages);
    console.log(' - Violations Count:', result.violations.length);
  }
}

main();
