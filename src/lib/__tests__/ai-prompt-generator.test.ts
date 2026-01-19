import { generateAIEvaluationPrompt } from '../ai-prompt-generator';
import { AIPromptData } from '@/types/seo';

describe('ai-prompt-generator - Phase 2: Professional Findings Enrichment', () => {
  test('should include professional findings in the generated prompt', () => {
    const mockData: AIPromptData = {
      siteName: 'Test Site',
      url: 'https://test.com',
      llmsTxtContent: '# Test Site\nWelcome to our AI-friendly site.',
      ruleBasedScore: 85,
      suggestedImprovements: ['Add more keywords'],
      professionalFindings: ['[GEO] Claim density is low (1.2 facts/100 words)', '[GEO] Entity recognition: failed to identify core service entity']
    };

    const prompt = generateAIEvaluationPrompt(mockData);

    // 전문 패키지 분석 내용이 프롬프트에 포함되어 있는지 확인
    expect(prompt).toContain('전문 분석 팩트');
    expect(prompt).toContain('[GEO] Claim density is low');
    expect(prompt).toContain('[GEO] Entity recognition');
  });
});
