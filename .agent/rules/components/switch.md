# Switch

> Switch 컴포넌트는 ON/OFF 상태를 토글할 수 있는 입력 요소입니다. 사용자가 설정을 즉시 활성화하거나 비활성화할 수 있으며, 변경 사항이 즉시 적용되는 상황에 적합합니다.

```html
<!-- 기본 구조 예시 -->
<div class="component-input">
  <label class="switch-inner">
    <input type="checkbox" id="temp_switch_0001" name="temp_switch_0001" aria-label="스위치 제목" />
    <span class="switch-item">
      <span class="switch-handle"></span>
    </span>
  </label>
</div>
```

## TL;DR

- **언제 사용하나요?** 설정을 즉시 활성화/비활성화해야 하는 경우, 변경 사항이 즉시 적용되어야 하는 상황에서 사용합니다.
- **핵심 역할**: ON/OFF 상태를 토글하여 사용자 설정을 즉시 반영하는 입력 요소입니다.
- **주요 클래스/속성**: `.component-input`, `.switch-inner`, `.switch-item`, `.switch-handle`, `aria-label`

## 기본 마크업

### 필수 구조

- `.component-input`: 최상위 래퍼 (input.js 동작을 위해 필수)
- `.switch-inner`: 스위치 컨테이너 역할을 하는 `<label>` 요소
- `input[type="checkbox"]`: 실제 입력 요소 (시각적으로는 숨겨지고 토글 스위치로 표현됨)
- `.switch-item`: 스위치의 시각적 표현을 감싸는 요소
- `.switch-handle`: 토글 핸들 (슬라이더)

### 필수 속성

- `aria-label`: 레이블이 시각적으로 표시되지 않는 경우 반드시 추가 (스크린리더 지원)
- `id`, `name`: 폼 제출 및 레이블 연결을 위한 표준 속성
- `checked`: 초기 ON 상태를 지정할 때 사용
- `disabled`: 비활성 상태를 지정할 때 사용

> **TIP**: Switch는 내부적으로 `type="checkbox"`를 사용하지만, 시각적으로는 토글 스위치 형태로 표현됩니다. `.component-input` 클래스가 없으면 스크립트가 적용되지 않습니다.

## 접근성 (Accessibility)

- 레이블이 시각적으로 표시되지 않는 경우 반드시 `aria-label="스위치 제목"` 속성을 추가해야 합니다.
- 스위치의 현재 상태(ON/OFF)가 명확하게 전달되어야 합니다.
- 키보드 탐색(Space, Enter)을 통해 스위치를 토글할 수 있어야 합니다.
- 포커스 스타일이 충분한 대비를 제공하는지 확인합니다.

## 구현 가이드

### 공통 규칙

- Switch 컴포넌트는 input.js의 동작을 위해 반드시 `.component-input` 클래스를 사용합니다.
- `.switch-inner` 클래스를 사용하여 스위치 스타일을 정의합니다.
- 레이블이 있는 경우 `.switch-label` 클래스를 사용합니다.
- ON/OFF 텍스트를 표시하는 경우 `.switch-txts` 컨테이너를 사용하며, `aria-hidden="true"` 속성을 추가합니다.

### 클래스 & 상태 정의

| 클래스/속성      | 용도                    | 비고                                 |
| ---------------- | ----------------------- | ------------------------------------ |
| `.switch-inner`  | 스위치 컨테이너 (label) | 필수 클래스                          |
| `.switch-item`   | 스위치 시각적 표현 영역 | 필수 클래스                          |
| `.switch-handle` | 토글 핸들 (슬라이더)    | 필수 클래스                          |
| `.switch-label`  | 스위치 레이블 텍스트    | 선택 사항                            |
| `.switch-txts`   | ON/OFF 텍스트 컨테이너  | 선택 사항, `aria-hidden="true"` 필수 |
| `checked`        | 초기 ON 상태            | HTML 표준 속성                       |
| `disabled`       | 비활성 상태             | HTML 표준 속성                       |

### 자바스크립트 연동

- Switch 컴포넌트는 input.js를 통해 초기화됩니다.
- `.component-input` 클래스를 기준으로 자동 초기화됩니다.
- 사용자가 스위치를 클릭하면 `checked` 상태가 토글되며, 변경 사항이 즉시 적용됩니다.

