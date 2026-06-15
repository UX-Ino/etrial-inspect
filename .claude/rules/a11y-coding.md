# 접근성 코딩 정책

> 이 프로젝트는 웹 접근성 진단 도구이므로, 도구 자체도 KWCAG 2.2를 준수해야 한다.
> 세부 가이드는 `.agent/rules/` 폴더를 참조한다.

## 핵심 원칙 (POUR)
- **인식의 용이성**: 모든 이미지에 `alt`, 색상만으로 정보를 구분하지 않음
- **운용의 용이성**: 키보드만으로 모든 기능 접근 가능, 포커스 표시 유지
- **이해의 용이성**: 명확한 레이블, 에러 메시지 구체적 안내
- **견고성**: 시맨틱 HTML, WAI-ARIA 올바른 사용

## 컴포넌트 작성 규칙

### 버튼 및 인터랙티브 요소
- 아이콘 전용 버튼은 반드시 숨김 텍스트(`hide-txt` 클래스 또는 `aria-label`) 제공
- `<div onClick>` 대신 `<button>` 사용
- 비활성 상태는 `disabled` + `aria-disabled` 함께 사용

### 폼 요소
- 모든 `<input>`에 연결된 `<label>` 또는 `aria-label` 필수
- 에러 메시지는 `aria-describedby`로 입력 필드와 연결
- 필수 필드는 `required` + `aria-required="true"`

### 동적 콘텐츠
- 로딩 상태 변경 시 `aria-live="polite"` 영역으로 알림
- 모달/다이얼로그: `role="dialog"`, `aria-modal="true"`, 포커스 트랩 구현
- 탭 컴포넌트: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`

### 색상 대비
- 일반 텍스트: 4.5:1 이상
- 큰 텍스트(18px 이상 또는 14px bold): 3:1 이상
- UI 아이콘: 3:1 이상
- 색상만으로 상태를 표현하지 않음 (아이콘 또는 텍스트 병행)

### 키보드 네비게이션
- 모든 인터랙티브 요소는 `Tab`으로 접근 가능
- 포커스 순서는 시각적 순서와 일치
- 커스텀 컴포넌트는 해당 role의 키보드 패턴 준수 (WAI-ARIA Authoring Practices)
- `outline: none` 단독 사용 금지 — 커스텀 포커스 스타일 대체 필수

## KWCAG 규칙 파일 위치
새 KWCAG 룰 추가 시 `.claude/skills/add-kwcag-rule.md` 절차 따를 것.

## 참조 문서 (`.agent/rules/`)
- `Accessibility-Basic.md` — 접근성 기본 개념
- `Accessibility-Checklist2.1.md` — KWCAG 2.1 체크리스트
- `Accessibility-Components.md` — 컴포넌트별 접근성
- `WAI-ARIA.md` — ARIA 사용법
- `HTML-Semantic-Tags.md` — 시맨틱 마크업
