# Button

> 버튼 컴포넌트는 사용자의 동작(Action)을 트리거하는 데 사용됩니다. 폼 제출, 모달 열기, 데이터 저장 등의 작업에 사용하며, 페이지 이동이 필요한 경우에는 링크(`<a>`)를 사용합니다.

```html
<!-- 기본 구조 예시 -->
<button type="button" class="btn">
  <span class="btn-txt">Button</span>
</button>
```

## TL;DR

- **언제 사용하나요?** 폼 제출, 모달 열기/닫기, 데이터 저장, 삭제 등 사용자의 동작을 트리거할 때 사용합니다.
- **핵심 역할**: 사용자 인터랙션을 받아 특정 동작을 실행하며, 시각적 피드백(hover, active, disabled)을 제공합니다.
- **주요 클래스/속성**: `.btn` (기본), `.btn-txt` (텍스트 래퍼), `.btn-small` (크기), `.btn-gray`, `.btn-outline`, `.btn-white` (스타일 변형), `type` 속성 (button/submit)

## 기본 마크업

### 필수 구조

- `.btn`: 버튼 컴포넌트의 최상위 클래스 (button 또는 a 태그에 적용)
- `.btn-txt`: 버튼 텍스트를 감싸는 필수 요소
- 아이콘: 선택적으로 `.ico-*` 클래스를 사용하여 아이콘 추가 가능

### 필수 속성

- `type`: 버튼의 동작 타입을 명시 (`button`, `submit`)
  - `type="button"`: 일반 동작 (모달 열기, 데이터 처리 등)
  - `type="submit"`: 폼 제출 (기본값이므로 폼 내부에서는 주의)
- `disabled`: 버튼 비활성화 상태
- `aria-*`: 접근성 속성 (필요시 추가)

> **TIP**: `<button>` 요소의 기본 타입은 `submit`입니다. 폼 내부에서 의도치 않은 제출을 방지하려면 반드시 `type="button"`을 명시하세요.

## 접근성 (Accessibility)

- 비활성 상태(`disabled`)는 시각적으로 명확히 구분되어야 합니다.
- 동작(Action)을 수행하는 경우: `<button>` 사용
- 페이지 이동(Navigation)하는 경우: `<a>` 사용
- 자세한 접근성 가이드는 [접근성 가이드](/guide/components/accessibility)를 참고하세요.

## 구현 가이드

### 공통 규칙

- 버튼 텍스트는 반드시 `.btn-txt` 클래스로 감싸야 합니다.
- 모든 `<button>` 요소에는 `type` 속성을 명시해야 합니다.
- 아이콘은 장식적 요소이므로 `aria-hidden="true"`를 추가합니다.
- 페이지 이동이 필요한 경우 `<a>` 태그에 `.btn` 클래스를 적용합니다.

### 클래스 & 상태 정의

| 클래스/속성    | 용도                      | 비고                         |
| -------------- | ------------------------- | ---------------------------- |
| `.btn`         | 기본 버튼 스타일          | 필수 클래스                  |
| `.btn-txt`     | 버튼 텍스트 래퍼          | 필수 요소                    |
| `.btn-small`   | 작은 크기 버튼            | 크기 변형                    |
| `.btn-gray`    | 회색 스타일 버튼          | 스타일 변형                  |
| `.btn-outline` | 외곽선 스타일 버튼        | 스타일 변형                  |
| `.btn-white`   | 흰색 스타일 버튼          | 스타일 변형                  |
| `.btn-full`    | 전체 너비 버튼            | 버튼 그룹 내에서 사용        |
| `disabled`     | 비활성 상태               | 접근성 및 시각적 피드백 제공 |
| `type`         | 버튼 타입 (button/submit) | 필수 속성, 기본값은 submit   |

## 패턴 & 변형 (Variants)

> 각 변형은 "언제 사용해야 하는지"와 "기본 구조와 무엇이 다른지"를 함께 설명합니다.

### 기본 버튼

기본 스타일의 버튼입니다. 주요 동작(Primary Action)에 사용합니다.

```html
<!-- 기본 -->
<button type="button" class="btn">
  <span class="btn-txt">Button</span>
</button>

<!-- 작은 크기 -->
<button type="button" class="btn btn-small">
  <span class="btn-txt">Button</span>
</button>
```

### 아이콘 포함 버튼

아이콘과 텍스트를 함께 표시하여 버튼의 의미를 강화합니다.

```html
<!-- 아이콘 + 텍스트 -->
<button type="button" class="btn">
  <i class="ico-search-white ico-normal" aria-hidden="true"></i>
  <span class="btn-txt">Button</span>
</button>

<!-- 작은 크기 + 아이콘 -->
<button type="button" class="btn btn-small">
  <i class="ico-search-white ico-normal" aria-hidden="true"></i>
  <span class="btn-txt">Button</span>
</button>
```

### 스타일 변형

다양한 시각적 스타일을 제공하여 버튼의 중요도와 맥락을 구분합니다.

```html
<!-- Gray -->
<button type="button" class="btn btn-gray">
  <span class="btn-txt">Button</span>
</button>

<!-- Outline -->
<button type="button" class="btn btn-outline">
  <span class="btn-txt">Button</span>
</button>

<!-- White -->
<button type="button" class="btn btn-white">
  <i class="ico-search ico-normal" aria-hidden="true"></i>
  <span class="btn-txt">Button</span>
</button>
```

