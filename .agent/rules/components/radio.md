# Radio

> Radio 컴포넌트는 여러 옵션 중 하나만 선택할 수 있는 라디오 버튼을 제공하는 컴포넌트입니다. 상호 배타적인 선택지를 제공할 때 사용합니다.

```html
<!-- 기본 구조 예시 -->
<div class="component-input">
  <label class="radio-inner">
    <input type="radio" id="temp_radio_0001" name="temp_radio_0001" />
  </label>
</div>
```

## TL;DR

- **언제 사용하나요?** 여러 옵션 중 하나만 선택해야 하는 경우, 선택지가 2~7개 정도로 제한적일 때 사용합니다.
- **핵심 역할**: 상호 배타적인 선택지를 시각적으로 제공하고, 사용자가 하나의 옵션만 선택할 수 있도록 보장합니다.
- **주요 클래스/속성**: `.component-input`, `.radio-inner`, `.radio-item`, `.radio-txt`, `name` 속성 (그룹핑), `checked`, `disabled`

## 기본 마크업

### 필수 구조

- `.component-input`: 최상위 래퍼 (input.js 스크립트 연동을 위한 필수 클래스)
- `.radio-inner`: 라디오 버튼의 시각적 스타일을 정의하는 label 요소
- `input[type="radio"]`: 실제 라디오 입력 요소
- `.radio-item`: 텍스트와 함께 사용할 때 콘텐츠를 감싸는 요소 (선택)
- `.radio-txt`: 라디오 버튼과 함께 표시되는 텍스트 (선택)

### 필수 속성

- `type="radio"`: 라디오 버튼 타입 지정
- `name`: 같은 그룹의 라디오 버튼을 연결 (같은 name을 가진 버튼 중 하나만 선택 가능)
- `id`: 고유 식별자 (label과 연결 시 사용)
- `checked`: 기본 선택 상태 지정 (선택)
- `disabled`: 비활성 상태 지정 (선택)

> **TIP**: Radio 컴포넌트는 input.js의 동작을 위해 반드시 `.component-input` 클래스를 사용해야 합니다. 이 클래스가 없다면 스크립트가 적용되지 않습니다.

## 접근성 (Accessibility)

- 키보드 탐색: 화살표 키로 같은 그룹 내 라디오 버튼 간 이동이 가능해야 합니다.
- 포커스 스타일: `:focus-visible{outline: -webkit-focus-ring-color auto 1px;}`를 적용하여 키보드 포커스를 명확히 표시합니다.
- 스크린리더: `label` 요소를 사용하여 라디오 버튼의 목적을 명확히 전달합니다.
- 그룹핑: 관련된 라디오 버튼은 `<fieldset>`과 `<legend>`로 그룹화하는 것을 권장합니다.
- 비활성 상태: `disabled` 속성을 사용하여 비활성 상태를 명확히 표시합니다.

## 구현 가이드

### 공통 규칙

- Radio 컴포넌트는 반드시 `.component-input` 클래스를 최상위 래퍼로 사용해야 합니다.
- 추가적인 스타일이 필요할 경우, `.component-input` 내부에 `-inner` 접미사를 가진 클래스를 적용하여 스타일을 확장합니다.
- 같은 그룹의 라디오 버튼은 동일한 `name` 속성을 가져야 합니다.
- 각 라디오 버튼은 고유한 `id`를 가져야 합니다.

### 클래스 & 상태 정의

| 클래스/속성        | 용도                    | 비고                                      |
| ------------------ | ----------------------- | ----------------------------------------- |
| `.component-input` | 컴포넌트 최상위 래퍼    | input.js 스크립트 연동을 위한 필수 클래스 |
| `.radio-inner`     | 라디오 버튼 스타일 정의 | label 요소에 적용                         |
| `.radio-item`      | 텍스트 콘텐츠 래퍼      | 텍스트와 함께 사용 시                     |
| `.radio-txt`       | 라디오 버튼 텍스트      | 라벨 텍스트 스타일링                      |
| `checked`          | 선택 상태               | 기본 선택 항목 지정                       |
| `disabled`         | 비활성 상태             | 사용자 입력 차단                          |

### 자바스크립트 연동

- Radio 컴포넌트는 `input.js`를 통해 초기화됩니다.
- `.component-input` 클래스를 기준으로 컴포넌트를 인식하고 이벤트를 바인딩합니다.
- 네이티브 라디오 버튼의 동작을 기반으로 하므로 별도의 복잡한 상태 관리가 필요하지 않습니다.