## 패턴 & 변형 (Variants)

> 각 변형은 "언제 사용해야 하는지"와 "기본 구조와 무엇이 다른지"를 함께 설명합니다.

### 기본 Switch

- 레이블 없이 스위치만 표시하는 가장 간결한 형태입니다.
- 반드시 `aria-label` 속성을 추가하여 접근성을 보장해야 합니다.

```html
<div class="component-input">
  <label class="switch-inner">
    <input type="checkbox" id="temp_switch_0001" name="temp_switch_0001" aria-label="스위치 제목" />
    <span class="switch-item">
      <span class="switch-handle"></span>
    </span>
  </label>
</div>
```

### Switch + ON/OFF 텍스트

- 스위치 내부에 ON/OFF 텍스트를 표시하여 현재 상태를 시각적으로 명확하게 전달합니다.
- `.switch-txts` 컨테이너를 추가하고 `aria-hidden="true"` 속성을 설정합니다.

```html
<div class="component-input">
  <label class="switch-inner">
    <input type="checkbox" id="temp_switch_0002" name="temp_switch_0001" aria-label="스위치 제목" />
    <span class="switch-item">
      <span class="switch-handle"></span>
      <div class="switch-txts" aria-hidden="true">
        <span class="txt">ON</span>
        <span class="txt">OFF</span>
      </div>
    </span>
  </label>
</div>
```

### Switch + Label

- 스위치 옆에 레이블 텍스트를 표시합니다.
- `.switch-label` 클래스를 사용하며, 레이블이 있는 경우 `aria-label` 속성은 생략할 수 있습니다.

```html
<div class="component-input">
  <label class="switch-inner">
    <span class="switch-label">스위치 제목</span>
    <input type="checkbox" id="temp_switch_0003" name="temp_switch_0001" />
    <span class="switch-item">
      <span class="switch-handle"></span>
    </span>
  </label>
</div>
```

## 상세 예시 (Patterns)

### Checked 상태

- 초기 상태를 ON으로 설정하려면 `checked` 속성을 추가합니다.

```html
<div class="component-input">
  <label class="switch-inner">
    <span class="switch-label">checked</span>
    <input type="checkbox" id="temp_switch_0101" name="temp_switch_0100" checked />
    <span class="switch-item">
      <span class="switch-handle"></span>
    </span>
  </label>
</div>
```

### Disabled 상태

- 스위치를 비활성화하려면 `disabled` 속성을 추가합니다.

```html
<div class="component-input">
  <label class="switch-inner">
    <span class="switch-label">disabled</span>
    <input type="checkbox" id="temp_switch_0102" name="temp_switch_0100" disabled />
    <span class="switch-item">
      <span class="switch-handle"></span>
    </span>
  </label>
</div>
```

### Checked + Disabled 상태

- ON 상태이면서 비활성화된 스위치입니다.

```html
<div class="component-input">
  <label class="switch-inner">
    <span class="switch-label">checked + disabled</span>
    <input type="checkbox" id="temp_switch_0103" name="temp_switch_0100" checked disabled />
    <span class="switch-item">
      <span class="switch-handle"></span>
    </span>
  </label>
</div>
```

## API / Props Reference

| Props / 속성 | Type    | Default | Description                                      |
| ------------ | ------- | ------- | ------------------------------------------------ |
| `checked`    | boolean | false   | 초기 ON 상태 지정                                |
| `disabled`   | boolean | false   | 비활성 상태 지정                                 |
| `id`         | string  | -       | 입력 요소의 고유 식별자 (필수)                   |
| `name`       | string  | -       | 폼 제출 시 사용되는 이름 (필수)                  |
| `aria-label` | string  | -       | 레이블이 없는 경우 스크린리더를 위한 설명 (필수) |

## Checkbox와의 차이점

| 구분            | Checkbox                    | Switch           |
| --------------- | --------------------------- | ---------------- |
| **용도**        | 여러 항목 중 하나 이상 선택 | ON/OFF 상태 토글 |
| **시각적 표현** | 체크박스 형태               | 토글 스위치 형태 |
| **클래스**      | `checkbox-inner`            | `switch-inner`   |
| **즉시 적용**   | 일반적으로 제출 필요        | 즉시 적용        |
