# Form

> Form 컴포넌트는 사용자 입력을 수집하기 위한 폼 요소들의 집합을 제공합니다. 레이블, 입력 필드, 버튼 등을 조합하여 다양한 입력 패턴을 구성할 수 있습니다.

```html
<!-- 기본 구조 예시 -->
<div class="component-form">
  <div class="form-element">
    <label for="input_id" class="input-label">
      <span class="label-txt">레이블</span>
    </label>
    <div class="form-group">
      <div class="component-input">
        <div class="input-field">
          <input type="text" id="input_id" placeholder="입력해주세요" />
        </div>
      </div>
    </div>
  </div>
</div>
```

## TL;DR

- **언제 사용하나요?** 사용자로부터 정보를 입력받아야 할 때, 로그인/회원가입/설정 등 다양한 입력 폼이 필요한 경우에 사용합니다.
- **핵심 역할**: 레이블과 입력 필드를 연결하고, 필수/선택 표시, 유효성 검증 피드백, 다양한 입력 조합(셀렉트, 버튼 등)을 제공합니다.
- **주요 클래스/속성**: `.component-form`, `.form-element`, `.form-group`, `.input-label`, `.ico-required-mark`

## 기본 마크업

### 필수 구조

- `.component-form`: 최상위 폼 컨테이너
- `.form-element`: 하나의 입력 단위 (레이블 + 입력 필드)
- `.input-label`: 입력 필드의 레이블
- `.label-txt`: 레이블 텍스트를 감싸는 요소
- `.form-group`: 입력 필드와 관련 요소들을 그룹화
- `.component-input`: 입력 필드 컴포넌트 래퍼
- `.input-field`: 실제 입력 요소를 감싸는 컨테이너

### 필수 속성

- `for`: 레이블과 입력 필드를 연결하는 ID 참조
- `id`: 입력 필드의 고유 식별자
- `type`: 입력 필드의 타입 (text, password, tel 등)
- `placeholder`: 입력 필드의 안내 텍스트
- `aria-label`: 필수 표시 아이콘의 접근성 레이블

> **TIP**: 필수 입력 필드는 `.ico-required-mark`를 사용하여 시각적으로 표시하고, `aria-label="필수"`로 접근성을 보장합니다.

## 접근성 (Accessibility)

- 모든 입력 필드는 `<label>` 요소와 `for`/`id` 속성으로 명확히 연결되어야 합니다.
- 필수 입력 필드는 시각적 표시(\*)와 함께 `aria-label` 또는 `aria-required` 속성을 제공합니다.
- 에러 메시지는 `aria-describedby`를 통해 입력 필드와 연결하여 스크린리더가 읽을 수 있도록 합니다.
- 키보드만으로 모든 입력 필드와 버튼에 접근하고 조작할 수 있어야 합니다.
- 포커스 스타일이 충분한 대비를 제공하는지 확인합니다.

## 구현 가이드

### 공통 규칙

- 레이블은 항상 입력 필드보다 먼저 배치합니다.
- 필수 입력 필드는 `.ico-required-mark`를 레이블 내부에 포함합니다.
- 입력 필드와 버튼을 조합할 때는 `.form-group` 내에서 배치합니다.
- 여러 입력 필드를 나란히 배치할 때는 `.bar` 클래스로 구분선을 추가할 수 있습니다.

### 클래스 & 상태 정의

| 클래스/속성          | 용도                         | 비고                              |
| -------------------- | ---------------------------- | --------------------------------- |
| `.component-form`    | 폼 컨테이너                  | 최상위 래퍼                       |
| `.form-element`      | 입력 단위                    | 레이블 + 입력 필드 그룹           |
| `.form-group`        | 입력 요소 그룹               | 입력 필드, 버튼, 셀렉트 등을 포함 |
| `.input-label`       | 레이블                       | `for` 속성으로 입력 필드와 연결   |
| `.label-txt`         | 레이블 텍스트                | 필수 표시 아이콘을 포함           |
| `.ico-required-mark` | 필수 표시 아이콘             | `aria-label="필수"` 필수          |
| `.btn-confirm`       | 확인/인증 버튼               | 입력 필드와 함께 사용             |
| `.bar`               | 구분선                       | 여러 입력 필드 사이에 배치        |
| `.type-time`         | 타이머 표시                  | 인증번호 입력 시 사용             |
| `.resident-number`   | 주민등록번호 뒷자리 컨테이너 | 일부 숫자 숨김 처리               |
| `.hidden-list`       | 숨겨진 숫자 리스트           | 주민등록번호 뒷자리 마스킹        |

### 자바스크립트 연동 (선택)

