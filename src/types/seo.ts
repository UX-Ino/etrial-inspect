/**
 * SEO 및 AI 최적화 진단 결과 타입 정의
 */

// Sitemap.xml 분석 결과
export interface SitemapAnalysisResult {
  exists: boolean;
  robotsTxtReference: boolean;
  xmlValid: boolean;
  totalUrls: number;
  sampledUrls: {
    url: string;
    statusCode: number;
    lastModified?: string;
  }[];
  errors: string[];
  score: number; // 0-100
  analysisSource?: string;
}

// llms.txt 분석 결과
export interface LlmsTxtAnalysisResult {
  exists: boolean;
  structure: {
    hasH1: boolean;
    hasH2: boolean;
    hasH3: boolean;
    paragraphCount: number;
    wordCount: number;
    codeBlockCount: number;
  };
  contentQuality: {
    hasSummary: boolean;        // 상단 요약 존재 여부
    hasKeywords: boolean;        // 핵심 키워드 포함 여부
    readabilityScore: number;    // 가독성 점수 (규칙 기반)
    structureScore: number;      // 구조 점수 (H1~H3 계층)
  };
  brokenLinks: string[];
  suggestedContent?: string; // 없을 경우 자동 생성
  score: number; // 규칙 기반 종합 점수
  generatorSource?: string; // 생성 도구 출처 (예: 'llms-txt-generator')
}

// 메타데이터 분석 결과
export interface MetadataAnalysisResult {
  title: {
    exists: boolean;
    length: number;
    optimal: boolean; // 50-60자 권장
  };
  description: {
    exists: boolean;
    length: number;
    optimal: boolean; // 150-160자 권장
  };
  canonical: {
    exists: boolean;
    url?: string;
  };
  openGraph: {
    hasTitle: boolean;
    hasDescription: boolean;
    hasImage: boolean;
    hasUrl: boolean;
  };
  viewport: {
    exists: boolean;
    mobileFriendly: boolean;
  };
  score: number; // 0-100
  analysisSource?: string;
  professionalFindings?: string[]; // 전문 패키지 분석 결과
}

// 통합 SEO 진단 결과
export interface SEOAuditResult {
  url: string;
  timestamp: Date;
  sitemap: SitemapAnalysisResult;
  llmsTxt: LlmsTxtAnalysisResult;
  metadata: MetadataAnalysisResult;
  overallScore: {
    seo: number;      // (sitemap + metadata) / 2
    geoAI: number;    // llms.txt 점수
    total: number;    // 평균
  };
  recommendations: {
    priority: 'high' | 'medium' | 'low';
    category: 'sitemap' | 'llms' | 'metadata';
    message: string;
    actionable: string; // 구체적인 개선 방법
  }[];
}

// AI 프롬프트 생성용 데이터
export interface AIPromptData {
  siteName: string;
  url: string;
  llmsTxtContent: string;
  ruleBasedScore: number;
  suggestedImprovements: string[];
  professionalFindings?: string[]; // @capyseo/core 등을 통해 추출된 정밀 진단 결과
}
