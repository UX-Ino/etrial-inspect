import React, { useEffect, useState } from 'react';
import styles from './ViolationDetailModal.module.css';
import { Violation, BoundingBox } from '@/types';

interface ViolationDetailModalProps {
  violation: Violation | null;
  boundingBox?: BoundingBox;
  screenshotPath?: string;
  artifactName?: string | null;
  screenshotUrl?: string | null;
  onClose: () => void;
}

export const ViolationDetailModal: React.FC<ViolationDetailModalProps> = ({
  violation,
  boundingBox,
  screenshotPath,
  artifactName,
  screenshotUrl,
  onClose,
}) => {
  if (!violation) return null;

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // 이미지 스케일링 상태
  const imgRef = React.useRef<HTMLImageElement>(null);
  const [scale, setScale] = useState(1);

  const updateScale = () => {
    if (imgRef.current) {
      const { clientWidth, naturalWidth } = imgRef.current;
      if (naturalWidth > 0) {
        setScale(clientWidth / naturalWidth);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // 스크린샷 유무 확인 및 URL 결정
  const hasScreenshot = Boolean(screenshotPath);

  // GitHub Pages URL 로직: screenshotPath에서 파일명 추출 후 Base URL과 결합
  const filename = screenshotPath ? screenshotPath.split('/').pop() : '';
  const finalImageUrl = screenshotUrl && filename ? `${screenshotUrl}${filename}` : screenshotPath;

  // Artifact 노트 표시 여부: artifactName이 있고, URL로 바로 볼 수 없는 경우에만 표시
  const showArtifactNote = Boolean(artifactName && screenshotPath && !screenshotUrl);

  // Artifact 다운로드 URL 상태
  const [artifactUrl, setArtifactUrl] = useState<string | null>(null);
  const [isLoadingArtifact, setIsLoadingArtifact] = useState(false);
  const [downloadError, setDownloadError] = useState(false);

  useEffect(() => {
    if (showArtifactNote) {
      setIsLoadingArtifact(true);
      setDownloadError(false);
      // 스크린샷 파일명 추출 (경로에서)
      const filename = screenshotPath ? screenshotPath.split('/').pop() : '';

      fetch(`/api/artifact/screenshot?artifactName=${artifactName}&filename=${filename}`)
        .then(res => res.json())
        .then(data => {
          if (data.downloadUrl) {
            setArtifactUrl(data.downloadUrl);
          } else {
            setDownloadError(true);
          }
        })
        .catch(err => {
          console.error('Failed to fetch artifact url:', err);
          setDownloadError(true);
        })
        .finally(() => setIsLoadingArtifact(false));
    }
  }, [showArtifactNote, artifactName, screenshotPath]);

  // GitHub Actions Run ID 추출 (screenshots-12345678 -> 12345678)
  const runId = artifactName?.replace('screenshots-', '');
  const actionsUrl = runId ? `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_REPO || 'UX-Ino/etrial-inspect'}/actions/runs/${runId}` : '#';

  return (
    <div className={styles['modal-overlay']} onClick={onClose}>
      <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
        <div className={styles['modal-header']}>
          <h2 className={styles['modal-title']}>
            위반 항목 상세: {violation.kwcagName}
          </h2>
          <button className={styles['close-btn']} onClick={onClose} aria-label="닫기">
            ×
          </button>
        </div>

        <div className={styles['modal-body']}>
          {hasScreenshot && !showArtifactNote ? (
            <div className={styles['screenshot-container']}>
              <img
                ref={imgRef}
                src={finalImageUrl}
                alt="Page Screenshot"
                className={styles['screenshot-img']}
                onLoad={updateScale}
                onError={(e) => {
                  console.error('Image load failed:', finalImageUrl);
                  // 로드 실패 시 스타일 조정 (선택 사항)
                }}
              />
              {boundingBox && (
                <div
                  className={styles['mask-box']}
                  style={{
                    left: boundingBox.x * scale,
                    top: boundingBox.y * scale,
                    width: boundingBox.width * scale,
                    height: boundingBox.height * scale,
                  }}
                >
                  <div className={styles['mask-label']}>위반 요소</div>
                </div>
              )}
            </div>
          ) : showArtifactNote ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
              <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                📦 스크린샷 확인 안내
              </p>
              <p>GitHub Actions 환경에서는 보안 정책상 이미지를 바로 볼 수 없으며,<br />압축 파일(ZIP)로 다운로드해야 합니다.</p>

              <div style={{ margin: '20px 0', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
                <p style={{ fontSize: '14px', marginBottom: '4px' }}>Artifact 이름</p>
                <code style={{ background: '#e9ecef', padding: '4px 8px', borderRadius: '4px', color: '#333' }}>{artifactName}</code>
              </div>

              {isLoadingArtifact ? (
                <p style={{ marginTop: '12px', fontSize: '13px' }}>⏳ 다운로드 링크 생성 중...</p>
              ) : artifactUrl ? (
                <a
                  href={artifactUrl}
                  className={styles['open-link-btn']}
                  style={{ display: 'inline-block', marginTop: '12px', background: '#2da44e', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}
                >
                  📥 Artifact ZIP 다운로드
                </a>
              ) : (
                <div style={{ marginTop: '12px' }}>
                  <p style={{ color: '#d73a49', fontSize: '13px', marginBottom: '8px' }}>
                    ⚠️ 다운로드 링크를 가져올 수 없습니다.
                  </p>
                  <a
                    href={actionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#0366d6', textDecoration: 'underline', fontSize: '13px', cursor: 'pointer' }}
                  >
                    GitHub Actions 실행 페이지에서 직접 확인하기 &rarr;
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
              <p>스크린샷 이미지가 없습니다.</p>
              <p>최신 검사를 실행하면 스크린샷이 생성됩니다.</p>
            </div>
          )}
        </div>

        <div className={styles['modal-footer']}>
          <a
            href={violation.pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles['open-link-btn']}
          >
            새 탭에서 실제 페이지 열기
          </a>
        </div>
      </div>
    </div>
  );
};
