# E-able A11y - 웹 접근성 및 SEO 자동 진단 도구

KWCAG 2.2 표준을 기반으로 한 자동 웹 접근성 진단 및 SEO 최적화 분석 도구입니다. Next.js 16, React 19, Playwright, 그리고 Axe-core를 활용하여 현대적인 웹 애플리케이션의 품질을 통합적으로 점검합니다.

## 🚀 주요 기능

### 1. 웹 접근성 진단 (KWCAG 2.2)
- **자동 크롤링**: Playwright 기반의 정밀한 페이지 탐색 및 진단.
- **표준 준수**: `axe-core`와 정교화된 KWCAG 규칙을 결합한 상세 분석.
- **대화형 리포트**: 원칙별, 영향도별, 특정 KWCAG 지침별 필터링 기능 제공.

### 2. SEO 최적화 분석
- **Sitemap.xml 검수**: XML 유효성, URL 접근성, robots.txt 연동 여부 확인.
- **메타데이터 검증**: Title, Description, Canonical, Open Graph, Viewport 등 필수 태그 분석.
- **자동 점수화**: 0-100점 사이의 객관적인 SEO 점수 산출.

### 3. AI 친화도 분석 (GEO - Generative Engine Optimization)
- **llms.txt 분석**: AI 모델을 위한 Markdown 구조, 키워드 밀도, 가독성 평가.
- **품질 지표**: 구조, 분량, 요약, 가독성 등 5가지 기준에 따른 자동 평가.
- **프롬프트 생성**: ChatGPT, Gemini, Claude용 전문가 분석 프롬프트 자동 생성.

### 4. 통합 리포트 및 대시보드
- **시각화 리포트**: Radar Chart를 통한 접근성/SEO/AI 점수 통합 대시보드.
- **Excel 데이터 내보내기**: 
  - 세부 위반 내역, SEO 시트, AI 평가 결과 및 템플릿 포함.
  - 종합 점수 및 등급(A~F) 요약 제공.

## 🛠 기술 스택

- **Core**: [Next.js 16.1+](https://nextjs.org/) (App Router), [React 19](https://react.dev/)
- **Audit Engine**: [Playwright](https://playwright.dev/), [@axe-core/playwright](https://www.npmjs.com/package/@axe-core/playwright)
- **Analysis Libs**:
  - SEO: `@capyseo/core`, `seo-analyzer`
  - AI (GEO): `@houtini/geo-analyzer`, `llms-txt-generator`
  - Graphics: `recharts`
- **Output**: `exceljs` (Excel Generation), `fast-xml-parser`

## 📂 프로젝트 구조

```
.
├── src/
│   ├── app/            # Next.js App Router (Pages, API Routes)
│   ├── components/     # UI 공통 컴포넌트
│   ├── features/       # 도메인 기반 기능별 컴포넌트 및 로직
│   ├── services/       # 비즈니스 로직 (AuditExecutor, SEO/A11y 서비스)
│   ├── lib/            # 유틸리티 및 전역 라이브러리 (Excel, Parser)
│   ├── types/          # TypeScript 타입 정의
│   └── scripts/        # 자동화 및 유틸리티 스크립트
├── public/             # 정적 에셋 (Icons, Images)
├── docs/               # 문서 및 설계 자료
├── out/                # 빌드 및 정적 내보내기 결과물 (환경에 따라 상이)
└── package.json        # 의존성 및 스크립트 설정
```

## 🏁 시작하기

### 사전 요구 사항
- Node.js 18 이상
- npm 또는 yarn

### 설치
```bash
npm install
```

### 개발 모드 실행
```bash
npm run dev
# 브라우저에서 http://localhost:3000 접속
```

### 빌드 및 배포
```bash
# 빌드 수행
npm run build

# 프로덕션 실행
npm run start
```

## 🔄 버전 히스토리

### v2.1.0 (현재) - Web-only Architecture
- ⚡ **아키텍처 통합**: 기존 Electron 하이브리드 방식에서 Web-only 아키텍처로 단순화 및 최적화.
- 🎨 **UI 개선**: Next.js App Router와 React 19 기반의 퍼포먼스 향상.
- 📈 **분석 고도화**: `@houtini/geo-analyzer`를 통한 AI 친화도(GEO) 평가 기능 강화.

### v2.0.0
- ✨ **신규**: SEO 최적화 분석 및 Sitemap 검수 기능 추가.
- ✨ **신규**: AI 프롬프트 자동 생성 엔진 도입.
- ✨ **신규**: 통합 Radar Chart 및 Excel 멀티 시트 리포트.

### v1.0.0
- ✅ KWCAG 2.2 웹 접근성 자동 진단 MVP.
- ✅ Playwright 기반 원클릭 전수 검사.

## 📄 라이선스

사내 보안 규정에 따름 (Internal Use Only).
