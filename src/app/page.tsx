'use client';

import Image from 'next/image';
import logoImg from '../../public/images/logo.png';
import styles from './page.module.css';
import { useAudit } from '@/features/audit/hooks/useAudit';
import { AuditConfigForm } from '@/features/audit/components/AuditConfigForm';
import { AuditTerminal } from '@/features/audit/components/AuditTerminal';

export default function Home() {
  const {
    config,
    setConfig,
    progress,
    results,
    logs,
    startAudit,
    exportExcel
  } = useAudit();

  const isProcessing = progress.status === 'crawling' || progress.status === 'auditing';

  return (
    <div className="container">
      <header className={styles.header}>
        <h1 className={styles.title}>
          <Image
            src={logoImg}
            alt="E-Tribe Logo"
            className={`${styles['title-icon']} ${styles['logo-image']}`}
          />
          이트라이브 웹접근성 자동 진단 도구
        </h1>
        <p className={styles.subtitle}>
          KWCAG 2.2 웹 접근성 진단 시스템
        </p>
      </header>

      <main className={styles.main}>
        <div className={styles.grid}>
          {/* 설정 카드 */}
          <section>
            <AuditConfigForm
              config={config}
              setConfig={setConfig}
              onStart={startAudit}
              isProcessing={isProcessing}
            />
          </section>

          {/* 터미널 윈도우 UI */}
          <section>
            <AuditTerminal
              logs={logs}
              progress={progress}
              onExport={exportExcel}
              resultSummary={results}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