- 입력 필드 유효성 검증 시 에러 상태 클래스를 추가하여 시각적 피드백을 제공합니다.
- 인증번호 타이머는 JavaScript로 카운트다운을 구현하고 `.type-time` 요소에 업데이트합니다.
- 주민등록번호 뒷자리는 첫 자리 입력 후 나머지를 자동으로 마스킹 처리합니다.
- 우편번호 찾기 버튼은 외부 API 또는 모달을 호출하여 주소를 입력받습니다.

## 패턴 & 변형 (Variants)

> 각 변형은 실제 사용 시나리오에 맞춰 입력 필드, 셀렉트, 버튼 등을 조합한 패턴입니다.

### 기본 입력 필드

- 가장 간단한 형태의 입력 필드
- 레이블 + 입력 필드로 구성

```html
<div class="component-form">
  <!-- 아이디 -->
  <div class="form-element">
    <label for="temp_input_0001" class="input-label">
      <span class="label-txt">
        <i class="ico-required-mark" role="img" aria-label="필수">*</i>
        아이디
      </span>
    </label>
    <div class="form-group">
      <div class="component-input">
        <div class="input-field">
          <input type="text" id="temp_input_0001" placeholder="아이디를 입력해주세요." />
        </div>
      </div>
    </div>
  </div>

  <!-- 비밀번호 -->
  <div class="form-element">
    <label for="temp_input_0002" class="input-label">
      <span class="label-txt">
        <i class="ico-required-mark" role="img" aria-label="필수">*</i>
        비밀번호
      </span>
    </label>
    <div class="form-group">
      <div class="component-input">
        <div class="input-field">
          <input type="password" id="temp_input_0002" placeholder="비밀번호를 입력해주세요." />
        </div>
      </div>
    </div>
  </div>
</div>
```

### 셀렉트 + 입력 필드 (Type 01)

- 통신사 선택 + 휴대폰 번호 입력
- 셀렉트와 입력 필드를 `.form-group` 내에서 조합

```html
<div class="component-form">
  <!-- 휴대폰번호(type01) -->
  <div class="form-element">
    <label for="temp_input_0003" class="input-label">
      <span class="label-txt">휴대폰 번호(type01)</span>
    </label>
    <div class="form-group">
      <div class="component-select">
        <select class="select-list" required>
          <option value="" selected hidden>통신사</option>
          <option value="value1">Option 1</option>
          <option value="value2">Option 2</option>
          <option value="value3">Option 3</option>
        </select>
      </div>
      <div class="component-input">
        <div class="input-field">
          <input type="text" id="temp_input_0003" placeholder="'-' 제외하고 숫자만 입력해주세요" />
        </div>
      </div>
    </div>
  </div>
</div>
```

### 입력 필드 + 버튼 (Type 02)

- 휴대폰 번호 입력 + 인증 버튼
- 입력 필드와 버튼을 `.form-group` 내에서 조합

```html
<div class="component-form">
  <!-- 휴대폰번호(type02) -->
  <div class="form-element">
    <label for="temp_input_0004" class="input-label">
      <span class="label-txt">휴대폰번호(type02)</span>
    </label>
    <div class="form-group">
      <div class="component-select">
        <select class="select-list" required>
          <option value="" selected hidden>통신사</option>
          <option value="value1">Option 1</option>
          <option value="value2">Option 2</option>
        </select>
      </div>
      <div class="component-input">
        <div class="input-field">
          <input type="text" id="temp_input_0004" placeholder="휴대폰 번호를 입력해주세요." />
        </div>
      </div>
      <button class="btn-confirm">
        <span class="btn-txt">인증</span>
      </button>
    </div>
  </div>
</div>
```

### 입력 필드 + 재전송 버튼 (Type 03)

- 휴대폰 번호 입력 + 재전송 버튼 (비활성 상태)
- 버튼의 `disabled` 속성으로 비활성 상태 표시

```html
<div class="component-form">
  <!-- 휴대폰번호(type03) -->
  <div class="form-element">
    <label for="temp_input_0005" class="input-label">
      <span class="label-txt">
        <i class="ico-required-mark" role="img" aria-label="필수">*</i>
        휴대폰번호(type03)
      </span>
    </label>
    <div class="form-group">
      <div class="component-input">
        <div class="input-field">
          <input type="text" id="temp_input_0005" placeholder="휴대폰 번호를 입력해주세요." />
        </div>
      </div>
      <button class="btn-confirm" disabled>
        <span class="btn-txt">재전송</span>
      </button>
    </div>
  </div>
</div>
```

### 분할 입력 필드 (Type 04)

- 휴대폰 번호를 3개 필드로 분할 입력
- `.bar` 클래스로 필드 사이에 구분선 추가

