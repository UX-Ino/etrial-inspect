'use client';

import Image from 'next/image';
import logoImg from '../../public/images/logo.png';
import styles from './page.module.css';
import { useAudit } from '@/features/audit/hooks/useAudit';
import { AuditConfigForm } from '@/features/audit/components/AuditConfigForm';
import { AuditProgressModal } from '@/features/audit/components/AuditProgressModal';
import { HistoryList } from '@/features/history/components/HistoryList';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const [historyRefreshTrigger, setHistoryRefreshTrigger] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 히스토리 갱신 콜백
  const handleHistoryRefresh = useCallback(() => {
    setHistoryRefreshTrigger(prev => prev + 1);
  }, []);

  const {
    config,
    setConfig,
    progress,
    results,
    logs,
    startAudit,
    triggerGitHubAudit,
    exportExcel,
    saveToNotion,
    auditResult,
    isPollingGitHub,
    latestReportId,
    wasGitHubAudit,
    checkAndNavigateToLatestReport,
  } = useAudit(handleHistoryRefresh);

  const handleSaveToNotion = async () => {
    if (!auditResult) return;

    try {
      const response = await fetch('/api/history/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(auditResult),
      });

      if (!response.ok) throw new Error('Failed to save to Notion');

      const { reportUrl } = await response.json();
      alert(`Notion에 저장되었습니다!\n${reportUrl}`);

      // Refresh History List
      setHistoryRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Failed to save:', error);
      alert('저장 실패: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleViewLatestReport = () => {
    checkAndNavigateToLatestReport(router);
  };

  const isProcessing = progress.status === 'crawling' || progress.status === 'auditing' || progress.status === 'github_polling';

  // 검사 시작 시 모달 자동으로 열기
  useEffect(() => {
    if (isProcessing) {
      setIsModalOpen(true);
    }
  }, [isProcessing]);

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1 className={styles.title} style={{ color: 'var(--foreground)', fontSize: '1.4rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Image
            src={logoImg}
            alt="E-Tribe Logo"
            className={`${styles['title-icon']} ${styles['logo-image']}`}
            style={{ width: '36px', height: '36px' }}
          />
          이트라이브 웹접근성 자동 진단 도구
        </h1>
        <p className={styles.subtitle} style={{ color: '#8b95a1', fontSize: '0.85rem', fontWeight: 500, paddingLeft: '44px' }}>
          KWCAG 2.2 웹 접근성 진단 시스템
        </p>
      </header>

      <main className={styles.main} style={{ flex: 1, minHeight: 0 }}>
        <div className={styles.grid}>
          {/* 설정 카드 */}
          <section className={styles.gridSection}>
            <AuditConfigForm
              config={config}
              setConfig={setConfig}
              onStart={startAudit}
              onGitHubStart={triggerGitHubAudit}
              isProcessing={isProcessing}
            />
          </section>

          {/* 진단 이력 리스트 */}
          <section className={styles.gridSection}>
            <HistoryList refreshTrigger={historyRefreshTrigger} />
          </section>
        </div>
      </main>

      {/* 실시간 진행 모달 */}
      {isModalOpen && (
        <AuditProgressModal
          logs={logs}
          progress={progress}
          onExport={exportExcel}
          onSaveToNotion={() => { if (auditResult) handleSaveToNotion(); }}
          resultSummary={results}
          latestReportId={latestReportId}
          wasGitHubAudit={wasGitHubAudit}
          onViewLatestReport={handleViewLatestReport}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
