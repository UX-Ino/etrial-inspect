import { useEffect, useRef } from 'react';
import styles from '@/app/page.module.css';
import { LogEntry, ProgressState } from '../hooks/useAudit';
import { Button } from '@/components/ui/Button';

interface AuditTerminalProps {
  logs: LogEntry[];
  progress: ProgressState;
  onExport: () => void;
  resultSummary: { pages: number; violations: number } | null;
}

export const AuditTerminal = ({ logs, progress, onExport, resultSummary }: AuditTerminalProps) => {
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div>
      <div className={styles['terminal-window']}>
        <div className={styles['terminal-header']}>
          <div className={styles['terminal-controls']}>
            <div className={`${styles.control} ${styles.close}`}></div>
            <div className={`${styles.control} ${styles.minimize}`}></div>
            <div className={`${styles.control} ${styles.maximize}`}></div>
          </div>
          <div className={styles['terminal-title']}>axecore-terminal — node</div>
        </div>
        <div className={styles['terminal-body']} ref={terminalRef}>
          {logs.length === 0 && (
            <div style={{ opacity: 0.5 }}>
              <span className={styles['log-time']}>[시스템]</span>
              스캔 준비 완료. 입력을 기다리는 중...
            </div>
          )}

          {logs.map((log, index) => (
            <div key={index} className={styles['log-line']}>
              <span className={styles['log-time']}>[{log.time}]</span>
              {log.message}
            </div>
          ))}

          {(progress.status === 'crawling' || progress.status === 'auditing') && (
            <div style={{ marginTop: '0.5rem' }}>
              <span className={styles.cursor}></span>
            </div>
          )}

          {progress.status === 'completed' && (
            <>
              <div className={styles['status-line']}>
                ----------------------------------------<br />
                진단 완료<br />
                ----------------------------------------
              </div>
              <div>총 페이지: {resultSummary?.pages}</div>
              <div>발견된 위반: {resultSummary?.violations}</div>
            </>
          )}
        </div>
      </div>

      {/* 완료 후 버튼 표시 */}
      {progress.status === 'completed' && (
        <div className={styles['action-buttons']}>
          <Button variant="success" onClick={onExport}>
            📊 엑셀 다운로드
          </Button>
          <a href="/report" className="btn btn-secondary" style={{ flex: 1, textAlign: 'center', lineHeight: '46px' }}>
            📄 상세 리포트 보기
          </a>
        </div>
      )}
    </div>
  );
};
