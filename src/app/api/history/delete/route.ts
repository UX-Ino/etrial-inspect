import { Utils } from '@/services/utils';
import { NotionService } from '@/services/notion/NotionService';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  await Utils.simulatedDelay(300);

  if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
    return NextResponse.json({ error: 'Notion configuration missing' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { pageId } = body;

    if (!pageId) {
      return NextResponse.json({ error: 'Page ID is required' }, { status: 400 });
    }

    const notionService = new NotionService(
      process.env.NOTION_API_KEY,
      process.env.NOTION_DATABASE_ID
    );

    const success = await notionService.softDeletePage(pageId);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error deleting page:', error);
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
  }
}
