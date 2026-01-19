// ESM 모듈 로딩 문제 해결을 위한 모킹
jest.mock('@capyseo/core', () => ({
  analyzeReadability: jest.fn().mockReturnValue({ fleschReadingEase: 80, fleschKincaidGrade: 12, wordCount: 100, sentenceCount: 10, syllableCount: 150 })
}));
jest.mock('@houtini/geo-analyzer', () => ({
  PatternAnalyzer: jest.fn().mockImplementation(() => ({
    analyze: jest.fn().mockReturnValue({
      metrics: { claimDensity: { density: 1.5 } },
      scores: { citability: 0.8 }
    })
  }))
}));

import { SEOAuditService } from '../SEOAuditService';
import SeoAnalyzer from 'seo-analyzer';

// seo-analyzer 모킹
jest.mock('seo-analyzer', () => {
  return jest.fn().mockImplementation(() => {
    return {
      inputHTMLStrings: jest.fn().mockReturnThis(),
      useRule: jest.fn().mockReturnThis(),
      outputJson: jest.fn().mockImplementation(function (this: any, cb: any) {
        cb(JSON.stringify([{ rule: 'test', status: 'success' }]));
        return this;
      }),
      run: jest.fn().mockResolvedValue(undefined)
    };
  });
});

describe('SEOAuditService - Phase 1: Static Analysis Migration', () => {
  let service: SEOAuditService;

  beforeEach(() => {
    service = new SEOAuditService();
    jest.clearAllMocks();
  });

  describe('seo-analyzer Integration', () => {
    test('should call SeoAnalyzer when analyzing metadata', async () => {
      const mockUrl = 'https://example.com';
      await service.analyzeMetadata(mockUrl);

      // SeoAnalyzer 생성자가 호출되었는지 확인
      expect(SeoAnalyzer).toHaveBeenCalled();
    });

    test('should properly map seo-analyzer results to MetadataAnalysisResult', async () => {
      // 이 테스트는 현재 매핑 로직이 없으므로 실패해야 함
      const mockUrl = 'https://example.com';
      const result = await service.analyzeMetadata(mockUrl);

      // 만약 seo-analyzer를 사용한다면 기존과 다른 점수 체계나 데이터가 포함되어야 함
      // 여기서는 seo-analyzer의 결과가 반영되었는지 특정 필드로 확인 (예: source: 'seo-analyzer')
      expect(result).toHaveProperty('analysisSource', 'seo-analyzer');
    });
  });
});
