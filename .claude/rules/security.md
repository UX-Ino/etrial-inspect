# 보안 규칙

## 민감 파일 처리

### 절대 금지
- `.env`, `.env.*` 파일 내용을 로그, 리포트, 응답에 포함하지 않는다.
- `auth_state.json` (Playwright 인증 상태)을 커밋하거나 출력하지 않는다.
- `NOTION_API_KEY`, `NOTION_DATABASE_ID` 등 시크릿을 클라이언트 번들에 노출하지 않는다.
  - Next.js에서 `NEXT_PUBLIC_` 접두사 없이 선언된 환경 변수만 서버 사이드에서 사용할 것.

### 환경 변수 사용 원칙
- 환경 변수는 반드시 `src/lib/env.ts` (또는 동등한 중앙 모듈)에서 한 번만 검증하고 내보낸다.
- 런타임 환경 변수 누락 시 앱 시작을 차단하는 `checkEnv()` 패턴을 사용한다.
- `.env.example`을 항상 최신 상태로 유지한다 (값은 placeholder).

### Notion API 보안
- Notion API Key는 서버 사이드 API Route에서만 사용한다 (`src/app/api/**`).
- API Route는 요청 출처를 검증하거나 rate limiting을 적용한다.
- Notion 응답에서 불필요한 민감 정보(페이지 ID 외)를 클라이언트에 그대로 전달하지 않는다.

### GitHub Actions
- 시크릿은 반드시 GitHub Repository Secrets에 저장: `NOTION_API_KEY`, `NOTION_DATABASE_ID`.
- workflow 파일에 시크릿 값을 하드코딩하지 않는다.
- artifact 보존 기간은 90일 이하로 설정한다 (현재 설정 준수).

## 입력 검증
- `TARGET_URL` 입력은 반드시 URL 형식을 검증한 후 Playwright에 전달한다.
- API Route body 파라미터는 항상 타입 가드 또는 zod로 검증한다.
- Notion에서 읽어온 JSON은 `try/catch`로 파싱하고 실패 시 구조화된 에러를 반환한다.

## 파일 시스템
- `public/screenshots/`는 인증 없이 접근 가능하므로 민감한 스크린샷을 저장하지 않는다.
- `out/` 디렉토리는 빌드 결과물이므로 `.gitignore`에 포함한다.
