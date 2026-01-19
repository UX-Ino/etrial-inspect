# Checkbox

> Checkbox 컴포넌트는 사용자가 하나 이상의 옵션을 선택할 수 있는 입력 요소입니다. 독립적인 선택이 가능하며, 여러 항목을 동시에 선택할 수 있습니다.

```html
<!-- 기본 구조 예시 -->
<div class="component-input">
  <label class="checkbox-inner">
    <input type="checkbox" id="temp_checkbox_0001" name="temp_checkbox_0001" />
  </label>
</div>
```

## TL;DR

- **언제 사용하나요?** 여러 옵션 중 하나 이상을 선택해야 할 때, 독립적인 선택이 필요할 때, 동의/약관 체크가 필요할 때 사용합니다.
- **핵심 역할**: 사용자가 여러 항목을 독립적으로 선택/해제할 수 있으며, 전체 동의 기능을 통해 하위 항목을 일괄 제어할 수 있습니다.
- **주요 클래스/속성**: `.component-input`, `.checkbox-inner`, `.checkbox-txt`, `data-props-all-check`, `data-props-sub-check`

## 기본 마크업

### 필수 구조

- `.component-input`: 최상위 래퍼 (input.js 동작을 위해 반드시 필요)
- `.checkbox-inner`: 체크박스 레이블 요소
- `input[type="checkbox"]`: 실제 체크박스 입력 요소
- `.checkbox-item`: 체크박스와 텍스트를 감싸는 컨테이너 (텍스트가 있는 경우)
- `.checkbox-txt`: 체크박스 옆에 표시되는 텍스트

### 필수 속성

- `id`: 체크박스 고유 식별자
- `name`: 그룹화를 위한 이름 속성
- `checked`: 선택 상태 (선택 사항)
- `disabled`: 비활성 상태 (선택 사항)
- `data-props-all-check="true"`: 전체 선택 기능 활성화 (Agreement 패턴)
- `data-props-sub-check="true"`: 서브 체크박스 연동 기능 활성화 (Agreement 패턴)

> **TIP**: 기본 체크박스는 `.component-input` 클래스가 없으면 input.js 스크립트가 적용되지 않습니다.

## 접근성 (Accessibility)

- `<label>` 요소를 사용하여 체크박스와 텍스트를 연결합니다.
- `id`와 `for` 속성을 통해 레이블과 입력 요소를 명확히 연결합니다.
- `disabled` 상태일 때 시각적 피드백과 함께 키보드 접근을 차단합니다.
- 충분한 클릭 영역을 제공하여 터치 인터페이스에서도 쉽게 선택할 수 있도록 합니다.
- 포커스 스타일을 명확히 표시하여 키보드 탐색 시 현재 위치를 알 수 있도록 합니다.

## 구현 가이드

### 공통 규칙

- 체크박스는 반드시 `.component-input` 클래스로 감싸야 합니다.
- 레이블은 `.checkbox-inner` 클래스를 사용합니다.
- 텍스트가 있는 경우 `.checkbox-item`과 `.checkbox-txt`를 사용합니다.
- `id`와 `name` 속성은 고유하게 지정하거나 그룹화 목적에 맞게 설정합니다.

### 클래스 & 상태 정의

| 클래스/속성                  | 용도                          | 비고                                    |
| ---------------------------- | ----------------------------- | --------------------------------------- |
| `.component-input`           | 체크박스 컴포넌트 래퍼        | input.js 동작을 위해 필수               |
| `.checkbox-inner`            | 체크박스 레이블               | 스타일 정의                             |
| `.checkbox-item`             | 체크박스와 텍스트 컨테이너    | 텍스트가 있는 경우 사용                 |
| `.checkbox-txt`              | 체크박스 텍스트               | 레이블 텍스트 표시                      |
| `.component-agreement`       | 전체 동의 컴포넌트 래퍼       | Agreement 패턴에서 사용                 |
| `data-props-all-check`       | 전체 선택 기능 활성화         | `true`로 설정 시 하위 항목 일괄 선택    |
| `data-props-sub-check`       | 서브 체크박스 연동 기능       | `true`로 설정 시 서브 항목 연동         |
| `checked`                    | 선택 상태                     | HTML 속성                               |
| `disabled`                   | 비활성 상태                   | HTML 속성                               |

