'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../../page.module.css';

// KWCAG 2.2 33개 검사항목 정의
const KWCAG_ITEMS = [
  // 1. 인식의 용이성 (9개)
  { id: '1.1.1', name: '적절한 대체 텍스트 제공', principle: '인식의 용이성', automationLevel: 'high' },
  { id: '1.2.1', name: '자막 제공', principle: '인식의 용이성', automationLevel: 'medium' },
  { id: '1.2.2', name: '수어 제공', principle: '인식의 용이성', automationLevel: 'manual' },
  { id: '1.3.1', name: '콘텐츠의 선형화', principle: '인식의 용이성', automationLevel: 'medium' },
  { id: '1.3.2', name: '표의 구성', principle: '인식의 용이성', automationLevel: 'high' },
  { id: '1.4.1', name: '명도 대비', principle: '인식의 용이성', automationLevel: 'high' },
  { id: '1.4.2', name: '색에 무관한 콘텐츠 인식', principle: '인식의 용이성', automationLevel: 'manual' },
  { id: '1.4.3', name: '배경음 사용 금지', principle: '인식의 용이성', automationLevel: 'medium' },
  { id: '1.4.4', name: '콘텐츠 간의 구분', principle: '인식의 용이성', automationLevel: 'manual' },
  // 2. 운용의 용이성 (15개)
  { id: '2.1.1', name: '키보드 사용 보장', principle: '운용의 용이성', automationLevel: 'medium' },
  { id: '2.1.2', name: '초점 이동과 표시', principle: '운용의 용이성', automationLevel: 'medium' },
  { id: '2.1.3', name: '조작 가능', principle: '운용의 용이성', automationLevel: 'high' },
  { id: '2.1.4', name: '문자 단축키', principle: '운용의 용이성', automationLevel: 'manual' },
  { id: '2.2.1', name: '응답 시간 조절', principle: '운용의 용이성', automationLevel: 'medium' },
  { id: '2.2.2', name: '정지 기능 제공', principle: '운용의 용이성', automationLevel: 'high' },
  { id: '2.3.1', name: '깜빡임과 번쩍임 사용 제한', principle: '운용의 용이성', automationLevel: 'manual' },
  { id: '2.4.1', name: '반복 영역 건너뛰기', principle: '운용의 용이성', automationLevel: 'high' },
  { id: '2.4.2', name: '페이지 제목 제공', principle: '운용의 용이성', automationLevel: 'high' },
  { id: '2.4.3', name: '적절한 링크 텍스트', principle: '운용의 용이성', automationLevel: 'high' },
  { id: '2.4.4', name: '고정된 참조 위치 정보', principle: '운용의 용이성', automationLevel: 'manual' },
  { id: '2.5.1', name: '단일 포인터 입력 지원', principle: '운용의 용이성', automationLevel: 'manual' },
  { id: '2.5.2', name: '포인터 입력 취소', principle: '운용의 용이성', automationLevel: 'manual' },
  { id: '2.5.3', name: '레이블과 네임', principle: '운용의 용이성', automationLevel: 'high' },
  { id: '2.5.4', name: '동작기반 작동', principle: '운용의 용이성', automationLevel: 'manual' },
  // 3. 이해의 용이성 (7개)
  { id: '3.1.1', name: '기본 언어 표시', principle: '이해의 용이성', automationLevel: 'high' },
  { id: '3.2.1', name: '사용자 요구에 따른 실행', principle: '이해의 용이성', automationLevel: 'medium' },
  { id: '3.3.1', name: '콘텐츠의 선형 구조', principle: '이해의 용이성', automationLevel: 'medium' },
  { id: '3.4.1', name: '오류 정정', principle: '이해의 용이성', automationLevel: 'medium' },
  { id: '3.4.2', name: '레이블 제공', principle: '이해의 용이성', automationLevel: 'high' },
  { id: '3.4.3', name: '접근 가능한 인증', principle: '이해의 용이성', automationLevel: 'manual' },
  { id: '3.4.4', name: '반복 입력 정보', principle: '이해의 용이성', automationLevel: 'manual' },
  // 4. 견고성 (2개)
  { id: '4.1.1', name: '마크업 오류 방지', principle: '견고성', automationLevel: 'high' },
  { id: '4.1.2', name: '웹 애플리케이션 접근성 준수', principle: '견고성', automationLevel: 'high' },
];

interface ChecklistResult {
  id: string;
  status: 'pass' | 'fail' | 'manual' | 'na';
  violationCount: number;
  pages: string[];
}

interface AuditResult {
  violations: Array<{
    kwcagId: string;
    pageUrl: string;
  }>;
}

