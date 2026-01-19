import { AI_PROMPT_TEMPLATES, AITool } from '@/lib/ai-prompt-generator';
import styles from '../SEOResultDisplay.module.css';
import { Button } from '@/components/ui/Button';

interface AIToolSectionProps {
  onCopyPrompt: (tool: AITool) => void;
  promptCopied: boolean;
}

export const AIToolSection = ({ onCopyPrompt, promptCopied }: AIToolSectionProps) => {
  return (
    <section className={styles['ai-tool-section']}>
      <h3 className={styles['ai-tool-title']}>
        🧠 AI 전문가에게 추가 검증 요청
      </h3>
      <p className={styles['ai-tool-desc']}>
        규칙 기반 평가를 넘어, ChatGPT/Gemini 등 AI 전문가의 심층 분석을 받아보세요.
        아래 버튼을 클릭하면 전문가 프롬프트가 복사되고 AI 도구가 열립니다.
      </p>

      <div className={styles['button-group']}>
        {Object.entries(AI_PROMPT_TEMPLATES).map(([key, config]) => (
          <Button
            key={key}
            onClick={() => onCopyPrompt(key as AITool)}
            className={styles['ai-button']}
            leftIcon={config.icon}
          >
            {config.name}에게 물어보기
          </Button>
        ))}
      </div>

      {promptCopied && (
        <div className={styles['copy-success']}>
          ✅ 프롬프트가 복사되었습니다! AI 도구에 붙여넣으세요 (Ctrl/Cmd + V)
        </div>
      )}
    </section>
  );
};
