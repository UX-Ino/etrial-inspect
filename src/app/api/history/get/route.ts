import { NextResponse } from 'next/server';
import { NotionService } from '@/services/notion/NotionService';

export const dynamic = 'force-dynamic'; // Required for API routes reading searchParams

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }

    const apiKey = process.env.NOTION_API_KEY;
    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!apiKey || !databaseId) {
      return NextResponse.json(
        { error: 'Notion API Key or Database ID not configured.' },
        { status: 500 }
      );
    }

    const notionService = new NotionService(apiKey, databaseId);
    const auditResult = await notionService.getAuditResult(id);

    if (!auditResult) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    return NextResponse.json(auditResult);
  } catch (error) {
    console.error('Failed to get Notion report:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve report.' },
      { status: 500 }
    );
  }
}
