import { NextRequest, NextResponse } from 'next/server';
import { triggerAudit } from '@/services/AuditService';
import { AuditConfig } from '@/types';

// Set max duration for Vercel Serverless Function (Start with 60s, max 300s for Pro)
export const maxDuration = 300;
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const config: AuditConfig = await request.json();

    console.log('🚀 Starting audit execution...');

    // Dynamic import to avoid bundling excessive dependencies on cold start
    let runAudit;
    try {
      const module = await import('@/services/AuditExecutor');
      runAudit = module.runAudit;
    } catch (e) {
      console.error('Failed to import AuditExecutor:', e);
      throw new Error('Audit Engine module failed to load.');
    }

    const result = await runAudit(config);

    return NextResponse.json(result);

  } catch (error: any) {
    console.error('Audit execution error:', error);
    return NextResponse.json(
      {
        error: `진단 실행 중 오류가 발생했습니다.`,
        details: error.message,
        stack: error.stack
      },
      { status: 500 }
    );
  }
}
