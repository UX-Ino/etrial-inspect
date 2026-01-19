'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '@/app/page.module.css';
import CostReportModal from '@/components/CostReportModal';
import { AuditResult, Violation } from '@/types';
import { getPlatformAuditService } from '@/services/platform/factory';
import SEODetailView from '@/features/seo/components/SEODetailView';
import AIDetailView from '@/features/seo/components/AIDetailView';
import { ViolationDetailModal } from '@/components/ViolationDetailModal';

interface ReportViewerProps {
  initialResult?: AuditResult | null;
}

export const ReportViewer = ({ initialResult }: ReportViewerProps) => {
  const [result, setResult] = useState<AuditResult | null>(initialResult || null);
  const [showCostModal, setShowCostModal] = useState(false);
  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(null);
  const [filter, setFilter] = useState({
    principle: '',
    impact: '',
    kwcagId: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeView, setActiveView] = useState<'accessibility' | 'seo' | 'ai'>('accessibility');

  useEffect(() => {
    // If no initial result provided (e.g. standard /report page), try loading from localStorage
    if (!initialResult) {
      const savedResult = localStorage.getItem('auditResult');
      if (savedResult) {
        setResult(JSON.parse(savedResult));
      }
    }
  }, [initialResult]);

  if (!result) {
    return (
      <main className="container">
        <section className={`card ${styles['empty-card']}`}>
          <h2>📋 진단 결과가 없습니다</h2>
          <p className={styles['empty-text']}>
            먼저 메인 페이지에서 접근성 진단을 수행해주세요.
          </p>
          <Link href="/" className={`btn btn-primary ${styles['back-link']}`}>
            ← 메인으로 돌아가기
          </Link>
        </section>
      </main>
    );
  }

  // 필터 적용
  let filteredViolations = result.violations;
  if (filter.principle) {
    filteredViolations = filteredViolations.filter(v => v.principle === filter.principle);
  }
  if (filter.impact) {
    filteredViolations = filteredViolations.filter(v => v.impact === filter.impact);
  }
  if (filter.kwcagId) {
    filteredViolations = filteredViolations.filter(v => v.kwcagId === filter.kwcagId);
  }

  // 페이지네이션
  const totalPages = Math.ceil(filteredViolations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedViolations = filteredViolations.slice(startIndex, startIndex + itemsPerPage);

  // 고유한 KWCAG 항목 추출
  const uniqueKwcagItems = [...new Set(result.violations.map(v => v.kwcagId))].sort();

  const impactLabels: Record<string, string> = {
    critical: '심각',
    serious: '높음',
    moderate: '보통',
    minor: '낮음',
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    if (!result) return;
    const jsonString = JSON.stringify(result, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kwcag-audit-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  };

  const handleExportExcel = async () => {
    try {
      const service = getPlatformAuditService();
      await service.exportExcel(result);
    } catch (error) {
      alert(`엑셀 다운로드 실패: ${error}`);
    }
  };

  return (
    <div className="container">
      <header className={`${styles['report-header']} ${styles['report-header-column']}`}>
        {/* Row 1: Title & Main Link */}
        <div className={styles['header-row']}>
          <div>
            <h1 className={styles['report-title']}>📊 접근성 진단 리포트</h1>
            <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>
              진단 시간: {new Date(result.endTime).toLocaleString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })}
            </p>
          </div>
          <a href="/" className="btn btn-secondary">
            ← 메인으로
          </a>
        </div>


        {/* Row 2: Action Buttons */}
        <div className={styles['action-row']}>
          <button className={`btn btn-warning ${styles['btn-warning-custom']}`} onClick={() => setShowCostModal(true)}>
            💰 공수 산출
          </button>
          <button className="btn btn-success" onClick={handleExportExcel}>
            📥 엑셀 다운로드
          </button>
          <button className={`btn btn-info ${styles['btn-info-custom']}`} onClick={handleExportJSON}>
            📄 JSON 다운로드
          </button>
          <button className="btn btn-secondary" onClick={handlePrint}>
            🖨️ 인쇄
          </button>
          <a href="/report/checklist" className="btn btn-primary">
            📋 33개 체크리스트
          </a>
        </div>
      </header>

      {showCostModal && result && (
        <CostReportModal
          violations={result.violations}
          onClose={() => setShowCostModal(false)}
        />
      )}

      {selectedViolation && (
        <ViolationDetailModal
          violation={selectedViolation}
          boundingBox={selectedViolation.boundingBox}
          screenshotPath={selectedViolation.screenshotPath}
          onClose={() => setSelectedViolation(null)}
        />
      )}



      {/* 상세 분석 탭 네비게이션 */}
      {result.seoResult && (
        <div style={{ marginBottom: '2rem' }}>
          <div className={styles['tab-nav']}>
            <button
              onClick={() => setActiveView('accessibility')}
              className={`${styles['tab-btn']} ${activeView === 'accessibility' ? styles['active-accessibility'] : ''}`}
            >
              ♿ 접근성 분석
            </button>
            <button
              onClick={() => setActiveView('seo')}
              className={`${styles['tab-btn']} ${activeView === 'seo' ? styles['active-seo'] : ''}`}
            >
              🗺️ SEO 상세 분석
            </button>
            <button
              onClick={() => setActiveView('ai')}
              className={`${styles['tab-btn']} ${activeView === 'ai' ? styles['active-ai'] : ''}`}
            >
              🤖 AI 친화도 상세
            </button>
          </div>

          {/* 조건부 렌더링: SEO/AI 상세 뷰 */}
          {activeView === 'seo' && <SEODetailView result={result.seoResult} />}
          {activeView === 'ai' && <AIDetailView result={result.seoResult} />}
        </div>
      )}

      {/* 접근성 콘텐츠 (접근성 탭 활성 시에만 표시) */}
      {activeView === 'accessibility' && (
        <>

          {/* 요약 통계 */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{result.totalPages}</div>
              <div className="stat-label">총 페이지 수</div>
            </div>
            <div className="stat-card" style={{ borderLeft: '4px solid #ef4444' }}>
              <div className="stat-value" style={{ color: '#ef4444' }}>{result.totalViolations}</div>
              <div className="stat-label">총 위반 건수</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{result.summary.byImpact.critical || 0}</div>
              <div className="stat-label">치명적 (Critical)</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{result.summary.byImpact.serious || 0}</div>
              <div className="stat-label">중요 (Serious)</div>
            </div>
          </div>

          {/* 원칙별 통계 */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 className={styles['card-title']}>원칙별 위반 현황</h2>
            <div className="stats-grid">
              {Object.entries(result.summary.byPrinciple).map(([principle, count]) => (
                <div className="stat-card" key={principle}>
                  <div className="stat-value">{count}</div>
                  <div className="stat-label">{principle}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 필터 */}
          <div className="card">
            <h2 className={styles['card-title']}>위반 사항 목록</h2>

            <div className={styles['filter-bar']}>
              <select
                value={filter.principle}
                onChange={(e) => { setFilter({ ...filter, principle: e.target.value }); setCurrentPage(1); }}
              >
                <option value="">모든 원칙</option>
                <option value="인식의 용이성">인식의 용이성</option>
                <option value="운용의 용이성">운용의 용이성</option>
                <option value="이해의 용이성">이해의 용이성</option>
                <option value="견고성">견고성</option>
              </select>

              <select
                value={filter.impact}
                onChange={(e) => { setFilter({ ...filter, impact: e.target.value }); setCurrentPage(1); }}
              >
                <option value="">모든 영향도</option>
                <option value="critical">치명적 (Critical)</option>
                <option value="serious">중요 (Serious)</option>
                <option value="moderate">보통 (Moderate)</option>
                <option value="minor">낮음 (Minor)</option>
              </select>

              <select
                value={filter.kwcagId}
                onChange={(e) => { setFilter({ ...filter, kwcagId: e.target.value }); setCurrentPage(1); }}
              >
                <option value="">모든 KWCAG 항목</option>
                {uniqueKwcagItems.map(id => (
                  <option key={id} value={id}>{id}</option>
                ))}
              </select>

              <select
                value={itemsPerPage}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setItemsPerPage(val);
                  setCurrentPage(1);
                }}
              >
                <option value={10}>10개씩 보기</option>
                <option value={50}>50개씩 보기</option>
                <option value={100}>100개씩 보기</option>
                <option value={filteredViolations.length > 0 ? filteredViolations.length : 10000}>전체 보기</option>
              </select>

              <span style={{ color: '#94a3b8', alignSelf: 'center' }}>
                {filteredViolations.length}건 표시 중
              </span>
            </div>

            {/* 위반 목록 */}
            {paginatedViolations.map((violation, index) => (
              <div className={styles['violation-card']} key={`${violation.pageUrl}-${violation.violationNumber}-${index}`}>
                <div className={styles['violation-header']}>
                  <div>
                    <h3 className={styles['violation-title']}>
                      {violation.kwcagId} {violation.kwcagName}
                    </h3>
                    <p className={styles['violation-url']}>
                      <button
                        onClick={() => setSelectedViolation(violation)}
                        className={styles['violation-link']}
                      >
                        {violation.pageUrl}
                      </button>
                      {violation.isCommon && (
                        <span className={styles['badge-common']}>
                          🧩 공통 요소 (Common UI)
                        </span>
                      )}
                      {violation.occurrenceCount && violation.occurrenceCount > 1 && (
                        <span className={styles['badge-count']}>
                          ⚡ {violation.occurrenceCount}개 페이지에서 발견됨
                        </span>
                      )}
                    </p>
                  </div>
                  <span className={`badge badge-${violation.impact}`}>
                    {impactLabels[violation.impact] || violation.impact}
                  </span>
                </div>

                <p className={styles['violation-description']}>{violation.description}</p>

                <div className={styles['code-block']}>
                  {violation.affectedCode}
                </div>

                <div className={styles['help-text']}>
                  💡 <strong>해결방안:</strong> {violation.help}
                  {violation.helpUrl && (
                    <a href={violation.helpUrl} target="_blank" rel="noopener noreferrer" className={styles['help-link']}>
                      자세히 보기 →
                    </a>
                  )}
                </div>
              </div>
            ))}

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  ← 이전
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      className={currentPage === pageNum ? styles.on : ''}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  다음 →
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
