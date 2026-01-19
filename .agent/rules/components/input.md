# Input

> Input 컴포넌트는 사용자로부터 텍스트 입력을 받는 폼 요소입니다. 단일 라인 텍스트, 비밀번호, 여러 줄 텍스트(textarea) 입력을 지원하며, 유효성 검사 피드백과 입력 제어 기능을 제공합니다.

```html
<div class="component-input" data-props-clear="true">
  <div class="input-field">
    <input type="text" id="temp_input_0001" placeholder="Placeholder" />
  </div>
</div>
```

## TL;DR

- **언제 사용하나요?** 사용자로부터 텍스트, 이메일, 비밀번호 등의 입력을 받아야 할 때 사용합니다.
- **핵심 역할**: 텍스트 입력 수집, 입력값 검증 피드백 제공, 입력 제어(clear, password toggle) 기능 지원
- **주요 클래스/속성**: `.component-input`, `.input-field`, `data-props-clear`, `data-props-toggle-password`, `.input-valid`, `.input-invalid`, `.input-required`

## 기본 마크업

### 필수 구조

- `.component-input`: 최상위 래퍼 (입력 컴포넌트 전체를 감싸는 컨테이너)
- `.input-field`: 입력 필드를 감싸는 영역
- `<input>`: 실제 입력 요소 (type, id, placeholder 속성 필수)
- `.input-info`: 유효성 검사 메시지 표시 영역 (선택)

### 필수 속성

- `id`: 각 input 요소는 고유한 id를 가져야 합니다 (label 연결 및 접근성)
- `type`: 입력 타입 지정 (text, password, email 등)
- `placeholder`: 입력 힌트 제공
- `data-props-clear`: 입력값 초기화 버튼 활성화
- `data-props-toggle-password`: 비밀번호 표시/숨김 토글 기능 (type="password"일 때)

> **TIP**: 기본 마크업은 가장 간결한 형태로 작성하고, 복잡한 사용 예시는 아래 "패턴 & 변형" 섹션에서 다룹니다.

## 접근성 (Accessibility)

- 모든 input 요소는 연결된 `<label>` 또는 `aria-label`을 제공해야 합니다.
- 유효성 검사 메시지는 `aria-describedby`로 input과 연결하여 스크린리더가 읽을 수 있도록 합니다.
- 에러 상태일 때 `aria-invalid="true"` 속성을 추가합니다.
- 필수 입력 필드는 `required` 속성 또는 `aria-required="true"`를 사용합니다.
- 키보드만으로 입력, 초기화, 비밀번호 토글 등 모든 기능에 접근 가능해야 합니다.

## 구현 가이드

### 공통 규칙

- 입력 필드는 `.input-field` 내부에 배치합니다.
- 유효성 검사 메시지는 `.input-info` 클래스를 사용하여 표시합니다.
- 상태 클래스(`.input-valid`, `.input-invalid`, `.input-required`)는 `.component-input`에 추가합니다.
- 비밀번호 입력 시 `data-props-toggle-password="true"`를 사용하여 표시/숨김 기능을 활성화합니다.

### 클래스 & 상태 정의

| 클래스/속성                  | 용도                      | 비고                           |
| ---------------------------- | ------------------------- | ------------------------------ |
| `.component-input`           | 입력 컴포넌트 래퍼        | 최상위 컨테이너                |
| `.input-field`               | 입력 필드 영역            | input 요소를 감싸는 영역       |
| `.input-textarea-field`      | textarea 필드 영역        | textarea 요소를 감싸는 영역    |
| `.input-info`                | 유효성 메시지 표시 영역   | 성공/오류/필수 메시지 표시     |
| `.input-valid`               | 유효성 검사 성공 상태     | 녹색 스타일 적용               |
| `.input-invalid`             | 유효성 검사 실패 상태     | 빨간색 스타일 적용             |
| `.input-required`            | 필수 입력 상태            | 필수 입력 표시                 |
| `data-props-clear`           | 입력값 초기화 버튼 활성화 | true로 설정 시 clear 버튼 표시 |
| `data-props-toggle-password` | 비밀번호 표시/숨김 토글   | password 타입에서 사용         |
| `data-props-count`           | 현재 입력 글자 수         | textarea에서 사용              |
| `data-props-count-limit`     | 최대 입력 글자 수 제한    | textarea에서 사용              |

### 자바스크립트 연동

- `data-props-clear="true"` 설정 시 입력값이 있을 때 자동으로 초기화 버튼이 표시됩니다.
- `data-props-toggle-password="true"` 설정 시 비밀번호 표시/숨김 토글 버튼이 생성됩니다.
- textarea의 경우 `data-props-count`와 `data-props-count-limit`를 사용하여 글자 수 카운팅 기능을 활성화합니다.
- 유효성 검사는 상태 클래스(`.input-valid`, `.input-invalid`)를 동적으로 추가/제거하여 처리합니다.

