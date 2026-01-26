import { NextRequest, NextResponse } from 'next/server';

/**
 * GitHub Actions 워크플로우 상태 조회 API
 * - 폴링을 통해 워크플로우 진행 상황 확인
 * - 완료 시 conclusion(success/failure) 반환
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const runId = searchParams.get('runId');

    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;

    if (!token || !owner || !repo) {
      return NextResponse.json({
        error: 'GitHub configuration missing'
      }, { status: 500 });
    }

    // 특정 run_id가 주어진 경우 해당 워크플로우 조회
    if (runId) {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('GitHub API Error:', errorText);
        return NextResponse.json({ error: 'Failed to fetch run status' }, { status: response.status });
      }

      const run = await response.json();

      return NextResponse.json({
        runId: run.id,
        status: run.status, // queued, in_progress, completed
        conclusion: run.conclusion, // success, failure, cancelled, etc.
        startedAt: run.run_started_at,
        updatedAt: run.updated_at,
        htmlUrl: run.html_url,
        logsUrl: `${run.html_url}/logs`,
      });
    }

    // run_id가 없으면 최신 워크플로우 실행 조회
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/actions/runs?per_page=5`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API Error:', errorText);
      return NextResponse.json({ error: 'Failed to fetch runs' }, { status: response.status });
    }

    const data = await response.json();
    const runs = data.workflow_runs || [];

    // audit.yml 워크플로우만 필터링
    const auditRuns = runs.filter((run: any) => run.path === '.github/workflows/audit.yml');
    const latestRun = auditRuns[0];

    if (!latestRun) {
      return NextResponse.json({
        status: 'no_runs',
        message: 'No audit workflow runs found'
      });
    }

    return NextResponse.json({
      runId: latestRun.id,
      status: latestRun.status,
      conclusion: latestRun.conclusion,
      startedAt: latestRun.run_started_at,
      updatedAt: latestRun.updated_at,
      htmlUrl: latestRun.html_url,
      logsUrl: `${latestRun.html_url}/logs`,
    });

  } catch (error: any) {
    console.error('Status check error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
