import { NextRequest, NextResponse } from 'next/server';
import { triggerAudit } from '@/services/AuditService';
import { AuditConfig } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const config: AuditConfig = await request.json();

    // 🔧 Run audit logic (Environment-agnostic)
    console.log('🚀 Starting audit execution...');

    // Dynamic import to avoid bundling Playwright in production
    const { runAudit } = await import('@/services/AuditExecutor');
    const result = await runAudit(config);

    return NextResponse.json(result);

  } catch (error) {
    console.error('Audit trigger error:', error);
    return NextResponse.json(
      { error: `진단 요청 중 오류가 발생했습니다: ${error instanceof Error ? error.message : error}` },
      { status: 500 }
    );
  }
}
