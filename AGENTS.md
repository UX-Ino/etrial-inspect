# E-able A11y — Codex 컨텍스트

## 프로젝트 개요
KWCAG 2.2 기반 웹 접근성 자동 진단 + SEO + GEO(AI 친화도) 통합 분석 도구.
URL을 입력하면 Playwright로 크롤링 후 axe-core와 커스텀 KWCAG 룰을 적용해 리포트를 생성하고, Notion에 저장한다.

**현재 버전**: v2.1.0 (Web-only Architecture — Electron 제거됨)

## 기술 스택
- **프레임워크**: Next.js 16.1+ (App Router), React 19
- **진단 엔진**: Playwright + @axe-core/playwright
- **분석 라이브러리**: @capyseo/core, @houtini/geo-analyzer, fast-xml-parser
- **리포트 출력**: exceljs (Excel), recharts (Radar Chart), Notion API
- **테스트**: Jest (단위), Playwright (E2E)
- **언어**: TypeScript (strict)

## 디렉토리 구조
```
src/
├── app/            # Next.js App Router — 페이지 및 API Routes
│   └── api/        # /api/history/* (Notion 연동)
├── components/     # UI 공통 컴포넌트
├── features/       # 도메인별 기능 컴포넌트 (audit, seo, geo, report)
├── services/       # 비즈니스 로직 — NotionService, AuditExecutor 등
├── lib/            # 유틸리티 — Excel 생성, 파서
└── types/          # TypeScript 타입 정의

.agent/rules/       # 코딩 컨벤션 및 접근성 가이드 (항상 참조)
.agent/skills/      # 기능 플래너 스킬 정의
.Codex/            # Codex 전용 설정 (이 파일과 동일 레벨)
docs/plans/         # 기능별 실행 계획 문서
.github/workflows/  # CI — audit.yml (주 1회 자동 감사)
```

## 핵심 아키텍처 결정사항
- **Static Export 제거**: `output: 'export'` 없음. Notion API Route(`/api/history/*`)가 Node.js 서버 필요.
- **동적 라우팅**: 리포트 영구 링크는 `/report/[id]` (쿼리 파라미터 방식 X).
- **Notion Chunking**: JSON 저장 시 2000자/100아이템 제한 → 복수 Code Block으로 분할 저장.
- **Soft Delete**: Notion DB의 `Deleted` Checkbox 속성으로 이력 숨김 처리.

## 개발 환경 명령어
```bash
npm run dev       # 개발 서버 (http://localhost:3000)
npm run build     # 프로덕션 빌드
npm test          # Jest 단위 테스트
npx tsx scripts/run-audit.ts  # 로컬 감사 실행
```

## 환경 변수 (`.env` 참조)
- `NOTION_API_KEY` — Notion 통합 시크릿
- `NOTION_DATABASE_ID` — 진단 결과 저장용 DB ID
- `TARGET_URL` — CI에서 감사할 대상 URL

## 코딩 규칙
- 모든 코딩 작업은 **`.agent/rules/`** 폴더의 가이드를 최우선 기준으로 따른다.
- TypeScript strict 모드 유지 — `any` 사용 금지.
- 컴포넌트는 `features/` 도메인 단위로 분리.
- API Route는 표준 `Response` 포맷 (`{ data, error }`) 준수.
- 테스트는 **TDD** — 프로덕션 코드 전에 실패 테스트 먼저 작성.
- 세부 규칙: `.Codex/rules/` 참조.

## 현재 진행 중인 작업
`progress.md` 참조.

## 관련 에이전트 페르소나
- `.Codex/agents/a11y-engineer.md` — 접근성 엔지니어
- `.Codex/agents/code-reviewer.md` — 코드 리뷰어
