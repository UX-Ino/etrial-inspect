# Select

> Select 컴포넌트는 드롭다운 목록에서 하나의 옵션을 선택할 수 있는 폼 컨트롤입니다.

```html
<div class="component-select">
  <select class="select-list" required>
    <option value="" selected disabled hidden>옵션을 선택해주세요.</option>
    <option value="value1">Option 1</option>
    <option value="value2">Option 2</option>
    <option value="value3">Option 3</option>
  </select>
</div>
```

## TL;DR

- **언제 사용하나요?** 여러 옵션 중 하나를 선택해야 할 때, 공간을 절약하면서 명확한 선택지를 제공해야 할 때 사용합니다.
- **핵심 역할**: 드롭다운 형태로 옵션 목록을 표시하고, 사용자가 하나의 값을 선택할 수 있도록 합니다.
- **주요 클래스/속성**: `.component-select`, `.select-list`, `.disabled`, `required`, `disabled` 속성

## 기본 마크업

### 필수 구조

- `.component-select`: 최상위 래퍼 (Select 컴포넌트의 컨테이너)
- `.select-list`: 실제 `<select>` 요소에 적용되는 클래스
- `<option>`: 선택 가능한 각 옵션 항목

### 필수 속성

- `required`: 필수 선택 항목임을 나타냄
- `disabled`: 비활성화 상태 (select 요소와 option 요소 모두 사용 가능)
- `selected`: 기본 선택 옵션 지정
- `hidden`: placeholder 역할의 option을 시각적으로 숨김
- `value`: 각 option의 값

> **TIP**: placeholder 역할의 첫 번째 option은 `value=""`, `selected`, `disabled`, `hidden` 속성을 모두 사용하여 구현합니다.

## 접근성 (Accessibility)

- 네이티브 `<select>` 요소를 사용하여 기본 키보드 탐색을 지원합니다.
- `required` 속성을 사용하여 필수 입력 필드임을 명시합니다.
- `disabled` 상태일 때는 `.disabled` 클래스를 래퍼에도 추가하여 시각적 피드백을 제공합니다.
- `<label>` 요소와 함께 사용하여 스크린리더 사용자에게 명확한 정보를 제공합니다.
- 충분한 색상 대비와 포커스 스타일을 제공하여 시각적 접근성을 보장합니다.

## 구현 가이드

### 공통 규칙

- `.component-select` 래퍼 안에 `.select-list` 클래스를 가진 `<select>` 요소를 배치합니다.
- placeholder 역할의 option은 반드시 `value=""`, `selected`, `disabled`, `hidden` 속성을 모두 포함해야 합니다.
- 비활성화 상태에서는 `<select>` 요소에 `disabled` 속성을 추가하고, 래퍼에 `.disabled` 클래스를 추가합니다.

### 클래스 & 상태 정의

| 클래스/속성         | 용도                 | 비고             |
| ------------------- | -------------------- | ---------------- |
| `.component-select` | Select 컴포넌트 래퍼 | 필수 클래스      |
| `.select-list`      | select 요소에 적용   | 필수 클래스      |
| `.disabled`         | 비활성화 상태 표시   | 래퍼에 적용      |
| `.type-brand`       | 브랜드 스타일 변형   | 선택적 사용      |
| `required`          | 필수 입력 필드       | select 요소 속성 |
| `disabled`          | 비활성화 상태        | select 요소 속성 |

### 자바스크립트 연동 (선택)

- 네이티브 `<select>` 요소를 사용하므로 기본적인 상호작용은 브라우저에서 자동으로 처리됩니다.
- 필요한 경우 `change` 이벤트를 통해 선택 값 변경을 감지하고 처리할 수 있습니다.
- 커스텀 스타일링이 필요한 경우 JavaScript로 커스텀 드롭다운을 구현할 수 있습니다.

## 패턴 & 변형 (Variants)

> 각 변형은 "언제 사용해야 하는지"와 "기본 구조와 무엇이 다른지"를 함께 설명합니다.

### 기본 Select

- 가장 기본적인 형태의 Select 컴포넌트
- placeholder 역할의 첫 번째 option 포함

```html
<div class="component-select">
  <select class="select-list" required>
    <option value="" selected disabled hidden>실행 ID를 선택해주세요.</option>
    <option value="value1">Option 1</option>
    <option value="value2">Option 2</option>
    <option value="value3">Option 3</option>
  </select>
</div>
```

### Disabled Select

- 사용자가 선택할 수 없는 비활성화 상태
- 래퍼에 `.disabled` 클래스 추가
- select 요소에 `disabled` 속성 추가

```html
<div class="component-select disabled">
  <select class="select-list" required disabled>
    <option value="" selected disabled hidden>비활성화 상태</option>
    <option value="value1">Option 1</option>
  </select>
</div>
```

### Select with Brand Type

- 브랜드별 스타일 변형
- `.type-brand` 클래스를 추가하여 특정 브랜드 스타일 적용

```html
<div class="component-select type-brand">
  <select class="select-list" required>
    <option value="" selected disabled hidden>하나증권</option>
    <option value="value1">Option 1</option>
    <option value="value2">Option 2</option>
  </select>
</div>
```

## 상세 예시 (Patterns)

### Label과 함께 사용

```html
<div class="form-field">
  <label for="select-example" class="form-label">옵션 선택</label>
  <div class="component-select">
    <select id="select-example" class="select-list" required>
      <option value="" selected disabled hidden>옵션을 선택해주세요.</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </select>
  </div>
</div>
```

### 그룹화된 옵션

```html
<div class="component-select">
  <select class="select-list" required>
    <option value="" selected disabled hidden>카테고리를 선택해주세요.</option>
    <optgroup label="과일">
      <option value="apple">사과</option>
      <option value="banana">바나나</option>
    </optgroup>
    <optgroup label="채소">
      <option value="carrot">당근</option>
      <option value="lettuce">상추</option>
    </optgroup>
  </select>
</div>
```

## API / Props Reference

| Props / 속성        | Type      | Default | Description                                   |
| ------------------- | --------- | ------- | --------------------------------------------- |
| `.component-select` | class     | -       | Select 컴포넌트의 최상위 래퍼 클래스          |
| `.select-list`      | class     | -       | select 요소에 적용되는 필수 클래스            |
| `.disabled`         | class     | -       | 비활성화 상태를 나타내는 클래스 (래퍼에 적용) |
| `.type-brand`       | class     | -       | 브랜드 스타일 변형 클래스                     |
| `required`          | attribute | -       | 필수 선택 항목임을 나타내는 속성              |
| `disabled`          | attribute | -       | select 요소를 비활성화하는 속성               |