## 패턴 & 변형 (Variants)

> 각 변형은 "언제 사용해야 하는지"와 "기본 구조와 무엇이 다른지"를 함께 설명합니다.

### 기본 텍스트 입력

- 가장 기본적인 텍스트 입력 형태
- 입력값 초기화 기능 포함

```html
<div class="component-input" data-props-clear="true">
  <div class="input-field">
    <input type="text" id="temp_input_0001" placeholder="Placeholder" />
  </div>
</div>
```

### 값이 입력된 상태

- 초기값이 있는 입력 필드
- 수정 가능한 상태로 표시

```html
<div class="component-input" data-props-clear="true">
  <div class="input-field">
    <input type="text" id="temp_input_0101" placeholder="Placeholder" value="입력된 텍스트" />
  </div>
</div>
```

### 비밀번호 입력

- 비밀번호 입력 시 사용
- 표시/숨김 토글 기능 제공

```html
<div class="component-input" data-props-clear="true" data-props-toggle-password="true">
  <div class="input-field">
    <input type="password" id="temp_input_0201" placeholder="비밀번호를 입력해 주세요" value="password123" />
  </div>
</div>
```

### 유효성 검사 - 성공

- 입력값이 유효할 때 사용
- `.input-valid` 클래스로 성공 상태 표시
- 성공 메시지를 `.input-info`에 표시

```html
<div class="component-input input-valid" data-props-clear="true">
  <div class="input-field">
    <input type="text" id="temp_input_valid_0001" placeholder="성공" />
  </div>
  <div class="input-info">성공 입니다.</div>
</div>
```

### 유효성 검사 - 오류

- 입력값이 유효하지 않을 때 사용
- `.input-invalid` 클래스로 오류 상태 표시
- 오류 메시지를 `.input-info`에 표시

```html
<div class="component-input input-invalid" data-props-clear="true">
  <div class="input-field">
    <input type="text" id="temp_input_invalid_0001" placeholder="오류" />
  </div>
  <div class="input-info">오류 입니다.</div>
</div>
```

### 필수 입력

- 반드시 입력해야 하는 필드
- `.input-required` 클래스로 필수 상태 표시
- 필수 입력 안내 메시지 표시

```html
<div class="component-input input-required">
  <div class="input-field">
    <input type="text" id="temp_input_required_0001" placeholder="필수입력" />
  </div>
  <div class="input-info">필수입력 입니다.</div>
</div>
```

### Textarea (여러 줄 입력)

- 긴 텍스트 입력이 필요할 때 사용
- 글자 수 카운팅 기능 제공
- `data-props-count`와 `data-props-count-limit`로 글자 수 제한 설정

```html
<div class="component-input" data-props-count="300" data-props-count-limit="300" data-props-clear="true">
  <div class="input-textarea-field">
    <textarea id="temp_textarea_0001" type="textarea" class="textarea" placeholder="텍스트를 입력해주세요."></textarea>
    <span class="textarea-count" style="opacity: 1">(<em class="textarea-count-num">0</em>/<em class="textarea-count-total">300</em>)</span>
  </div>
</div>
```

## 상세 예시 (Patterns)

### 폼 내 입력 필드 조합

여러 입력 필드를 폼으로 구성할 때의 예시입니다.

```html
<form class="form-example">
  <!-- 이메일 입력 -->
  <div class="component-input" data-props-clear="true">
    <label for="user_email">이메일</label>
    <div class="input-field">
      <input type="email" id="user_email" placeholder="example@email.com" required />
    </div>
  </div>

  <!-- 비밀번호 입력 -->
  <div class="component-input" data-props-clear="true" data-props-toggle-password="true">
    <label for="user_password">비밀번호</label>
    <div class="input-field">
      <input type="password" id="user_password" placeholder="비밀번호를 입력해 주세요" required />
    </div>
  </div>

  <!-- 메시지 입력 -->
  <div class="component-input" data-props-count="500" data-props-count-limit="500" data-props-clear="true">
    <label for="user_message">메시지</label>
    <div class="input-textarea-field">
      <textarea id="user_message" class="textarea" placeholder="메시지를 입력해주세요." required></textarea>
      <span class="textarea-count">(<em class="textarea-count-num">0</em>/<em class="textarea-count-total">500</em>)</span>
    </div>
  </div>
</form>
```

## API / Props Reference

| Props / 속성                 | Type    | Default | Description                                  |
| ---------------------------- | ------- | ------- | -------------------------------------------- |
| `data-props-clear`           | boolean | false   | 입력값 초기화 버튼 표시 여부                 |
| `data-props-toggle-password` | boolean | false   | 비밀번호 표시/숨김 토글 버튼 표시 (password) |
| `data-props-count`           | number  | -       | textarea 현재 글자 수 (자동 계산)            |
| `data-props-count-limit`     | number  | -       | textarea 최대 글자 수 제한                   |
