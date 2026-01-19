import React, { useEffect, useState } from 'react';
import styles from './ViolationDetailModal.module.css';
import { Violation, BoundingBox } from '@/types';

interface ViolationDetailModalProps {
  violation: Violation | null;
  boundingBox?: BoundingBox;
  screenshotPath?: string;
  onClose: () => void;
}

export const ViolationDetailModal: React.FC<ViolationDetailModalProps> = ({
  violation,
  boundingBox,
  screenshotPath,
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
  }, []);

  // 스크린샷 유무 확인
  const hasScreenshot = Boolean(screenshotPath);

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
          {hasScreenshot ? (
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
