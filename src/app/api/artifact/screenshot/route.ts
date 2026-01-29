import { NextRequest, NextResponse } from 'next/server';

/**
 * GitHub Actions Artifact에서 스크린샷을 프록시하는 API 엔드포인트
 * 
 * GET /api/artifact/screenshot?artifactName=screenshots-123456&filename=https___example_com_123.png
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const artifactName = searchParams.get('artifactName');
  const filename = searchParams.get('filename');

  if (!artifactName || !filename) {
    return NextResponse.json(
      { error: 'Missing artifactName or filename parameter' },
      { status: 400 }
    );
  }

  const githubToken = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY || 'UX-Ino/etrial-inspect';
  const [owner, repoName] = repo.split('/');

  if (!githubToken) {
    return NextResponse.json(
      { error: 'GitHub token not configured. Please set GITHUB_TOKEN environment variable.' },
      { status: 500 }
    );
  }

  try {
    // 1. Artifact 목록에서 해당 이름의 Artifact 찾기
    const artifactsResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/actions/artifacts?name=${artifactName}`,
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!artifactsResponse.ok) {
      const errorText = await artifactsResponse.text();
      console.error('GitHub API error:', errorText);
      return NextResponse.json(
        { error: 'Failed to fetch artifacts from GitHub' },
        { status: artifactsResponse.status }
      );
    }

    const artifactsData = await artifactsResponse.json();

    if (artifactsData.total_count === 0) {
      return NextResponse.json(
        { error: 'Artifact not found', artifactName },
        { status: 404 }
      );
    }

    const artifact = artifactsData.artifacts[0];

    // 2. Artifact 다운로드 URL 가져오기
    const downloadResponse = await fetch(artifact.archive_download_url, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
      redirect: 'manual', // 리다이렉트 URL 직접 처리
    });

    // GitHub은 302 리다이렉트로 실제 다운로드 URL 반환
    const downloadUrl = downloadResponse.headers.get('location');

    if (!downloadUrl) {
      // Artifact 정보만 반환 (클라이언트에서 직접 다운로드 안내)
      return NextResponse.json({
        message: 'Artifact found but direct download not available',
        artifact: {
          id: artifact.id,
          name: artifact.name,
          size_in_bytes: artifact.size_in_bytes,
          created_at: artifact.created_at,
          expires_at: artifact.expires_at,
          archive_download_url: artifact.archive_download_url,
        },
        requestedFilename: filename,
      });
    }

    // 3. ZIP 파일 다운로드 및 특정 파일 추출은 복잡하므로
    //    다운로드 URL만 반환 (클라이언트에서 처리)
    return NextResponse.json({
      downloadUrl,
      artifact: {
        id: artifact.id,
        name: artifact.name,
        expires_at: artifact.expires_at,
      },
      requestedFilename: filename,
    });
  } catch (error) {
    console.error('Error fetching artifact:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}
