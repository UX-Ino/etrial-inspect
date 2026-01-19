'use client';

import { SEOAuditResult } from '@/types/seo';
import styles from './SEOResultDisplay.module.css';
import { useAIPrompt } from './hooks/useAIPrompt';
import { SEOSection } from './components/SEOSection';
import { AISection } from './components/AISection';
import { AIToolSection } from './components/AIToolSection';

interface SEOResultDisplayProps {
  result: SEOAuditResult;
}

/**
 * SEO/AI 진단 결과 표시 컴포넌트
 * Refactored to feature-based architecture
 */
export default function SEOResultDisplay({ result }: SEOResultDisplayProps) {
  const { promptCopied, handleAIPromptCopy } = useAIPrompt();

  return (
    <div className={styles.container}>
      <SEOSection result={result} />

      <AISection result={result} />

      <AIToolSection
        onCopyPrompt={(tool) => handleAIPromptCopy(tool, result)}
        promptCopied={promptCopied}
      />

      {/* 최종 점수 */}
      <section className={styles['final-score-section']}>
        <h2 className={styles['final-score-title']}>
          🏆 최종 통합 점수
        </h2>
        <div className={styles['final-score-value']}>
          {result.overallScore.total}/100
        </div>
        <div className={styles['final-score-desc']}>
          웹접근성 + SEO + AI 친화도 종합
        </div>
      </section>
    </div>
  );
}
