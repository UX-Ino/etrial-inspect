'use client';

import { useState } from 'react';
import { copyPromptAndOpenAI, AITool } from '@/lib/ai-prompt-generator';
import { SEOAuditResult } from '@/types/seo';

export function useAIPrompt() {
  const [promptCopied, setPromptCopied] = useState(false);

  const handleAIPromptCopy = async (tool: AITool, result: SEOAuditResult) => {
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

  return { promptCopied, handleAIPromptCopy };
}