## 패턴 & 변형 (Variants)

> 각 변형은 "언제 사용해야 하는지"와 "기본 구조와 무엇이 다른지"를 함께 설명합니다.

### 기본 Radio (Radio Only)

- 라디오 버튼만 표시하고 텍스트 레이블이 없는 경우
- 시각적으로 최소한의 공간만 차지하는 간결한 형태
- 외부에 별도의 레이블이나 설명이 있을 때 사용

```html
<!-- radio : 기본 -->
<div class="component-input">
  <label class="radio-inner">
    <input type="radio" id="temp_radio_0001" name="temp_radio_0001" />
  </label>
</div>
<br />
<div class="component-input">
  <label class="radio-inner">
    <input type="radio" id="temp_radio_0002" name="temp_radio_0001" checked />
  </label>
</div>
<br />
<div class="component-input">
  <label class="radio-inner">
    <input type="radio" id="temp_radio_0003" name="temp_radio_0001" disabled />
  </label>
</div>
<br />
<div class="component-input">
  <label class="radio-inner">
    <input type="radio" id="temp_radio_0101" name="temp_radio_0100" checked disabled />
  </label>
</div>
```

### Radio + Text

- 라디오 버튼과 함께 텍스트 레이블을 표시하는 경우
- 가장 일반적으로 사용되는 형태
- `.radio-item`과 `.radio-txt` 클래스를 추가하여 텍스트 영역을 구성

```html
<!-- radio : input + 텍스트 -->
<div class="component-input">
  <label class="radio-inner">
    <input type="radio" id="temp_radio_0201" name="temp_radio_0200" />
    <span class="radio-item">
      <span class="radio-txt">Radio default</span>
    </span>
  </label>
</div>
<br />
<br />
<div class="component-input">
  <label class="radio-inner">
    <input type="radio" id="temp_radio_0202" name="temp_radio_0200" checked />
    <span class="radio-item">
      <span class="radio-txt">Radio checked</span>
    </span>
  </label>
</div>
<br />
<br />
<div class="component-input">
  <label class="radio-inner">
    <input type="radio" id="temp_radio_0203" name="temp_radio_0200" disabled />
    <span class="radio-item">
      <span class="radio-txt">Radio disabled</span>
    </span>
  </label>
</div>
<br />
<br />
<div class="component-input">
  <label class="radio-inner">
    <input type="radio" id="temp_radio_0301" name="temp_radio_0300" checked disabled />
    <span class="radio-item">
      <span class="radio-txt">Radio checked + disabled</span>
    </span>
  </label>
</div>
```

## 상세 예시 (Patterns)

### Radio 그룹 (Fieldset)

- 여러 라디오 버튼을 의미적으로 그룹화할 때 사용
- `<fieldset>`과 `<legend>`를 사용하여 접근성을 향상

```html
<!-- 라디오 그룹 예시 -->
<fieldset>
  <legend>선호하는 연락 방법을 선택하세요</legend>
  <div class="component-input">
    <label class="radio-inner">
      <input type="radio" id="contact_email" name="contact_method" value="email" checked />
      <span class="radio-item">
        <span class="radio-txt">이메일</span>
      </span>
    </label>
  </div>
  <div class="component-input">
    <label class="radio-inner">
      <input type="radio" id="contact_phone" name="contact_method" value="phone" />
      <span class="radio-item">
        <span class="radio-txt">전화</span>
      </span>
    </label>
  </div>
  <div class="component-input">
    <label class="radio-inner">
      <input type="radio" id="contact_sms" name="contact_method" value="sms" />
      <span class="radio-item">
        <span class="radio-txt">문자 메시지</span>
      </span>
    </label>
  </div>
</fieldset>
```

## API / Props Reference

| Props / 속성 | Type    | Default | Description                    |
| ------------ | ------- | ------- | ------------------------------ |
| `name`       | string  | -       | 라디오 버튼 그룹 식별자 (필수) |
| `id`         | string  | -       | 고유 식별자 (필수)             |
| `value`      | string  | -       | 선택 시 전송될 값              |
| `checked`    | boolean | false   | 기본 선택 상태                 |
| `disabled`   | boolean | false   | 비활성 상태                    |
