'use client';

import React, { useEffect, useState } from 'react';
import { HistoryItem } from '@/types';
import styles from './HistoryList.module.scss';

interface HistoryListProps {
  refreshTrigger?: number;
}

export function HistoryList({ refreshTrigger }: HistoryListProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/history/list', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [refreshTrigger]);

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까? (Notion에서 숨김 처리됩니다)')) return;

    // Optimistic Update
    setHistory(prev => prev.filter(item => item.id !== id));

    try {
      const res = await fetch('/api/history/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId: id }),
      });

      if (!res.ok) {
        alert('삭제 실패했습니다.');
        fetchHistory(); // Revert
      }
    } catch (error) {
      console.error('Delete failed:', error);
      fetchHistory(); // Revert
    }
  };

  if (isLoading) return <div className={styles.loading}>히스토리 불러오는 중...</div>;
  if (isLoading) return <div className={styles.loading}>히스토리 불러오는 중...</div>;

  if (history.length === 0) {
    return (
      <div className={styles.historyWrap}>
        <h3 className={styles.historyTitle}>📋 진단 이력 (Notion)</h3>
        <div className={styles.emptyState}>저장된 이력이 없습니다.</div>
      </div>
    );
  }

  return (
    <div className={styles.historyWrap}>
      <h3 className={styles.historyTitle}>📋 진단 이력 (Notion)</h3>
      <div className={styles.historyList}>
        {history.map(item => (
          <div key={item.id} className={styles.historyItem}>
            {/* Top Row: URL & Delete Button */}
            <div className={styles.topRow}>
              <span className={styles.url} title={item.url}>{item.url}</span>
              <button
                onClick={() => handleDelete(item.id)}
                className={styles.btnDelete}
                aria-label="리포트 삭제"
                title="삭제"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" style={{ display: 'block' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

            {/* Bottom Row */}
            <div className={styles.bottomRow}>
              {/* Bottom Left: Date & Badges */}
              <div className={styles.metaRow}>
                <span className={styles.date}>{new Date(item.date).toLocaleDateString()}</span>
                <span className={styles.scoreBadge}>SEO {item.score}점</span>
                <span className={styles.violationBadge}>위반 {item.violationCount}건</span>
              </div>

              {/* Bottom Right: Actions */}
              <div className={styles.itemActions}>
                {/* Notion 페이지 ID 기반 상세 리포트 */}
                <a href={`/report/${item.id}`} className={styles.btnLink} aria-label="상세 리포트 보기" title="리포트 보기">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" style={{ display: 'block' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </a>
                {item.reportLink && (
                  <a
                    href={item.reportLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.btnLink} ${styles.btnNotion}`}
                    aria-label="Notion 페이지 열기"
                    title="Notion에서 보기"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ display: 'block' }}>
                      <path d="M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm2.5 4v10h2.4v-4.3l3.5 4.3h2.6V7h-2.4v4.3L9.1 7H6.5z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
