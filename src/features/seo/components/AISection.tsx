import { SEOAuditResult } from '@/types/seo';
import styles from '../SEOResultDisplay.module.css';
import { Card } from '@/components/ui/Card';

interface AISectionProps {
  result: SEOAuditResult;
}

export const AISection = ({ result }: AISectionProps) => {
  return (
    <section className={styles['ai-section']}>
      <h2 className={styles['section-title']}>
        🤖 AI 친화도 분석 (GEO)
      </h2>

      <Card className={styles.card} title="📝 llms.txt 파일">
        <div className={styles['flex-row']}>
          <div>파일 존재: {result.llmsTxt.exists ? '✅' : '❌'}</div>
          {result.llmsTxt.exists && (
            <>
              <div>H1: {result.llmsTxt.structure.hasH1 ? '✅' : '❌'}</div>
              <div>H2: {result.llmsTxt.structure.hasH2 ? '✅' : '❌'}</div>
              <div>단어 수: {result.llmsTxt.structure.wordCount}개</div>
              <div>요약 존재: {result.llmsTxt.contentQuality.hasSummary ? '✅' : '❌'}</div>
              <div>키워드: {result.llmsTxt.contentQuality.hasKeywords ? '✅' : '⚠️'}</div>
            </>
          )}
          <div><strong>점수: {result.llmsTxt.score}/100</strong></div>
        </div>

        {!result.llmsTxt.exists && result.llmsTxt.suggestedContent && (
          <div className={styles['suggestion-box']}>
            <p className={styles['suggestion-title']}>
              💡 추천: llms.txt 파일을 생성하세요
            </p>
            <pre className={styles['suggestion-pre']}>
              {result.llmsTxt.suggestedContent}
            </pre>
          </div>
        )}
        {result.llmsTxt.generatorSource === 'llms-txt-generator' && (
          <div className={styles['validator-badge']}>
            <span>
              Validated by llms-txt-generator
            </span>
          </div>
        )}
      </Card>

      <div className={styles['score-display']}>
        🎯 AI 친화도 점수: {result.overallScore.geoAI}/100
      </div>
    </section>
  );
};
