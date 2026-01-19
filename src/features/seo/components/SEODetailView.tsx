'use client';

import { SEOAuditResult } from '@/types/seo';
import styles from './SEODetailView.module.css';

interface SEODetailViewProps {
  result: SEOAuditResult;
}

/**
 * SEO 최적화 상세 분석 뷰 컴포넌트
 */
export default function SEODetailView({ result }: SEODetailViewProps) {
  return (
    <div className={styles.container}>
      {/* SEO 섹션 */}
      <div className={styles.section}>
        <h2 className={styles.title}>
          📊 SEO 최적화 분석
        </h2>

        {/* Sitemap */}
        <div className={styles.card}>
          <h3 className={styles['card-title']}>
            🗺️ Sitemap.xml
          </h3>
          <div className={styles['flex-row']}>
            <div>파일 존재: {result.sitemap.exists ? '✅' : '❌'}</div>
            <div>XML 유효성: {result.sitemap.xmlValid ? '✅' : '❌'}</div>
            <div>robots.txt 연동: {result.sitemap.robotsTxtReference ? '✅' : '⚠️'}</div>
            <div>URL 수: {result.sitemap.totalUrls}개</div>
            <div className={styles['score-text']}>점수: {result.sitemap.score}/100</div>
          </div>
        </div>

        {/* 메타데이터 */}
        <div className={styles.card}>
          <h3 className={styles['card-title']}>
            🏷️ 메타데이터
          </h3>
          <div className={styles['grid-row']}>
            <div className={styles['grid-item']}>
              <span>Title</span>
              <span>{result.metadata.title.optimal ? '✅ 최적' : result.metadata.title.exists ? '⚠️ 조정 필요' : '❌'} ({result.metadata.title.length}자)</span>
            </div>
            <div className={styles['grid-item']}>
              <span>Description</span>
              <span>{result.metadata.description.optimal ? '✅ 최적' : result.metadata.description.exists ? '⚠️ 조정 필요' : '❌'} ({result.metadata.description.length}자)</span>
            </div>
            <div className={styles['grid-item']}>
              <span>Canonical</span>
              <span>{result.metadata.canonical.exists ? '✅' : '❌'}</span>
            </div>
            <div className={styles['grid-item']}>
              <span>Viewport</span>
              <span>{result.metadata.viewport.mobileFriendly ? '✅ 모바일 친화적' : '⚠️'}</span>
            </div>
          </div>

          <div className={styles['card-score']}>
            점수: {result.metadata.score}/100
          </div>

          {/* 전문 도구 분석 배지 및 팩트 */}
          <div className={styles['engine-badge']}>
            <span>
              점검 엔진: {result.metadata.analysisSource === 'seo-analyzer' ? '전문가용 (seo-analyzer)' : '커스텀 하이브리드'}
            </span>
          </div>

          {result.metadata.professionalFindings && result.metadata.professionalFindings.length > 0 && (
            <div className={styles['professional-findings']}>
              <p className={styles['findings-title']}>🔍 엔진 정밀 분석 결과</p>
              <ul className={styles['findings-list']}>
                {result.metadata.professionalFindings.map((finding: string, idx: number) => (
                  <li key={idx}>{finding}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles['final-score']}>
          🎯 SEO 종합 점수: {result.overallScore.seo}/100
        </div>
      </div>
    </div>
  );
}
