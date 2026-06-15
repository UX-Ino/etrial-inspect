# Skill: 로컬 감사 실행

## 언제 사용하나
특정 URL에 대해 접근성/SEO/GEO 감사를 로컬에서 즉시 실행할 때.

## 사전 조건
- `.env` 파일에 `NOTION_API_KEY`, `NOTION_DATABASE_ID` 설정 완료
- Playwright 브라우저 설치: `npx playwright install chromium`

## 실행 방법

### 기본 실행
```bash
TARGET_URL=https://example.com npx tsx scripts/run-audit.ts
```

### 개발 서버와 함께 실행
```bash
# 터미널 1
npm run dev

# 터미널 2
TARGET_URL=http://localhost:3000 npx tsx scripts/run-audit.ts
```

## 결과 위치
- **스크린샷**: `public/screenshots/`
- **Notion 저장**: 실행 후 콘솔에 출력되는 리포트 URL 확인
- **로컬 리포트**: `http://localhost:3000/report/{id}`

## 트러블슈팅

### Playwright 오류
```bash
npx playwright install --with-deps chromium
```

### Notion API 오류
- `.env`의 `NOTION_API_KEY` 유효성 확인
- Notion DB에 `Deleted` (Checkbox) 컬럼 존재 여부 확인

### JSON 파싱 오류
- `SyntaxError: Unterminated string` → `docs/plans/PLAN_fix_json_retrieval.md` 참조
- `getAuditResult`의 Code Block 수집 로직 문제

## CI 자동 실행
`.github/workflows/audit.yml` — 매주 월요일 자동 실행 (또는 수동 트리거).
```bash
gh workflow run audit.yml -f target_url=https://example.com
```
