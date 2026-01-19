import { NextRequest, NextResponse } from 'next/server';
import { ExcelGenerator } from '@/lib/excel-generator';
import { AuditResult } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const result: AuditResult = await request.json();

    const generator = new ExcelGenerator({
      includeViolations: true,
      platform: 'PC',
      inspector: 'System'
    });

    const buffer = await generator.generateAuditReport(result);

    return new NextResponse(buffer as any, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=kwcag-audit-${new Date().toISOString().split('T')[0]}.xlsx`,
      },
    });
  } catch (error) {
    console.error('Excel export error:', error);
    return NextResponse.json(
      { error: '엑셀 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
