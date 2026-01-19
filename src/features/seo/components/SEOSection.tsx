import { SEOAuditResult } from '@/types/seo';
import styles from '../SEOResultDisplay.module.css';
import { Card } from '@/components/ui/Card';

interface SEOSectionProps {
  result: SEOAuditResult;
}

export const SEOSection = ({ result }: SEOSectionProps) => {
  return (
    <section className={styles['seo-section']}>
      <h2 className={styles['section-title']}>
        📊 SEO 최적화 분석
      </h2>

      {/* Sitemap */}
      <Card className={styles.card} title="🗺️ Sitemap.xml">
        <div className={styles['flex-row']}>
          <div>파일 존재: {result.sitemap.exists ? '✅' : '❌'}</div>
          <div>XML 유효성: {result.sitemap.xmlValid ? '✅' : '❌'}</div>
          <div>robots.txt 연동: {result.sitemap.robotsTxtReference ? '✅' : '⚠️'}</div>
          <div>URL 수: {result.sitemap.totalUrls}개</div>
          <div><strong>점수: {result.sitemap.score}/100</strong></div>
        </div>
      </Card>

      {/* 메타데이터 */}
      <Card className={styles.card} title="🏷️ 메타데이터">
        <div className={styles['grid-row']}>
          <div>Title: {result.metadata.title.optimal ? '✅ 최적' : result.metadata.title.exists ? '⚠️ 조정 필요' : '❌'} ({result.metadata.title.length}자)</div>
          <div>Description: {result.metadata.description.optimal ? '✅ 최적' : result.metadata.description.exists ? '⚠️ 조정 필요' : '❌'} ({result.metadata.description.length}자)</div>
          <div>Canonical: {result.metadata.canonical.exists ? '✅' : '❌'}</div>
          <div>Viewport: {result.metadata.viewport.mobileFriendly ? '✅ 모바일 친화적' : '⚠️'}</div>
          <div><strong>점수: {result.metadata.score}/100</strong></div>
        </div>

        {/* 전문 도구 분석 배지 및 팩트 */}
        <div className={styles['engine-badge']}>
          <span>
            Engine: {result.metadata.analysisSource === 'seo-analyzer' ? 'Professional (seo-analyzer)' : 'Custom Hybrid'}
          </span>
        </div>

        {result.metadata.professionalFindings && result.metadata.professionalFindings.length > 0 && (
          <div className={styles['professional-findings']}>
            <p className={styles['findings-title']}>🔍 전문 분석 팩트</p>
            <ul className={styles['findings-list']}>
              {result.metadata.professionalFindings.map((finding: string, idx: number) => (
                <li key={idx}>{finding}</li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      <div className={styles['score-display']}>
        🎯 SEO 종합 점수: {result.overallScore.seo}/100
      </div>
    </section>
  );
};