### 자바스크립트 연동

- `input.js`가 `.component-input` 클래스를 기준으로 체크박스를 초기화합니다.
- `data-props-all-check="true"` 속성이 있는 경우, 해당 체크박스가 전체 선택/해제를 제어합니다.
- `data-props-sub-check="true"` 속성이 있는 경우, 하위 서브 체크박스와 연동됩니다.
- 전체 동의 체크박스 선택 시 하위 모든 체크박스가 자동으로 선택됩니다.
- 하위 체크박스를 모두 선택하면 전체 동의 체크박스도 자동으로 선택됩니다.

## 패턴 & 변형 (Variants)

> 각 변형은 "언제 사용해야 하는지"와 "기본 구조와 무엇이 다른지"를 함께 설명합니다.

### 기본 체크박스 (Default)

- 가장 간단한 형태의 체크박스
- 텍스트 없이 체크박스만 표시

```html
<!-- 기본 체크박스 -->
<div style="display: flex; gap: 20px; align-items: center;">
  <div class="component-input">
    <label class="checkbox-inner">
      <input type="checkbox" id="temp_checkbox_0001" name="temp_checkbox_0001" />
    </label>
  </div>
  <div class="component-input">
    <label class="checkbox-inner">
      <input type="checkbox" id="temp_checkbox_0002" name="temp_checkbox_0001" checked />
    </label>
  </div>
  <div class="component-input">
    <label class="checkbox-inner">
      <input type="checkbox" id="temp_checkbox_0003" name="temp_checkbox_0001" disabled />
    </label>
  </div>
  <div class="component-input">
    <label class="checkbox-inner">
      <input type="checkbox" id="temp_checkbox_0004" name="temp_checkbox_0001" checked disabled />
    </label>
  </div>
</div>
```

### 텍스트가 있는 체크박스 (With Text)

- 체크박스와 함께 설명 텍스트를 표시
- `.checkbox-item`과 `.checkbox-txt` 클래스 추가

```html
<!-- 텍스트가 있는 체크박스 -->
<div class="component-input">
  <label class="checkbox-inner">
    <input type="checkbox" id="temp_checkbox_0101" name="temp_checkbox_0100" />
    <span class="checkbox-item">
      <span class="checkbox-txt">Checkbox default</span>
    </span>
  </label>
</div>

<div class="component-input">
  <label class="checkbox-inner">
    <input type="checkbox" id="temp_checkbox_0102" name="temp_checkbox_0100" checked />
    <span class="checkbox-item">
      <span class="checkbox-txt">Checkbox checked</span>
    </span>
  </label>
</div>

<div class="component-input">
  <label class="checkbox-inner">
    <input type="checkbox" id="temp_checkbox_0103" name="temp_checkbox_0100" disabled />
    <span class="checkbox-item">
      <span class="checkbox-txt">Checkbox disabled</span>
    </span>
  </label>
</div>

<div class="component-input">
  <label class="checkbox-inner">
    <input type="checkbox" id="temp_checkbox_0104" name="temp_checkbox_0100" checked disabled />
    <span class="checkbox-item">
      <span class="checkbox-txt">Checkbox checked + disabled</span>
    </span>
  </label>
</div>
```

### 전체 동의 (Agreement)

- 약관 동의, 마케팅 수신 동의 등에 사용
- `.component-agreement` 래퍼 사용
- `data-props-all-check="true"`로 전체 선택 기능 활성화
- `data-props-sub-check="true"`로 서브 항목 연동 기능 활성화

