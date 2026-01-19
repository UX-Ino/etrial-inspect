// ESM 모듈 로딩 문제 해결을 위한 모킹
jest.mock('@capyseo/core', () => ({
  analyzeReadability: jest.fn().mockReturnValue({ score: 80, gradeLevel: 'University' })
}));
jest.mock('@houtini/geo-analyzer', () => ({
  PatternAnalyzer: jest.fn().mockImplementation(() => ({
    analyze: jest.fn().mockReturnValue({
      metrics: { claimDensity: { density: 1.5 } },
      scores: { citability: 0.8 }
    })
  }))
}));
jest.mock('seo-analyzer', () => {
  return jest.fn().mockImplementation(() => ({
    inputHTMLStrings: jest.fn().mockReturnThis(),
    useRule: jest.fn().mockReturnThis(),
    outputJson: jest.fn().mockImplementation(function (this: any, cb) {
      cb(JSON.stringify([]));
      return this;
    }),
    run: jest.fn().mockResolvedValue(undefined)
  }));
});

import { SEOAuditService } from '../SEOAuditService';

describe('SEOAuditService - Phase 3: AI Indexing Automation', () => {
  let service: SEOAuditService;

  beforeEach(() => {
    service = new SEOAuditService();
  });

  describe('llms.txt Automation with llms-txt-generator', () => {
    test('should provide enhanced structural validation for llms.txt', async () => {
      const mockUrl = 'https://example.com';
      const result = await service.analyzeLlmsTxt(mockUrl);

      // 현재는 llms-txt-generator를 사용하지 않으므로 특정 필드가 없거나 기본값일 것
      // (예: 패키지를 통한 상세 구조 점수나 자동 생성된 고품질 제안서 등)
      expect(result).toBeDefined();
      expect(result.score).toBeDefined();

      // llms-txt-generator의 흔적이 있는지 확인 (RED)
      expect(result).toHaveProperty('generatorSource', 'llms-txt-generator');
    });
  });
});
