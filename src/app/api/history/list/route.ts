import { Utils } from '@/services/utils';
import { NotionService } from '@/services/notion/NotionService';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  await Utils.simulatedDelay(300);

  if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
    return NextResponse.json({ error: 'Notion configuration missing' }, { status: 500 });
  }

  try {
    const notionService = new NotionService(
      process.env.NOTION_API_KEY,
      process.env.NOTION_DATABASE_ID
    );

    const history = await notionService.getAuditHistory();
    return NextResponse.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
  }
}
