---
trigger: model_decision
---

---

## trigger: model_decision

---

## trigger: model_decision

# Component 재사용 지침

> [!IMPORTANT]
> **코딩 시작 전 반드시 해당 컴포넌트 가이드 파일을 참조하여 코드를 생성합니다.**

> 코딩 시작 시, 먼저 재사용할 수 있는 컴포넌트를 분석합니다.
> 일관성 있고 유지보수가 용이한 웹사이트를 구축하기 위해 컴포넌트를 설계하고 재사용할 때 따라야 할 규칙과 모범 사례를 정리했습니다.

---

## 컴포넌트 가이드 참조 파일

### 컴포넌트 참조 방법

1. **확인**: 필요한 UI 요소가 가이드에 있는지 확인
2. **참조**: 해당 컴포넌트 가이드 파일(`src/guide/pages/components/*.html`) 열기
3. **복사**: `<textarea class="code_content html">` 블록의 HTML 코드 복사
4. **적용**: 프로젝트에 맞게 텍스트, ID, 클래스 등 수정

### 컴포넌트 가이드 파일 목록

| 컴포넌트        | 가이드 파일 경로                                                                                         | 설명                      |
| --------------- | -------------------------------------------------------------------------------------------------------- | ------------------------- |
| **Accordion**   | [src/guide/pages/components/accordion.html](../../src/guide/pages/components/accordion.html:0:0-0:0)     | 아코디언/접기펼치기       |
| **Breadcrumb**  | [src/guide/pages/components/breadcrumb.html](../../src/guide/pages/components/breadcrumb.html:0:0-0:0)   | 경로 탐색                 |
| **Button**      | [src/guide/pages/components/button.html](../../src/guide/pages/components/button.html:0:0-0:0)           | 버튼 (기본, 아이콘, 그룹) |
| **Checkbox**    | [src/guide/pages/components/checkbox.html](../../src/guide/pages/components/checkbox.html:0:0-0:0)       | 체크박스                  |
| **Date Picker** | [src/guide/pages/components/date-picker.html](../../src/guide/pages/components/date-picker.html:0:0-0:0) | 날짜 선택                 |
| **Dialog**      | [src/guide/pages/components/dialog.html](../../src/guide/pages/components/dialog.html:0:0-0:0)           | 다이얼로그/알림창         |
| **Form**        | [src/guide/pages/components/form.html](../../src/guide/pages/components/form.html:0:0-0:0)               | 폼 레이아웃               |
| **Icon**        | [src/guide/pages/components/icon.html](../../src/guide/pages/components/icon.html:0:0-0:0)               | 아이콘                    |
| **Input**       | [src/guide/pages/components/input.html](../../src/guide/pages/components/input.html:0:0-0:0)             | 텍스트 입력 필드          |
| **Modal**       | [src/guide/pages/components/modal.html](../../src/guide/pages/components/modal.html:0:0-0:0)             | 모달 (전체/하단)          |
| **Pagination**  | [src/guide/pages/components/pagination.html](../../src/guide/pages/components/pagination.html:0:0-0:0)   | 페이지네이션              |
| **Radio**       | [src/guide/pages/components/radio.html](../../src/guide/pages/components/radio.html:0:0-0:0)             | 라디오 버튼               |
| **Select**      | [src/guide/pages/components/select.html](../../src/guide/pages/components/select.html:0:0-0:0)           | 셀렉트박스                |
| **Snackbar**    | [src/guide/pages/components/snackbar.html](../../src/guide/pages/components/snackbar.html:0:0-0:0)       | 토스트 알림               |
| **Swiper**      | [src/guide/pages/components/swiper.html](../../src/guide/pages/components/swiper.html:0:0-0:0)           | 슬라이드/캐러셀           |
| **Tab**         | [src/guide/pages/components/tab.html](../../src/guide/pages/components/tab.html:0:0-0:0)                 | 탭 UI                     |
| **Table**       | [src/guide/pages/components/table.html](../../src/guide/pages/components/table.html:0:0-0:0)             | 테이블/표                 |
| **Tooltip**     | [src/guide/pages/components/tooltip.html](../../src/guide/pages/components/tooltip.html:0:0-0:0)         | 툴팁                      |

### 요소(Element) 가이드 파일 목록

| 컴포넌트      | 가이드 파일 경로                                                                                                     | 설명          |
| ------------- | -------------------------------------------------------------------------------------------------------------------- | ------------- |
| **Accordion** | [src/guide/pages/components/element/accordion.html](../../src/guide/pages/components/element/accordion.html:0:0-0:0) | 요소 아코디언 |
| **Alert**     | [src/guide/pages/components/element/alert.html](../../src/guide/pages/components/element/alert.html:0:0-0:0)         | 알림 요소     |
| **Carousel**  | [src/guide/pages/components/element/carousel.html](../../src/guide/pages/components/element/carousel.html:0:0-0:0)   | 캐러셀 요소   |
| **Modal**     | [src/guide/pages/components/element/modal.html](../../src/guide/pages/components/element/modal.html:0:0-0:0)         | 모달 요소     |
| **Select**    | [src/guide/pages/components/element/select.html](../../src/guide/pages/components/element/select.html:0:0-0:0)       | 셀렉트 요소   |
| **Snackbar**  | [src/guide/pages/components/element/snackbar.html](../../src/guide/pages/components/element/snackbar.html:0:0-0:0)   | 스낵바 요소   |
| **Swiper**    | [src/guide/pages/components/element/swiper.html](../../src/guide/pages/components/element/swiper.html:0:0-0:0)       | 스와이퍼 요소 |
| **Tab**       | [src/guide/pages/components/element/tab.html](../../src/guide/pages/components/element/tab.html:0:0-0:0)             | 탭 요소       |
| **Tooltip**   | [src/guide/pages/components/element/tooltip.html](../../src/guide/pages/components/element/tooltip.html:0:0-0:0)     | 툴팁 요소     |

---

## 컴포넌트 설계 원칙

### 1. 단일 책임 원칙

- 각 컴포넌트는 하나의 명확한 목적을 가져야 합니다.
- 버튼, 카드, 모달, 네비게이션 등 기능별로 분리하여 설계합니다.

### 2. 독립성 유지

- 컴포넌트는 특정 페이지나 컨텍스트에 종속되지 않도록 설계합니다.
- 전역 스타일에 의존하지 않고, 컴포넌트 자체로 완결성을 갖춰야 합니다.

### 3. 재사용 가능한 구조

- 다양한 상황에서 사용할 수 있도록 유연하게 설계합니다.
- 컴포넌트 클래스는 `.component-` 접두사를 사용합니다.

---

## 디렉토리 구조

**가이드 로컬 페이지**: `http://localhost:8888/guide/pages/components/component.html`

---

## 컴포넌트 네이밍 규칙

| 유형              | 접두사/접미사     | 예시                      |
| ----------------- | ----------------- | ------------------------- |
| **컴포넌트 루트** | `.component-`     | `.component-accordion`    |
| **하위 요소**     | 컴포넌트명-요소명 | `.accordion-item`         |
| **상태 클래스**   | 상태명            | `.on`, `.active`, `.show` |

---

## 접근성 필수 속성

| 컴포넌트       | 필수 속성                            |
| -------------- | ------------------------------------ |
| **Accordion**  | `aria-expanded`, `aria-controls`     |
| **Modal**      | `role="dialog"`, `aria-modal="true"` |
| **Tab**        | `role="tablist"`, `aria-selected`    |
| **Pagination** | `aria-label`, `aria-current="page"`  |

---

> 이 지침은 컴포넌트 기반 개발을 효율적으로 수행하기 위한 가이드입니다.
