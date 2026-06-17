# 진행 상황 (Progress)

> 최종 업데이트: 2026-06-15

## 현재 상태
Notion 통합 재구축(v2) 진행 중. 3개 플랜이 병렬로 열려 있으며, 의존 관계는 아래와 같다.

```
[PLAN_fix_json_retrieval]     ← 가장 먼저 완료해야 함 (데이터 무결성)
        ↓
[PLAN_notion_integration_v2]  ← 빌드 모드 변경 + 동적 라우팅
        ↓
[PLAN_audit_history_list]     ← 이력 조회 UI (위 두 개 완료 후)
```

---

## 진행 중인 플랜

> **업데이트 (2026-06-16)**: 아래 세 개 플랜의 소스 코드가 이미 모두 구현되어 있었으며, 깨져 있던 단위 테스트(`NotionService.test.ts`, `browser-utils.test.ts`)의 비동기 호출 및 모킹을 수정하여 모든 단위 테스트가 통과(GREEN)하고 빌드가 완료됨을 확인했습니다.

### 1. Fix JSON Reassembly — `docs/plans/PLAN_fix_json_retrieval.md`
**목표**: Notion에서 여러 Code Block으로 나뉜 JSON을 순서대로 합쳐서 파싱

- [x] Phase 1: `NotionService.test.ts`에 `getAuditResult` 재현 테스트 추가 (RED)
- [x] Phase 2: `getAuditResult` — 연속된 JSON Code Block 전부 수집 후 합쳐서 파싱 (GREEN)
- [x] Phase 3: 단위 테스트 통과 확인 후 사용자 재확인

### 2. Notion 통합 v2 — `docs/plans/PLAN_notion_integration_v2.md`
**목표**: API Route 정상화, 동적 라우팅, Notion Chunking TDD

- [x] Phase 1: `next.config.ts`에서 `output: 'export'` 제거, `/api/health` 생성 및 빌드 확인
- [x] Phase 2: `NotionService.test.ts` — 150개 이상 블록 저장 시나리오 TDD
- [x] Phase 3: `/api/history/save`, `/api/history/get`, `/report/[id]/page.tsx` 복원

### 3. Audit History List — `docs/plans/PLAN_audit_history_list.md`
**목표**: Notion 이력 목록 UI + Soft Delete 기능

- [x] Phase 1: `getAuditHistory()`, `softDeletePage()` TDD 구현
- [x] Phase 2: `/api/history/list`, `/api/history/delete` + `HistoryList.tsx` UI
- [x] Phase 3: 로컬 통합 테스트 + Notion DB `Deleted` 컬럼 추가 안내

---

## 완료된 작업
- [x] Web-only 아키텍처로 전환 (Electron 제거)
- [x] GEO(AI 친화도) 분석 기능 통합
- [x] Excel 멀티 시트 리포트
- [x] Radar Chart 통합 대시보드
- [x] CI 자동 감사 워크플로우 (`audit.yml`)

---

## 다음 즉시 할 일 (Next Actions)
1. `.env` 파일에 Notion API 키 및 데이터베이스 ID를 등록하여 로컬 연동 동작 테스트
2. `npm run dev` 서버 실행 후 브라우저(http://localhost:3000)에서 진단 수행 및 Notion 저장 기능 작동 확인
3. 삭제 및 리포트 조회 이력이 정상 반영되는지 확인
