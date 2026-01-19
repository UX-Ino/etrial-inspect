import { NextResponse } from 'next/server';
import { NotionService } from '@/services/notion/NotionService';

export async function POST(request: Request) {
  try {
    const result = await request.json();

    // 환경 변수 체크
    const apiKey = process.env.NOTION_API_KEY;
    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!apiKey || !databaseId) {
      console.error(`Missing Env Vars - API Key: ${!!apiKey}, DB ID: ${!!databaseId}`);
      return NextResponse.json(
        { error: 'Notion API Key or Database ID not configured (Check Vercel Env Vars).' },
        { status: 500 }
      );
    }

    const notionService = new NotionService(apiKey, databaseId);

    // 1. Notion 페이지 생성 (리포트 링크 없이)
    const pageId = await notionService.saveAuditResult(result);

    // 2. 리포트 링크 생성 (페이지 ID 포함 - Clean URL)
    const origin = request.headers.get('origin') || 'http://localhost:3000';
    const reportUrl = `${origin}/report/${pageId}`;

    // 3. 페이지에 리포트 링크 업데이트
    await notionService.updatePageProperty(pageId, {
      'Report Link': {
        url: reportUrl,
      },
    });

    return NextResponse.json({ success: true, message: 'Saved to Notion successfully.', reportUrl });
  } catch (error) {
    console.error('Failed to save to Notion:', error);
    console.error('Failed to save to Notion:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to save to Notion: ${errorMessage}` },
      { status: 500 }
    );
  }
}
