import React, { useEffect, useState } from 'react';
import styles from './ViolationDetailModal.module.css';
import { Violation, BoundingBox } from '@/types';

interface ViolationDetailModalProps {
  violation: Violation | null;
  boundingBox?: BoundingBox;
  screenshotPath?: string;
  artifactName?: string | null;
  onClose: () => void;
}

export const ViolationDetailModal: React.FC<ViolationDetailModalProps> = ({
  violation,
  boundingBox,
  screenshotPath,
  artifactName,
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
  const isArtifactScreenshot = Boolean(artifactName && screenshotPath);

  // Artifact 스크린샷인 경우 안내 메시지 표시 (직접 다운로드 필요)
  const showArtifactNote = isArtifactScreenshot;

  // Artifact 다운로드 URL 상태
  const [artifactUrl, setArtifactUrl] = useState<string | null>(null);
  const [isLoadingArtifact, setIsLoadingArtifact] = useState(false);

  useEffect(() => {
    if (artifactName && !hasScreenshot) {
      setIsLoadingArtifact(true);
      // 스크린샷 파일명 추출 (경로에서)
      const filename = screenshotPath ? screenshotPath.split('/').pop() : '';

      fetch(`/api/artifact/screenshot?artifactName=${artifactName}&filename=${filename}`)
        .then(res => res.json())
        .then(data => {
          if (data.downloadUrl) {
            setArtifactUrl(data.downloadUrl);
          }
        })
        .catch(err => console.error('Failed to fetch artifact url:', err))
        .finally(() => setIsLoadingArtifact(false));
    }
  }, [artifactName, hasScreenshot, screenshotPath]);

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
                src={screenshotPath}
                alt="Page Screenshot"
                className={styles['screenshot-img']}
                onLoad={updateScale}
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
              <p>📦 이 스크린샷은 GitHub Actions Artifact에 저장되어 있습니다.</p>
              <p style={{ fontSize: '14px', marginTop: '12px' }}>
                Artifact 이름: <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>{artifactName}</code>
              </p>
              <p style={{ fontSize: '13px', marginTop: '8px', color: '#999' }}>
                GitHub 저장소의 Actions 탭에서 Artifact를 다운로드할 수 있습니다.
              </p>
              {isLoadingArtifact ? (
                <p style={{ marginTop: '12px', fontSize: '13px' }}>⏳ 다운로드 링크 확인 중...</p>
              ) : artifactUrl ? (
                <a
                  href={artifactUrl}
                  className={styles['open-link-btn']}
                  style={{ display: 'inline-block', marginTop: '12px', background: '#2da44e', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px' }}
                >
                  📥 Artifact ZIP 다운로드
                </a>
              ) : null}
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