export default function ChecklistPage() {
  const [results, setResults] = useState<ChecklistResult[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const savedResult = localStorage.getItem('auditResult');
    if (savedResult) {
      const auditResult: AuditResult = JSON.parse(savedResult);

      // 33개 항목에 대한 결과 생성
      const checklistResults: ChecklistResult[] = KWCAG_ITEMS.map(item => {
        const violations = auditResult.violations.filter(v => v.kwcagId === item.id);
        const pages = [...new Set(violations.map(v => v.pageUrl))];

        let status: 'pass' | 'fail' | 'manual' | 'na';
        if (item.automationLevel === 'manual') {
          status = 'manual';
        } else if (violations.length > 0) {
          status = 'fail';
        } else {
          status = 'pass';
        }

        return {
          id: item.id,
          status,
          violationCount: violations.length,
          pages,
        };
      });

      setResults(checklistResults);
    }
  }, []);

  // 필터링
  const filteredItems = KWCAG_ITEMS.filter(item => {
    if (filter === 'all') return true;
    const result = results.find(r => r.id === item.id);
    return result?.status === filter;
  });

  // 통계 계산
  const stats = {
    pass: results.filter(r => r.status === 'pass').length,
    fail: results.filter(r => r.status === 'fail').length,
    manual: results.filter(r => r.status === 'manual').length,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pass':
        return <span className={styles['status-pass']}>✓ 통과</span>;
      case 'fail':
        return <span className={styles['status-fail']}>✗ 위반</span>;
      case 'manual':
        return <span className={styles['status-manual']}>⚠ 수동확인</span>;
      default:
        return <span className={styles['status-na']}>- N/A</span>;
    }
  };

  const getAutomationBadge = (level: string) => {
    switch (level) {
      case 'high':
        return <span className={styles['auto-high']}>자동</span>;
      case 'medium':
        return <span className={styles['auto-medium']}>반자동</span>;
      case 'manual':
        return <span className={styles['auto-manual']}>수동</span>;
      default:
        return null;
    }
  };

  // 원칙별 그룹화
  const principles = ['인식의 용이성', '운용의 용이성', '이해의 용이성', '견고성'];

  if (results.length === 0) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>📋 진단 결과가 없습니다</h2>
          <p style={{ color: '#94a3b8', marginTop: '1rem' }}>
            먼저 메인 페이지에서 접근성 진단을 수행해주세요.
          </p>
          <a href="/" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            ← 메인으로 돌아가기
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className={styles['report-header']}>
        <div>
          <h1 className={styles['report-title']}>📋 KWCAG 2.2 체크리스트</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>
            33개 검사항목 전체 점검 결과
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/report" className="btn btn-secondary">
            ← 리포트로
          </Link>
          <Link href="/" className="btn btn-secondary">
            🏠 메인으로
          </Link>
        </div>
      </header>

      {/* 요약 통계 */}
      <div className="stats-grid">
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => setFilter('all')}>
          <div className="stat-value">33</div>
          <div className="stat-label">전체 검사항목</div>
        </div>
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => setFilter('pass')}>
          <div className="stat-value" style={{ background: '#22c55e', backgroundClip: 'text' }}>{stats.pass}</div>
          <div className="stat-label">통과</div>
        </div>
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => setFilter('fail')}>
          <div className="stat-value" style={{ background: '#ef4444', backgroundClip: 'text' }}>{stats.fail}</div>
          <div className="stat-label">위반</div>
        </div>
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => setFilter('manual')}>
          <div className="stat-value" style={{ background: '#f59e0b', backgroundClip: 'text' }}>{stats.manual}</div>
          <div className="stat-label">수동확인 필요</div>
        </div>
      </div>

      {/* 필터 */}
      <div className="card">
        <div className={styles['filter-bar']}>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">전체 (33개)</option>
            <option value="pass">통과 ({stats.pass}개)</option>
            <option value="fail">위반 ({stats.fail}개)</option>
            <option value="manual">수동확인 필요 ({stats.manual}개)</option>
          </select>
        </div>

        {/* 원칙별 체크리스트 */}
        {principles.map(principle => {
          const principleItems = filteredItems.filter(item => item.principle === principle);
          if (principleItems.length === 0) return null;

          return (
            <div key={principle} className={styles['checklist-section']}>
              <h3 className={styles['principle-title']}>{principle}</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: '100px' }}>항목</th>
                      <th>검사항목명</th>
                      <th style={{ width: '90px' }}>검사방식</th>
                      <th style={{ width: '120px' }}>결과</th>
                      <th style={{ width: '80px' }}>위반 수</th>
                    </tr>
                  </thead>
                  <tbody>
                    {principleItems.map(item => {
                      const result = results.find(r => r.id === item.id);
                      return (
                        <tr key={item.id} className={result?.status === 'fail' ? styles['fail-row'] : ''}>
                          <td><strong>{item.id}</strong></td>
                          <td>{item.name}</td>
                          <td>{getAutomationBadge(item.automationLevel)}</td>
                          <td>{getStatusBadge(result?.status || 'na')}</td>
                          <td style={{ textAlign: 'center' }}>
                            {result?.violationCount || 0}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
