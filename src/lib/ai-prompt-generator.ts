import { AIPromptData } from '@/types/seo';

/**
 * AI 프롬프트 생성 유틸리티
 * 사용자가 ChatGPT/Gemini 등에 복사-붙여넣기할 수 있는 전문가 프롬프트 생성
 */

/**
 * AI 평가용 프롬프트 생성
 * @param data 프롬프트 생성에 필요한 데이터
 * @returns 완성된 프롬프트 문자열
 */
export function generateAIEvaluationPrompt(data: AIPromptData): string {
  const { siteName, url, llmsTxtContent, ruleBasedScore, suggestedImprovements, professionalFindings } = data;

  const sections = [
    `# Role\n당신은 10년 경력의 "AI 검색 엔진 최적화(GEO, Generative Engine Optimization)" 전문가입니다.`,
    `# Task\n다음 사이트의 llms.txt 파일을 평가해주세요.\n\n## 기본 정보\n- **사이트명**: ${siteName}\n- **URL**: ${url}\n- **규칙 기반 점수**: ${ruleBasedScore}/100`,
    `## llms.txt 내용\n\`\`\`markdown\n${llmsTxtContent}\n\`\`\``,
    `# Evaluation Criteria\n다음 기준으로 **0-100점** 사이로 평가하고, 개선 제안을 해주세요:\n\n1. **AI 이해도**: LLM이 5초 안에 사이트 핵심을 파악할 수 있는가?\n2. **토큰 효율성**: 불필요한 정보 없이 압축적으로 작성되었는가?\n3. **구조 명확성**: 헤더 계층이 논리적인가?\n4. **인용 가능성**: AI가 답변에 이 사이트를 인용하고 싶게 만드는가?`,
    `# Output Format\n\`\`\`\n점수: XX/100\n\n강점:\n- (강점 1)\n- (강점 2)\n\n개선점:\n- (개선점 1)\n- (개선점 2)\n\n추천 수정안:\n(구체적인 llms.txt 개선 코드 제안)\n\`\`\``,
    `# Additional Context\n자동 분석 시스템에서 발견한 개선 가능 영역:\n${suggestedImprovements.map((item, idx) => `${idx + 1}. ${item}`).join('\n')}`
  ];

  if (professionalFindings && professionalFindings.length > 0) {
    sections.push(`## 전문 분석 팩트 (SEO/AI Packages)\n${professionalFindings.map(item => `- ${item}`).join('\n')}`);
  }

  sections.push('위 사항들을 참고하여 심층 분석을 부탁드립니다.');

  return sections.join('\n\n');
}

/**
 * AI 도구별 프롬프트 템플릿
 */
export const AI_PROMPT_TEMPLATES = {
  chatgpt: {
    name: 'ChatGPT',
    url: 'https://chat.openai.com',
    icon: '🤖',
    promptPrefix: '',
  },
  gemini: {
    name: 'Google Gemini',
    url: 'https://gemini.google.com',
    icon: '✨',
    promptPrefix: '',
  },
  claude: {
    name: 'Claude',
    url: 'https://claude.ai',
    icon: '🧠',
    promptPrefix: '',
  },
} as const;

export type AITool = keyof typeof AI_PROMPT_TEMPLATES;

/**
 * 프롬프트를 클립보드에 복사하고 AI 도구 열기
 * @param tool AI 도구 종류
 * @param promptData 프롬프트 데이터
 * @returns 성공 여부
 */
export async function copyPromptAndOpenAI(
  tool: AITool,
  promptData: AIPromptData
): Promise<boolean> {
  try {
    const config = AI_PROMPT_TEMPLATES[tool];
    const prompt = config.promptPrefix + generateAIEvaluationPrompt(promptData);

    // 클립보드에 복사 (Electron 환경 우선 사용 및 폴백 처리)
    let copied = false;

    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(prompt);
        copied = true;
      } else {
        console.warn('Clipboard API not available');
      }
    } catch (e) {
      console.error('Failed to copy to clipboard:', e);
    }

    // 최종 폴백: 비가시적 textarea를 이용한 execCommand('copy')
    if (!copied) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = prompt;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (!successful) throw new Error('execCommand copy failed');
        copied = true;
      } catch (e) {
        console.error('All clipboard methods failed:', e);
        return false;
      }
    }

    // AI 도구 새 탭으로 열기
    window.open(config.url, '_blank');

    return true;
  } catch (error) {
    console.error('프롬프트 복사 실패:', error);
    return false;
  }
}

/**
 * llms.txt가 없을 때 생성 가이드 프롬프트
 * @param siteName 사이트 이름
 * @param url 사이트 URL
 * @returns 생성 가이드 프롬프트
 */
export function generateLlmsTxtCreationPrompt(siteName: string, url: string): string {
  return `# Task
"${siteName}" (${url}) 웹사이트를 위한 최적의 llms.txt 파일을 작성해주세요.

# Requirements
1. **구조**: H1 1개, H2 2~5개, H3 적절히 사용
2. **분량**: 100~500 단어 (너무 짧거나 길지 않게)
3. **내용**:
   - 첫 단락에 사이트 핵심 요약 (50~300자)
   - 주요 기능/서비스 설명
   - 기술 스택 (선택사항)
   - 연락처 정보
4. **최적화**:
   - AI가 5초 안에 이해할 수 있도록 명확하게
   - 불필요한 마케팅 문구 배제
   - 사실 정보 중심

# Output Format
\`\`\`markdown
(완성된 llms.txt 내용)
\`\`\`

# Note
이 파일은 ChatGPT, Gemini 등 AI 모델이 사이트 정보를 효율적으로 학습하고 인용할 수 있도록 돕기 위한 것입니다.
`;
}
