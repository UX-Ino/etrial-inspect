import React, { useState } from 'react';
import { calculateCost, CostReport, Role } from '@/lib/cost-calculator';
import { Violation } from '@/types';
import styles from './CostReportModal.module.css';

interface Props {
  violations: Violation[];
  onClose: () => void;
}

export default function CostReportModal({ violations, onClose }: Props) {
  const report: CostReport = calculateCost(violations);
  const [copied, setCopied] = useState(false);

  const roleLabels: Record<Role, string> = {
    Planning: '기획',
    Design: '디자인',
    Publishing: '퍼블리싱',
    Development: '개발',
  };

  // 1. Dashboard calculations
  const totalRawViolations = violations.length;
  const uniquePagesCount = new Set(violations.map(v => v.pageUrl)).size;
  const commonViolationsCount = violations.filter(v => v.isCommon).length;

  // 2. Chart percentages
  const totalMM = report.totalManMonths;
  const rolePercentages = report.items.reduce((acc, item) => {
    acc[item.role] = totalMM > 0 ? (item.manMonths / totalMM) * 100 : 0;
    return acc;
  }, {} as Record<Role, number>);

  // 3. Export to Excel (TSV format)
  const handleCopyTSV = async () => {
    try {
      const headers = ['직무', '진단 건수', '예상 공수 (M/M)', '주요 작업 내용'];
      const rows = report.items.map(item => [
        roleLabels[item.role],
        `${item.count}건`,
        `${item.manMonths.toFixed(4)} M/M`,
        item.description
      ]);
      const totalRow = [
        '합계',
        `${report.totalViolations}건`,
        `${report.totalManMonths.toFixed(4)} M/M`,
        '공통 UI 검증 및 파일 오픈 오버헤드 반영 완료'
      ];

      const tsvContent = [
        headers.join('\t'),
        ...rows.map(r => r.join('\t')),
        totalRow.join('\t')
      ].join('\n');

      await navigator.clipboard.writeText(tsvContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy TSV to clipboard:', err);
      alert('클립보드 복사에 실패했습니다.');
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>💰 접근성 개선 공수 산출 리포트 (M/M)</h2>
          <button onClick={onClose} className={styles['close-btn']}>&times;</button>
        </div>

        <div className={styles.content}>
          {/* 1. Summary Dashboard */}
          <div className={styles['summary-dashboard']}>
            <div className={styles['summary-card']}>
              <label>대상 페이지 수</label>
              <span>{uniquePagesCount} 개면</span>
            </div>
            <div className={styles['summary-card']}>
              <label>전체 감지 건수</label>
              <span>{totalRawViolations} 건</span>
            </div>
            <div className={styles['summary-card']}>
              <label>템플릿 공통 UI 건수</label>
              <span>{commonViolationsCount} 건</span>
            </div>
            <div className={styles['summary-card']}>
              <label>최종 조정 공수</label>
              <span style={{ color: '#2563eb' }}>{report.totalManMonths.toFixed(4)} M/M</span>
            </div>
          </div>

          <div className={styles.section}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3>1. 파트별 공수 요약 (M/M 산출)</h3>
              <button 
                onClick={handleCopyTSV} 
                className={`${styles['copy-btn']} ${copied ? styles['copy-success'] : ''}`}
              >
                {copied ? '✓ 복사 완료!' : '📋 엑셀용 복사 (TSV)'}
              </button>
            </div>
            <p className={styles.info}>* 1 M/M = 160시간 기준 (직무 가중 분배, 파일 수정 오버헤드 및 공통 UI 반복 할인 적용 완료)</p>

            <table className={styles.table}>
              <colgroup>
                <col span={1} style={{ width: '15%' }} />
                <col span={1} style={{ width: '15%' }} />
                <col span={1} style={{ width: '20%' }} />
                <col span={1} style={{ width: '' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>직무</th>
                  <th>위반 건수</th>
                  <th>예상 공수 (Man-Month)</th>
                  <th>주요 작업 내용</th>
                </tr>
              </thead>
              <tbody>
                {report.items.map((item) => (
                  <tr key={item.role}>
                    <td className={styles['role-cell']}>{roleLabels[item.role]}</td>
                    <td className={styles.center}>{item.count}건</td>
                    <td className={styles.center}><strong>{item.manMonths.toFixed(4)} M/M</strong></td>
                    <td className={styles['desc-cell']}>{item.description}</td>
                  </tr>
                ))}
                <tr className={styles['total-row']}>
                  <td>합계</td>
                  <td className={styles.center}>{report.totalViolations}건</td>
                  <td className={styles.center}>
                    <div className={styles['mm-badge']}>
                      {report.totalManMonths.toFixed(4)} M/M
                    </div>
                  </td>
                  <td>공통 UI 검증 및 중복 파일 가중 오버헤드 합산됨</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 2. Visual Chart Section */}
          {totalMM > 0 && (
            <div className={styles['chart-container']}>
              <div className={styles['chart-title']}>🎨 직무별 공수 기여도 점유율 (M/M 비율)</div>
              <div className={styles['bar-track']}>
                {rolePercentages.Planning > 0 && (
                  <div 
                    className={`${styles['bar-segment']} ${styles['bar-planning']}`} 
                    style={{ width: `${rolePercentages.Planning}%` }}
                    title={`기획: ${rolePercentages.Planning.toFixed(1)}%`}
                  >
                    {rolePercentages.Planning > 8 && `${rolePercentages.Planning.toFixed(1)}%`}
                  </div>
                )}
                {rolePercentages.Design > 0 && (
                  <div 
                    className={`${styles['bar-segment']} ${styles['bar-design']}`} 
                    style={{ width: `${rolePercentages.Design}%` }}
                    title={`디자인: ${rolePercentages.Design.toFixed(1)}%`}
                  >
                    {rolePercentages.Design > 8 && `${rolePercentages.Design.toFixed(1)}%`}
                  </div>
                )}
                {rolePercentages.Publishing > 0 && (
                  <div 
                    className={`${styles['bar-segment']} ${styles['bar-publishing']}`} 
                    style={{ width: `${rolePercentages.Publishing}%` }}
                    title={`퍼블리싱: ${rolePercentages.Publishing.toFixed(1)}%`}
                  >
                    {rolePercentages.Publishing > 8 && `${rolePercentages.Publishing.toFixed(1)}%`}
                  </div>
                )}
                {rolePercentages.Development > 0 && (
                  <div 
                    className={`${styles['bar-segment']} ${styles['bar-development']}`} 
                    style={{ width: `${rolePercentages.Development}%` }}
                    title={`개발: ${rolePercentages.Development.toFixed(1)}%`}
                  >
                    {rolePercentages.Development > 8 && `${rolePercentages.Development.toFixed(1)}%`}
                  </div>
                )}
              </div>

              <div className={styles['legend-grid']}>
                <div className={styles['legend-item']}>
                  <div className={`${styles['legend-color']} ${styles['bar-planning']}`}></div>
                  기획: {report.items.find(i => i.role === 'Planning')?.manMonths.toFixed(4)} M/M
                </div>
                <div className={styles['legend-item']}>
                  <div className={`${styles['legend-color']} ${styles['bar-design']}`}></div>
                  디자인: {report.items.find(i => i.role === 'Design')?.manMonths.toFixed(4)} M/M
                </div>
                <div className={styles['legend-item']}>
                  <div className={`${styles['legend-color']} ${styles['bar-publishing']}`}></div>
                  퍼블리싱: {report.items.find(i => i.role === 'Publishing')?.manMonths.toFixed(4)} M/M
                </div>
                <div className={styles['legend-item']}>
                  <div className={`${styles['legend-color']} ${styles['bar-development']}`}></div>
                  개발: {report.items.find(i => i.role === 'Development')?.manMonths.toFixed(4)} M/M
                </div>
              </div>
            </div>
          )}

          {/* 3. Recommendations Section */}
          <div className={styles.section}>
            <h3>2. 파트별 주요 수정 권고 사항</h3>
            <div className={styles['rec-grid']}>
              {Object.entries(report.recommendations).map(([role, items]) => (
                <div key={role} className={styles['rec-card']}>
                  <h4>{roleLabels[role as Role]}</h4>
                  <ul>
                    {items.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button onClick={onClose} className={styles['confirm-btn']}>닫기</button>
        </div>
      </div>
    </div>
  );
}