```html
<!-- 전체 동의 체크박스 -->
<div class="component-agreement">
  <!-- S: 전체 동의하기 버튼 영역 -->
  <div class="component-input" data-props-all-check="true" data-props-sub-check="true">
    <div class="all-agree-item">
      <div class="component-input">
        <label class="checkbox-inner">
          <input type="checkbox" id="temp_checkbox_0101" name="temp_checkbox_0100" />
          <span class="checkbox-item">
            <span class="checkbox-txt">전체 동의하기</span>
          </span>
        </label>
      </div>
    </div>
    <!-- E: 전체 동의하기 버튼 영역 -->

    <!-- S: 동의하기 리스트 영역 -->
    <div class="agree-area">
      <div class="agree-item">
        <div class="component-input">
          <label class="checkbox-inner">
            <input type="checkbox" id="temp_checkbox_0102" name="temp_checkbox_0100" />
            <span class="checkbox-item">
              <span class="checkbox-txt">
                <span class="point-desc">[필수]</span>
                상품약관을 첫번째로 표시
              </span>
            </span>
          </label>
          <button class="btn-arrow">
            <span class="hide-txt">팝업 버튼</span>
          </button>
        </div>
      </div>

      <div class="agree-item sub-all-agree">
        <!-- S: 서브 전체 동의하기 영역 -->
        <div class="component-input">
          <label class="checkbox-inner">
            <input type="checkbox" id="temp_checkbox_0103" name="temp_checkbox_0100" />
            <span class="checkbox-item">
              <span class="checkbox-txt">[선택] 마케팅 정보 수신 동의</span>
            </span>
          </label>
          <button class="btn-arrow">
            <span class="hide-txt">팝업 버튼</span>
          </button>
        </div>
        <!-- E: 서브 전체 동의하기 영역 -->

        <!-- S: 서브 동의하기 리스트 영역 -->
        <div class="sub-agree-area">
          <div class="sub-agree-item">
            <div class="component-input small">
              <label class="checkbox-inner">
                <input type="checkbox" id="temp_checkbox_0104" name="temp_checkbox_0100" />
                <span class="checkbox-item">
                  <span class="checkbox-txt">전화</span>
                </span>
              </label>
            </div>
          </div>
          <div class="sub-agree-item">
            <div class="component-input small">
              <label class="checkbox-inner">
                <input type="checkbox" id="temp_checkbox_0105" name="temp_checkbox_0100" />
                <span class="checkbox-item">
                  <span class="checkbox-txt">문자(알림톡)</span>
                </span>
              </label>
            </div>
          </div>
        </div>
        <!-- E: 서브 동의하기 리스트 영역 -->
      </div>
    </div>
    <!-- E: 동의하기 리스트 영역 -->
  </div>
</div>
```

## 상세 예시 (Patterns)

### 폼 내 체크박스 그룹

여러 개의 체크박스를 그룹으로 묶어 사용하는 경우:

```html
<fieldset>
  <legend>관심 분야 선택</legend>
  <div class="component-input">
    <label class="checkbox-inner">
      <input type="checkbox" id="interest_tech" name="interests" value="tech" />
      <span class="checkbox-item">
        <span class="checkbox-txt">기술</span>
      </span>
    </label>
  </div>
  <div class="component-input">
    <label class="checkbox-inner">
      <input type="checkbox" id="interest_design" name="interests" value="design" />
      <span class="checkbox-item">
        <span class="checkbox-txt">디자인</span>
      </span>
    </label>
  </div>
  <div class="component-input">
    <label class="checkbox-inner">
      <input type="checkbox" id="interest_business" name="interests" value="business" />
      <span class="checkbox-item">
        <span class="checkbox-txt">비즈니스</span>
      </span>
    </label>
  </div>
</fieldset>
```

## API / Props Reference

| Props / 속성           | Type    | Default | Description                                      |
| ---------------------- | ------- | ------- | ------------------------------------------------ |
| `data-props-all-check` | boolean | false   | 전체 선택 기능 활성화 (Agreement 패턴)           |
| `data-props-sub-check` | boolean | false   | 서브 체크박스 연동 기능 활성화 (Agreement 패턴)  |
| `checked`              | boolean | false   | 체크박스 선택 상태                               |
| `disabled`             | boolean | false   | 체크박스 비활성 상태                             |
| `id`                   | string  | -       | 체크박스 고유 식별자 (필수)                      |
| `name`                 | string  | -       | 체크박스 그룹 이름 (필수)                        |
