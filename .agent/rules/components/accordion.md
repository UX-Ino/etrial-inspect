# Accordion

> Accordion 컴포넌트는 콘텐츠를 접고 펼칠 수 있는 인터랙티브한 UI 패턴을 제공합니다. 사용자가 필요한 정보만 선택적으로 볼 수 있도록 하여 공간을 효율적으로 활용합니다.

```html
<!-- 기본 구조 예시 -->
<div class="component-accordion">
  <div class="accordion-item" data-state="open">
    <button type="button" class="collapse-tit">Q. What is HTML?</button>
    <div class="collapse-content">HTML stands for Hyper Text Markup Language. It is used</div>
  </div>
  <div class="accordion-item">
    <button type="button" class="collapse-tit">Q. What is CSS?</button>
    <div class="collapse-content">CSS stands for Cascading Style Sheets</div>
  </div>
</div>
```

## TL;DR

- **언제 사용하나요?** FAQ, 긴 콘텐츠를 섹션별로 나누어 표시할 때, 제한된 공간에서 많은 정보를 제공해야 할 때 사용합니다.
- **핵심 역할**: 사용자가 클릭하여 콘텐츠를 펼치거나 접을 수 있는 상호작용을 제공하며, 여러 아이템을 동시에 열거나 하나씩만 열 수 있도록 제어합니다.
- **주요 클래스/속성**: `.component-accordion`, `.accordion-item`, `.collapse-tit`, `.collapse-content`, `data-props-type`, `data-state`

## 기본 마크업

### 필수 구조

- `.component-accordion`: 최상위 래퍼 (반드시 하나만 존재)
- `.accordion-item`: 반복되는 단위 요소 (개별 아코디언 아이템)
- `.collapse-tit`: 사용자 입력을 받는 버튼 요소
- `.collapse-content`: 펼쳐지거나 접히는 실제 콘텐츠 영역

### 필수 속성

- `data-props-type`: 아코디언 동작 모드 설정 (`multiple` 또는 `single`)
- `data-props-index`: 기본적으로 열릴 아이템의 인덱스 (선택 사항)
- `data-state`: 개별 아이템의 초기 상태 (`open` 또는 생략)
- `aria-expanded`: 현재 열림/닫힘 상태를 명시
- `aria-controls`: 제어하는 콘텐츠 영역을 연결

> **TIP**: 기본값은 `type="multiple"`이며, 각 `accordion-item`이 개별적으로 열립니다. 특정 아이템을 기본적으로 열어두려면 `data-state="open"` 속성을 추가하면 됩니다.

## 접근성 (Accessibility)

- 아코디언 헤더는 `<button>` 요소를 사용하여 키보드 접근성을 보장합니다.
- `aria-expanded` 속성으로 현재 열림/닫힘 상태를 명시하고, JavaScript로 동적으로 업데이트해야 합니다.
- `aria-controls` 속성으로 제어하는 콘텐츠 영역을 연결합니다.
- 아코디언 콘텐츠 영역에는 고유한 `id`를 부여합니다.
- 키보드 탐색(Tab, Enter, Space)을 안정적으로 지원하는지 확인합니다.
- 시각적 피드백과 포커스 스타일이 충분한 대비를 제공하는지 점검합니다.

## 구현 가이드

### 공통 규칙

- 모든 아코디언 버튼에 `type="button"` 속성을 명시해야 합니다.
- JavaScript로 `aria-expanded` 상태를 동적으로 업데이트해야 합니다.
- 아코디언 아이템은 `.component-accordion` 컨테이너 내에 배치합니다.
- 기본적으로 모든 아이템은 닫힌 상태로 시작합니다 (`aria-expanded="false"`).

### 클래스 & 상태 정의

| 클래스/속성         | 용도                      | 비고                                  |
| ------------------- | ------------------------- | ------------------------------------- |
| `.is-active`        | 열린 상태의 아코디언 표시 | 아코디언 아이템에 적용                |
| `.is-disabled`      | 비활성 상태 표시          | 접근성 속성과 함께 사용               |
| `data-state="open"` | 기본 오픈 상태 지정       | 개별 아이템에 적용하여 초기 상태 설정 |
| `data-props-type`   | 아코디언 동작 모드        | `multiple` (기본값) 또는 `single`     |

### 자바스크립트 연동

