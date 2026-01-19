# Implementation Plan: UI/UX Refactoring (SEO & AI Detail Views)

**Status**: ⏳ Pending Approval
**Started**: 2026-01-05
**Estimated Completion**: 2026-01-06

---

## 📋 Overview

### Feature Description
`SEOResultDisplay` 컴포넌트에 통합되어 있던 SEO 분석 결과와 AI(GEO) 분석 결과를 각각 독립된 상세 페이지(또는 전용 탭 뷰)로 분리합니다.

### Success Criteria
- [ ] 메인 리포트 페이지(`ReportPage`)에서 SEO/AI 요약 카드 및 상세 보기 버튼 구현
- [ ] `SEODetailView` 컴포넌트: `seo-analyzer` 데이터 및 메타데이터 정밀 분석 표시
- [ ] `AIDetailView` 컴포넌트: `llms.txt` 구조, GEO 지표, AI 전문가 프롬프트 도구 표시
- [ ] 뷰 전환 시 데이터 무결성 유지 (localStorage 기반 공유)

---

## 🏗️ Architecture Decisions

| Decision | Rationale | Trade-offs |
|----------|-----------|------------|
| View Switching | Next.js Page 라우팅 대신 내부 State/Tabs 사용 | 페이지 전환 시 불필요한 리렌더링 방지 및 속도 향상 |
| Component Split | SEOResultDisplay를 원자 단위로 분리 | 초기 리팩토링 비용 발생하나 유지보수성 극대화 |

---

## 🚀 Implementation Phases

### Phase 1: Component Refactoring
**Goal**: 기존 통합 컴포넌트를 기능 단위로 분리
- [ ] **Task 1.1**: `src/components/SEODetailView.tsx` 생성 및 SEO 로직 이관
- [ ] **Task 1.2**: `src/components/AIDetailView.tsx` 생성 및 AI/GEO 로직 이관
- [ ] **Task 1.3**: 공용 UI 요소(Score Badge 등) 추출 및 재사용

### Phase 2: Navigation & State Management
**Goal**: 대시보드에서 각 뷰로 접근하는 네비게이션 구현
- [ ] **Task 2.1**: `ReportPage` 상단에 뷰 전환용 탭 UI 추가
- [ ] **Task 2.2**: 선택된 탭에 따른 조건부 렌더링 로직 구현
- [ ] **Task 2.3**: 상세 보기 버튼(Action Buttons) 연동

### Phase 3: Visual Enhancement & Verification
**Goal**: 각 뷰별 특화된 디자인 적용 및 최종 검증
- [ ] **Task 3.1**: SEO 뷰에 결함 리스트 아코디언 적용
- [ ] **Task 3.2**: AI 뷰에 GEO 지표 가시화 차트 보강
- [ ] **Task 3.3**: 전체 통합 테스트 수행

---

## ✋ Quality Gate

- [ ] 모든 상세 뷰가 `auditResult` 데이터를 정상적으로 수신하는가?
- [ ] 클립보드 복사 등 기존 기능이 분리된 뷰에서도 정상 작동하는가?
- [ ] 반응형 레이아웃이 유지되는가?

---

**Plan Status**: ⏳ Pending
**Next Action**: 사용자 승인 후 Phase 1 시작
