import React from 'react';
import { calculateCost, CostReport, Role } from '@/lib/cost-calculator';
import { Violation } from '@/types';
import styles from './CostReportModal.module.css';

interface Props {
  violations: Violation[];
  onClose: () => void;
}

export default function CostReportModal({ violations, onClose }: Props) {
  const report: CostReport = calculateCost(violations);

  const roleLabels: Record<Role, string> = {
    Planning: '기획',
    Design: '디자인',
    Publishing: '퍼블리싱',
    Development: '개발',
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>💰 접근성 개선 공수 산출 리포트</h2>
          <button onClick={onClose} className={styles['close-btn']}>&times;</button>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <h3>1. 파트별 공수 요약 (M/M 산출)</h3>
            <p className={styles.info}>* 1 M/M = 160시간 (8시간 × 20일) 기준, 반복 오류 20% 감액 적용</p>

            <table className={styles.table}>
              <colgroup>
                <col span={1} style={{ width: '5%' }} />
                <col span={1} style={{ width: '10%' }} />
                <col span={1} style={{ width: '15%' }} />
                <col span={1} style={{ width: '' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>직무</th>
                  <th>위반 건수</th>
                  <th>예상 공수 (Hours)</th>
                  <th>주요 작업 내용</th>
                </tr>
              </thead>
              <tbody>
                {report.items.map((item) => (
                  <tr key={item.role}>
                    <td className={styles['role-cell']}>{roleLabels[item.role]}</td>
                    <td className={styles.center}>{item.count}건</td>
                    <td className={styles.center}><strong>{item.manHours} H</strong></td>
                    <td className={styles['desc-cell']}>{item.description}</td>
                  </tr>
                ))}
                <tr className={styles['total-row']}>
                  <td>합계</td>
                  <td className={styles.center}>{report.totalViolations}건</td>
                  <td className={styles.center}>
                    {report.totalManHours} H
                    <div className={styles['mm-badge']}>
                      ≈ {report.totalManMonths} M/M
                    </div>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

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
          <button onClick={onClose} className={styles['confirm-btn']}>확인</button>
        </div>
      </div>
    </div>
  );
}
