'use client';

import { useState } from 'react';
import { SEOAuditResult } from '@/types/seo';
import { copyPromptAndOpenAI, AITool, AI_PROMPT_TEMPLATES } from '@/lib/ai-prompt-generator';
import styles from './AIDetailView.module.css';

interface AIDetailViewProps {
  result: SEOAuditResult;
}

/**
 * AI 친화도(GEO) 상세 분석 뷰 컴포넌트
 */
export default function AIDetailView({ result }: AIDetailViewProps) {
  const [promptCopied, setPromptCopied] = useState(false);

  const handleAIPromptCopy = async (tool: AITool) => {
    const promptData = {
      siteName: new URL(result.url).hostname,
      url: result.url,
      llmsTxtContent: result.llmsTxt.exists
        ? `(파일 존재, 점수: ${result.llmsTxt.score}/100)`
        : result.llmsTxt.suggestedContent || '파일 없음',
      ruleBasedScore: result.llmsTxt.score,
      suggestedImprovements: [
        !result.sitemap.exists && 'Sitemap.xml 파일 생성 필요',
        !result.llmsTxt.exists && 'llms.txt 파일 생성 필요',
        result.metadata.title.length === 0 && 'Title 태그 추가 필요',
        result.metadata.description.length === 0 && 'Meta Description 추가 필요',
      ].filter(Boolean) as string[],
      professionalFindings: result.metadata.professionalFindings || [],
    };

    const success = await copyPromptAndOpenAI(tool, promptData);
    if (success) {
      setPromptCopied(true);
      setTimeout(() => setPromptCopied(false), 3000);
    }
  };

  return (
    <div className={styles.container}>
      {/* AI 친화도 섹션 */}
      <section className={styles['ai-section']}>
        <h2 className={styles['section-title']}>
          🤖 AI 친화도 분석 (GEO)
        </h2>

        <article className={styles.card}>
          <h3 className={styles['card-title']}>
            📝 llms.txt 파일
          </h3>
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
            <div className={styles['score-text']}>점수: {result.llmsTxt.score}/100</div>
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
                llms-txt-generator 기반 검증됨
              </span>
            </div>
          )}
        </article>

        <div className={styles['final-score']}>
          🎯 AI 친화도 점수: {result.overallScore.geoAI}/100
        </div>
      </section>

      {/* AI에게 추가 검증 요청 버튼 */}
      <section className={styles['ai-tool-section']}>
        <h3 className={styles['tool-title']}>
          🧠 AI 전문가에게 추가 검증 요청
        </h3>
        <p className={styles['tool-desc']}>
          규칙 기반 평가를 넘어, ChatGPT/Gemini 등 AI 전문가의 심층 분석을 받아보세요.<br />
          아래 버튼을 클릭하면 전문가 프롬프트가 복사되고 AI 도구가 열립니다.
        </p>

        <div className={styles['button-group']}>
          {Object.entries(AI_PROMPT_TEMPLATES).map(([key, config]) => (
            <button
              key={key}
              onClick={() => handleAIPromptCopy(key as AITool)}
              className={styles['ai-button']}
            >
              {config.icon} {config.name}에게 물어보기
            </button>
          ))}
        </div>

        {promptCopied && (
          <div className={styles['copy-success']}>
            ✅ 프롬프트가 복사되었습니다! AI 도구에 붙여넣으세요 (Ctrl/Cmd + V)
          </div>
        )}
      </section>
    </div>
  );
}