- 컴포넌트는 `data-props-type` 속성을 기준으로 초기화됩니다.
- 버튼 클릭 시 해당 아이템의 `aria-expanded` 상태를 토글합니다.
- `type="single"` 모드에서는 새 아이템을 열 때 기존에 열린 아이템을 자동으로 닫습니다.
- `data-state="open"` 속성이 있는 아이템은 초기 로드 시 열린 상태로 표시됩니다.

## 패턴 & 변형 (Variants)

> 각 변형은 "언제 사용해야 하는지"와 "기본 구조와 무엇이 다른지"를 함께 설명합니다.

### Multiple (기본)

- **사용 시나리오**: 사용자가 여러 섹션을 동시에 비교하거나 참고해야 할 때 사용합니다.
- **동작 방식**: 각 아이템이 독립적으로 열리고 닫힙니다.
- **기본 설정**: `data-props-type` 속성을 생략하거나 `"multiple"`로 설정합니다.

```html
<!-- Multiple Accordion (기본) -->
<div class="component-accordion">
  <div class="accordion-item" data-state="open">
    <button type="button" class="collapse-tit">Q. What is HTML?</button>
    <div class="collapse-content">HTML stands for Hyper Text Markup Language. It is used</div>
  </div>
  <div class="accordion-item">
    <button type="button" class="collapse-tit">Q. What is CSS?</button>
    <div class="collapse-content">CSS stands for Cascading Style Sheets</div>
  </div>
  <div class="accordion-item">
    <button type="button" class="collapse-tit">Q. What is JavaScript?</button>
    <div class="collapse-content">JavaScript is a programming language</div>
  </div>
</div>
```

### Single

- **사용 시나리오**: 한 번에 하나의 섹션만 집중해서 보여주고 싶을 때, 공간을 더욱 효율적으로 사용해야 할 때 사용합니다.
- **동작 방식**: 새 아이템을 열면 기존에 열린 아이템이 자동으로 닫힙니다.
- **추가 속성**: `data-props-type="single"` 속성을 `.component-accordion`에 추가합니다.

```html
<!-- Single Accordion -->
<div class="component-accordion" data-props-type="single" data-props-index="0">
  <div class="accordion-item component-collapse">
    <button type="button" class="collapse-tit">Q. What is HTML?</button>
    <div class="collapse-content">
      <div>HTML stands for Hyper Text Markup Language. It is used to create the structure of web pages.</div>
    </div>
  </div>
  <div class="accordion-item component-collapse">
    <button type="button" class="collapse-tit">Q. What is CSS?</button>
    <div class="collapse-content">CSS stands for Cascading Style Sheets. It is used</div>
  </div>
  <div class="accordion-item component-collapse">
    <button type="button" class="collapse-tit">Q. What is JavaScript?</button>
    <div class="collapse-content">JavaScript is a programming language</div>
  </div>
</div>
```

## 상세 예시 (Patterns)

### FAQ 섹션

FAQ 페이지에서 질문과 답변을 구조화할 때 아코디언을 사용하면 사용자가 필요한 정보만 선택적으로 볼 수 있습니다.

```html
<!-- FAQ 패턴 예시 -->
<section class="faq-section">
  <h2>자주 묻는 질문</h2>
  <div class="component-accordion" data-props-type="single">
    <!-- Step 1: 첫 번째 질문은 기본으로 열림 -->
    <div class="accordion-item" data-state="open">
      <button type="button" class="collapse-tit">Q. 회원가입은 어떻게 하나요?</button>
      <div class="collapse-content"> 회원가입은 상단의 '회원가입' 버튼을 클릭하여 진행할 수 있습니다. </div>
    </div>
    <!-- Step 2: 나머지 질문들 -->
    <div class="accordion-item">
      <button type="button" class="collapse-tit">Q. 비밀번호를 잊어버렸어요</button>
      <div class="collapse-content"> 로그인 페이지에서 '비밀번호 찾기'를 클릭하세요. </div>
    </div>
  </div>
</section>
```

## API / Props Reference

| Props / 속성       | Type   | Default  | Description                                        |
| ------------------ | ------ | -------- | -------------------------------------------------- |
| `data-props-type`  | string | multiple | 아코디언 동작 모드 (`multiple` 또는 `single`)      |
| `data-props-index` | number | 0        | 기본적으로 열릴 아이템의 인덱스 (0부터 시작)       |
| `data-state`       | string | -        | 개별 아이템의 초기 상태 (`open` 설정 시 열린 상태) |