```html
<div class="component-form">
  <!-- 휴대폰번호(type04) -->
  <div class="form-element">
    <label for="temp_input_0006" class="input-label">
      <span class="label-txt">휴대폰번호(type04)</span>
    </label>
    <div class="form-group">
      <div class="component-input">
        <div class="input-field">
          <input type="text" id="temp_input_0006" placeholder="010" />
        </div>
      </div>
      <div class="bar"></div>
      <div class="component-input">
        <div class="input-field">
          <input type="text" id="temp_input_0007" placeholder="1234" />
        </div>
      </div>
      <div class="bar"></div>
      <div class="component-input">
        <div class="input-field">
          <input type="text" id="temp_input_0008" placeholder="5678" />
        </div>
      </div>
    </div>
  </div>
</div>
```

### 주민등록번호 입력

- 앞 6자리 + 뒷자리 첫 번째 숫자 입력 + 나머지 숫자 마스킹
- `.resident-number` 컨테이너로 뒷자리 처리
- `.hidden-list`로 마스킹된 숫자 표시

```html
<div class="component-form">
  <!-- 주민등록번호 -->
  <div class="form-element">
    <label for="temp_input_0009" class="input-label">
      <span class="label-txt">주민등록번호</span>
    </label>
    <div class="form-group">
      <div class="component-input">
        <div class="input-field">
          <input type="text" id="temp_input_0009" placeholder="앞 6자리" />
        </div>
      </div>
      <div class="bar"></div>
      <div class="resident-number">
        <div class="component-input resident-input">
          <div class="input-field">
            <input type="text" id="temp_input_0010" maxlength="1" />
          </div>
        </div>
        <ul class="hidden-list">
          <li class="hiddeb-num">
            <span class="hide-txt">hidden-number</span>
          </li>
          <li class="hiddeb-num">
            <span class="hide-txt">hidden-number</span>
          </li>
          <li class="hiddeb-num">
            <span class="hide-txt">hidden-number</span>
          </li>
          <li class="hiddeb-num">
            <span class="hide-txt">hidden-number</span>
          </li>
          <li class="hiddeb-num">
            <span class="hide-txt">hidden-number</span>
          </li>
          <li class="hiddeb-num">
            <span class="hide-txt">hidden-number</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
```

### 주소 입력 + 우편번호 찾기

- 주소 입력 필드 + 우편번호 찾기 버튼
- 버튼 클릭 시 외부 API 또는 모달 호출

```html
<div class="component-form">
  <!-- 주소 -->
  <div class="form-element">
    <label for="temp_input_0011" class="input-label">
      <span class="label-txt">
        <i class="ico-required-mark" role="img" aria-label="필수">*</i>
        주소
      </span>
    </label>
    <div class="form-group">
      <div class="component-input">
        <div class="input-field">
          <input type="text" id="temp_input_0011" />
        </div>
      </div>
      <button class="btn-confirm">
        <span class="btn-txt">우편번호찾기</span>
      </button>
    </div>
  </div>
</div>
```

### 인증번호 입력 + 타이머

- 인증번호 입력 필드 + 타이머 표시 + 재전송 버튼
- `.type-time` 클래스로 타이머 표시

```html
<div class="component-form">
  <!-- 인증번호 -->
  <div class="form-element">
    <label for="temp_input_0012" class="input-label">
      <span class="label-txt">
        <i class="ico-required-mark" role="img" aria-label="필수">*</i>
        인증번호
      </span>
    </label>
    <div class="form-group">
      <div class="component-input">
        <div class="input-field">
          <input type="text" id="temp_input_0012" />
          <span class="type-time">01:22</span>
        </div>
      </div>
      <button class="btn-confirm">
        <span class="btn-txt">재전송</span>
      </button>
    </div>
  </div>
</div>
```

## API / Props Reference

| Props / 속성       | Type    | Default | Description                                    |
| ------------------ | ------- | ------- | ---------------------------------------------- |
| `for`              | string  | -       | 레이블과 연결할 입력 필드의 ID                 |
| `id`               | string  | -       | 입력 필드의 고유 식별자                        |
| `type`             | string  | text    | 입력 필드 타입 (text, password, tel, email 등) |
| `placeholder`      | string  | -       | 입력 필드의 안내 텍스트                        |
| `required`         | boolean | false   | 필수 입력 여부                                 |
| `disabled`         | boolean | false   | 비활성 상태 여부                               |
| `maxlength`        | number  | -       | 최대 입력 가능 문자 수                         |
| `aria-label`       | string  | -       | 접근성 레이블 (필수 표시 아이콘 등에 사용)     |
| `aria-required`    | boolean | false   | 필수 입력 필드임을 스크린리더에 알림           |
| `aria-describedby` | string  | -       | 에러 메시지 등 추가 설명을 연결하는 요소의 ID  |
