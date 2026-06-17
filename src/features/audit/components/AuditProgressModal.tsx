import { useEffect, useRef } from 'react';
import styles from '@/app/page.module.css';
import { LogEntry, ProgressState } from '../hooks/useAudit';
import { Button } from '@/components/ui/Button';
import React from 'react';

interface AuditProgressModalProps {
  logs: LogEntry[];
  progress: ProgressState;
  onExport: () => void;
  onSaveToNotion: () => void;
  resultSummary: { pages: number; violations: number } | null;
  latestReportId?: string | null;
  wasGitHubAudit?: boolean;
  onViewLatestReport?: () => void;
  onClose: () => void;
}

export const AuditProgressModal = ({
  logs,
  progress,
  onExport,
  onSaveToNotion,
  resultSummary,
  latestReportId,
  wasGitHubAudit,
  onViewLatestReport,
  onClose,
}: AuditProgressModalProps) => {
  const logsRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs area
  useEffect(() => {
    if (logsRef.current) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
    }
  }, [logs]);

  // Determine title and subtext based on status
  let statusTitle = '진단 준비 중';
  let statusSub = '진단 시작을 대기하고 있습니다.';
  const isFinished = progress.status === 'completed';
  const isError = progress.status === 'error';

  if (progress.status === 'crawling') {
    statusTitle = '페이지를 수집하는 중';
    statusSub = progress.currentUrl || '사이트 링크 구조를 파악하고 있습니다.';
  } else if (progress.status === 'auditing') {
    statusTitle = '웹접근성 규격 진단 중';
    statusSub = progress.currentUrl || 'KWCAG 2.2 표준 검사를 적용하고 있습니다.';
  } else if (progress.status === 'github_polling') {
    statusTitle = '대규모 원격 진단 중';
    statusSub = 'GitHub Actions 워크플로우를 원격 모니터링하고 있습니다.';
  } else if (isFinished) {
    statusTitle = '🎉 진단이 완료되었습니다';
    statusSub = '진단 데이터가 정상적으로 취합되었습니다.';
  } else if (isError) {
    statusTitle = '❌ 진단 중 오류 발생';
    statusSub = '작업 중 예상치 못한 문제가 발생했습니다.';
  }

  // Calculate percentage
  let progressPercent = 0;
  if (progress.status === 'auditing' && progress.totalFound > 0) {
    progressPercent = Math.round((progress.processed / progress.totalFound) * 100);
  } else if (progress.status === 'crawling') {
    progressPercent = 15; // Crawling placeholder progress
  } else if (progress.status === 'github_polling') {
    progressPercent = 50; // GitHub Actions placeholder progress
  } else if (isFinished) {
    progressPercent = 100;
  }

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal-container']}>
        <div className={styles['modal-header']}>
          <span className={styles['modal-title']}>진단 모니터</span>
          <button
            onClick={onClose}
            className={styles['modal-close-btn']}
            aria-label="닫기"
          >
            &times;
          </button>
        </div>

        <div className={styles['modal-body']}>
          {!isFinished && !isError && (
            <div className={styles['loading-graphics']}>
              <div className={styles['loader-ring']} />
            </div>
          )}

          <div>
            <h2 className={styles['status-headline']}>{statusTitle}</h2>
            <p className={styles['status-sub']}>{statusSub}</p>
          </div>

          {/* Progress Bar */}
          {!isError && (
            <div style={{ width: '100%' }}>
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className={styles['progress-info']}>
                <span>진행 상태</span>
                <span>{progressPercent}%</span>
              </div>
            </div>
          )}

          {/* Real-time Logs Console */}
          <div className={styles['logs-console']} ref={logsRef}>
            {logs.length === 0 && (
              <div className={styles['log-entry']}>
                <span className={styles['log-timestamp']}>[시스템]</span>
                <span className={styles['log-msg']}>로그 스트리밍을 대기하고 있습니다...</span>
              </div>
            )}
            {logs.map((log, idx) => (
              <div key={idx} className={styles['log-entry']}>
                <span className={styles['log-timestamp']}>[{log.time}]</span>
                <span className={styles['log-msg']}>{log.message}</span>
              </div>
            ))}
          </div>

          {/* Complete View Metrics */}
          {isFinished && (
            <div className={styles['metrics-row']}>
              <div className={styles['metric-box']}>
                <span className={styles['metric-num']}>{resultSummary?.pages || progress.totalFound}</span>
                <span className={styles['metric-lbl']}>총 분석 페이지</span>
              </div>
              <div className={styles['metric-box']}>
                <span className={`${styles['metric-num']} ${styles['violations-num']}`}>
                  {resultSummary?.violations !== undefined ? resultSummary.violations : progress.violations}
                </span>
                <span className={styles['metric-lbl']}>검출된 위반 건수</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className={styles['modal-actions']}>
            {isFinished ? (
              <>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    if (onViewLatestReport) {
                      onViewLatestReport();
                    } else {
                      window.location.href = '/report';
                    }
                  }}
                  style={{ height: '52px', borderRadius: '14px', fontSize: '1rem', fontWeight: 600 }}
                >
                  📄 상세 리포트 보기
                </Button>
                <div className={styles['modal-actions-row']}>
                  <Button
                    variant="success"
                    onClick={onExport}
                    style={{ height: '48px', borderRadius: '12px' }}
                  >
                    📊 엑셀 다운로드
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={onSaveToNotion}
                    style={{ height: '48px', borderRadius: '12px', background: '#333d4b', color: 'white' }}
                  >
                    📝 Notion 저장
                  </Button>
                </div>
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={onClose}
                  style={{ height: '48px', borderRadius: '12px', marginTop: '0.25rem' }}
                >
                  닫기
                </Button>
              </>
            ) : isError ? (
              <Button
                variant="secondary"
                fullWidth
                onClick={onClose}
                style={{ height: '48px', borderRadius: '12px' }}
              >
                닫고 돌아가기
              </Button>
            ) : (
              <Button
                variant="secondary"
                fullWidth
                onClick={onClose}
                style={{ height: '48px', borderRadius: '12px', opacity: 0.8 }}
              >
                모니터 닫기 (검사는 계속 진행됨)
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
