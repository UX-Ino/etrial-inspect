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

## 🤖 Claude Code 통합 (하네스 엔지니어링)

이 프로젝트는 Claude Code와 함께 동작하도록 **하네스 엔지니어링 구조**를 갖추고 있다.
대화 시작 시 Claude가 `CLAUDE.md`를 자동으로 읽어 프로젝트 컨텍스트를 유지한다.

### 디렉토리 역할

```
CLAUDE.md              ← Claude가 항상 읽는 프로젝트 컨텍스트
progress.md            ← 현재 진행 중인 작업 및 다음 TODO

.claude/
├── rules/             ← 모든 작업에 자동 적용되는 정책
│   ├── security.md       (환경변수, Notion API, 민감파일 규칙)
│   └── a11y-coding.md    (KWCAG 컴포넌트 코딩 정책)
├── skills/            ← 반복 작업의 절차 가이드
│   ├── add-kwcag-rule.md (새 접근성 룰 추가 절차)
│   └── run-audit.md      (로컬 감사 실행 방법)
└── agents/            ← 전문 영역별 페르소나
    ├── a11y-engineer.md  (접근성 엔지니어)
    └── code-reviewer.md  (코드 리뷰어)
```

---

### 에이전트 사용 예시

#### 접근성 엔지니어 — 새 KWCAG 룰 추가

**언제**: axe-core가 잡지 못하는 KWCAG 항목을 커스텀 룰로 추가할 때

```
# 프롬프트 예시
"KWCAG 1.4.3 명도대비 룰이 없어. a11y-engineer 페르소나로
 add-kwcag-rule 스킬에 따라 kwcag-1-4-3 룰 추가해줘"
```

**Claude가 하는 일**:
1. `.agent/rules/Accessibility-Checklist2.1.md`에서 1.4.3 항목 확인
2. `src/features/audit/rules/kwcag-1-4-3-contrast.ts` 생성
3. TDD — 위반 케이스 테스트 먼저 작성 후 룰 구현
4. `npm test -- --testPathPattern="kwcag-1-4-3"` 통과 확인

**확인 명령**:
```bash
npm test                  # 전체 테스트 통과 여부
npm run build             # 빌드 오류 없음
```

---

#### 접근성 엔지니어 — 컴포넌트 접근성 검토

**언제**: 새 UI 컴포넌트 작성 또는 기존 컴포넌트 리뷰 시

```
# 프롬프트 예시
"a11y-engineer 페르소나로 src/components/AuditTerminal.tsx의
 접근성을 검토하고 KWCAG 항목 번호와 함께 문제점 알려줘"
```

**Claude가 확인하는 항목**:
- 키보드 접근성 (Tab 순서, 포커스 표시)
- 스크린 리더 호환 (role, aria-label, aria-live)
- 색상 대비 4.5:1 이상 여부
- 아이콘 버튼의 숨김 텍스트 존재 여부

---

#### 코드 리뷰어 — PR 리뷰

**언제**: `NotionService`, API Route, 핵심 비즈니스 로직 변경 후

```
# 프롬프트 예시
"code-reviewer 페르소나로 NotionService.ts 변경사항 리뷰해줘.
 특히 JSON Chunking 로직과 타입 안전성 집중적으로 봐줘"
```

**Claude가 출력하는 형식**:
```
## 리뷰 결과

### 필수 수정 (블로커)
- [NotionService.ts:42] break문으로 인해 첫 번째 블록만 수집됨

### 권장 수정
- [NotionService.ts:67] unknown 대신 any 사용 — 타입 가드 추가 필요

### 확인 필요
- 100개 초과 블록 케이스를 테스트한 케이스가 없음
```

**확인 명령**:
```bash
npm test                  # 리뷰 지적 사항 수정 후 테스트
npx tsc --noEmit          # 타입 오류 없음 확인
```

---

#### 기능 플래너 — 새 기능 계획

**언제**: 새 기능을 시작하기 전 단계별 계획이 필요할 때

```
# 프롬프트 예시
"Audit History 삭제 기능 구현 계획 잡아줘.
 my-skill 스킬 절차대로 docs/plans/에 계획 문서 만들어줘"
```

**Claude가 하는 일**:
1. 관련 파일 분석 (`NotionService.ts`, `HistoryList.tsx` 등)
2. 3~5단계 TDD 기반 실행 계획 수립
3. `docs/plans/PLAN_기능명.md` 생성 (체크박스 + 품질 게이트 포함)
4. 계획 승인 후 구현 시작

---

#### 로컬 감사 실행 확인

**언제**: 구현 후 실제 URL 대상으로 통합 테스트 시

```
# 프롬프트 예시
"run-audit 스킬대로 https://example.com 감사 실행하고
 결과 Notion에 저장되는지 확인해줘"
```

**확인 순서**:
```bash
npm run dev                                          # 개발 서버 시작
TARGET_URL=https://example.com npx tsx scripts/run-audit.ts
# → 콘솔에서 Notion 저장 URL 확인
# → http://localhost:3000/report/{id} 접속 확인
```

---

### 진행 중인 작업 확인
```
# 프롬프트 예시
"progress.md 보고 지금 뭐 해야 하는지 알려줘"
```

---

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