### 비활성 상태

사용자가 현재 사용할 수 없는 버튼을 표시합니다.

```html
<!-- Disabled -->
<button type="button" class="btn" disabled>
  <span class="btn-txt">Button</span>
</button>
```

### 버튼 스타일 링크

페이지 이동이 필요한 경우 `<a>` 태그에 `.btn` 클래스를 적용하여 버튼처럼 스타일링할 수 있습니다.

```html
<!-- 기본 링크 버튼 -->
<a href="/page" class="btn">
  <span class="btn-txt">링크 버튼</span>
</a>

<!-- 스타일 적용 -->
<a href="/page" class="btn btn-outline">
  <span class="btn-txt">링크 버튼</span>
</a>

<!-- 아이콘 + 텍스트 -->
<a href="/search" class="btn">
  <i class="ico-search ico-normal" aria-hidden="true"></i>
  <span class="btn-txt">검색하기</span>
</a>

<!-- 양쪽 아이콘 -->
<a href="/refresh" class="btn">
  <i class="ico-search ico-normal" aria-hidden="true"></i>
  <span class="btn-txt">새로고침</span>
  <i class="ico-refresh ico-normal" aria-hidden="true"></i>
</a>
```

## 상세 예시 (Patterns)

### 버튼 그룹 - 가운데 정렬

여러 버튼을 가운데 정렬하여 그룹으로 표시합니다.

```html
<div class="component-btns">
  <div class="btns-row">
    <button type="button" class="btn">
      <span class="btn-txt">Button</span>
    </button>
    <button type="button" class="btn">
      <span class="btn-txt">Button</span>
    </button>
  </div>
</div>
```

### 버튼 그룹 - 왼쪽 정렬

여러 버튼을 왼쪽 정렬하여 그룹으로 표시합니다.

```html
<div class="component-btns">
  <div class="btns-row align-left">
    <button type="button" class="btn">
      <span class="btn-txt">Button</span>
    </button>
    <button type="button" class="btn">
      <span class="btn-txt">Button</span>
    </button>
  </div>
</div>
```

### 버튼 그룹 - 오른쪽 정렬

여러 버튼을 오른쪽 정렬하여 그룹으로 표시합니다.

```html
<div class="component-btns">
  <div class="btns-row align-right">
    <button type="button" class="btn">
      <span class="btn-txt">Button</span>
    </button>
    <button type="button" class="btn">
      <span class="btn-txt">Button</span>
    </button>
  </div>
</div>
```

### 버튼 그룹 - 양쪽 정렬

버튼을 양쪽으로 분리하여 배치합니다. 주로 확인/취소 버튼과 추가 동작 버튼을 구분할 때 사용합니다.

```html
<div class="component-btns">
  <div class="btns-row two-col">
    <div class="btns-col-1">
      <button type="button" class="btn">
        <span class="btn-txt">확인</span>
      </button>
      <button type="button" class="btn">
        <span class="btn-txt">취소</span>
      </button>
    </div>
    <div class="btns-col-2 align-right">
      <button type="button" class="btn">
        <span class="btn-txt">저장</span>
      </button>
    </div>
  </div>
</div>
```

### 버튼 그룹 - 3단 레이아웃 균등 정렬

세 개의 버튼을 균등한 너비로 배치합니다.

```html
<div class="component-btns">
  <div class="btns-row three-col">
    <div class="btns-col-1">
      <button type="button" class="btn btn-full">
        <span class="btn-txt">Button</span>
      </button>
    </div>
    <div class="btns-col-2">
      <button type="button" class="btn btn-full">
        <span class="btn-txt">Button</span>
      </button>
    </div>
    <div class="btns-col-3">
      <button type="button" class="btn btn-full">
        <span class="btn-txt">Button</span>
      </button>
    </div>
  </div>
</div>
```

## API / Props Reference

| Props / 속성      | Type    | Default | Description                            |
| ----------------- | ------- | ------- | -------------------------------------- |
| `type`            | string  | submit  | 버튼 타입 (button, submit)             |
| `disabled`        | boolean | false   | 버튼 비활성화 상태                     |
| `.btn-small`      | class   | -       | 작은 크기 버튼 스타일                  |
| `.btn-gray`       | class   | -       | 회색 스타일 버튼                       |
| `.btn-outline`    | class   | -       | 외곽선 스타일 버튼                     |
| `.btn-white`      | class   | -       | 흰색 스타일 버튼                       |
| `.btn-full`       | class   | -       | 전체 너비 버튼 (버튼 그룹 내에서 사용) |
| `.component-btns` | class   | -       | 버튼 그룹 컨테이너                     |
| `.btns-row`       | class   | -       | 버튼 행 래퍼 (정렬 클래스와 함께 사용) |
| `.align-left`     | class   | -       | 왼쪽 정렬                              |
| `.align-right`    | class   | -       | 오른쪽 정렬                            |
| `.two-col`        | class   | -       | 2단 레이아웃 (양쪽 정렬)               |
| `.three-col`      | class   | -       | 3단 레이아웃 (균등 정렬)               |
