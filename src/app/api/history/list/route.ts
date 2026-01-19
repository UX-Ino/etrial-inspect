import { Utils } from '@/services/utils';
import { NotionService } from '@/services/notion/NotionService';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  await Utils.simulatedDelay(300);

  const apiKey = process.env.NOTION_API_KEY;
  const dbId = process.env.NOTION_DATABASE_ID;

  if (!apiKey || !dbId) {
    console.error(`Missing Env Vars - API Key: ${!!apiKey}, DB ID: ${!!dbId}`);
    return NextResponse.json({ error: 'Notion configuration missing (Check Vercel Env Vars)' }, { status: 500 });
  }

  try {
    const notionService = new NotionService(
      apiKey,
      dbId
    );

    const history = await notionService.getAuditHistory();
    return NextResponse.json(history);
  } catch (error: any) {
    console.error('Error fetching history:', error);
    return NextResponse.json({
      error: 'Failed to fetch history',
      details: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
