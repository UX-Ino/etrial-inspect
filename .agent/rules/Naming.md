---
trigger: model_decision
---

# 네이밍

> 이미지, 클래스, 아이디에 대한 네이밍 규칙을 설명합니다.

## 소개

- 왜 파일 네이밍 규칙(File Naming Rules)을 사용하는가?
- 정확한 CSS 네이밍을 한다면, 코드를 읽기 쉽고 유지 보수하기 쉽게 만들어 줄 것입니다.

## ID와 클래스 이름의 사용

- **ID 사용**: ID는 고유한 요소를 식별하는 데 사용되며, 한 페이지에서 한 번만 사용해야 합니다. ID는 JavaScript와의 상호 작용이 필요한 경우나 앵커 포인트로 사용할 때 주로 적용합니다.
- **클래스 사용**: 스타일 적용을 위해서는 주로 클래스 선택자를 사용합니다. 클래스는 재사용 가능하고, 여러 요소에 동일한 스타일을 적용하는 데 유용합니다.

## 이미지 네이밍 규칙

- **Snake-Case (스네이크 표기법)**
  스네이크 표기법에서는 단어 사이를 밑줄(`_`)로 연결합니다. 이 방식은 단어의 경계가 명확하게 보이도록 해주며, 주로 프로그래밍 언어나 환경에서 변수명이나 함수명을 지을 때 사용됩니다. CSS에서는 일반적으로 스네이크 표기법을 자주 사용하지 않으나, 일부 프로젝트 또는 팀에서는 이를 선호할 수 있습니다.
- **유형 + 속성(순서) + 상태** 순으로 작성합니다.
  - 유형과 속성 이란?
    "유형"은 보다 넓은 범주에서 객체, 사물, 개념 등을 분류하는 기준을 말합니다. 유형은 동일한 특성이나 속성을 공유하는 그룹을 식별하는 데 사용되며, 일반적으로 범주나 클래스를 정의하는 용도로 사용됩니다. 예를 들어, 웹 개발에서 버튼, 입력 필드, 드롭다운 메뉴와 같은 UI 컴포넌트의 '유형'을 구분할 때 사용할 수 있습니다.<br>
    속성은 객체, 요소, 또는 개체의 특징이나 상태를 설명하는 정보입니다. 웹 개발에서 HTML 요소의 속성은 해당 요소의 특징이나 설정을 정의합니다. 속성 안에 역할이 포함될 수 있으며, 역할은 요소의 속성 중 하나로서 그 요소가 사용자에게 어떻게 작용해야 하는지를 명시하는 역할을 합니다.
- 특정 카테고리에 따라 이미지를 구분할 필요가 있을 경우, 관련 이미지들을 별도의 폴더에 분류합니다.
- 폴더로의 구분이 실질적이지 않거나 가능하지 않을 경우, 접두사 뒤에 카테고리명을 추가하여 이미지를 구분합니다.
- 이미지의 상태를 나타내는 네이밍은 해당 컨텐츠의 클래스 상태 네이밍과 일치하도록 합니다.

### 네이밍 샘플

- `ico_login_user01_on.png`
  - **유형:** `ico` - 아이콘을 의미합니다.
  - **속성(순서):** `login_user01` - 로그인 관련 특정 유저의 첫 번째 버전을 의미합니다.
  - **상태**: `on` - 활성 상태를 의미합니다.
- `btn_submit_order02_off.svg`
  - **유형:** `btn` - 버튼을 의미합니다.
  - **속성(순서):** `submit_order02` - 주문 제출 버튼의 두 번째 스타일을 의미합니다.
  - **상태**: `off` - 비활성 상태를 의미합니다.

| 파일명                       | 유형  | 속성(순서)       | 상태  |
| ---------------------------- | ----- | ---------------- | ----- |
| `ico_login_user01_on.png`    | `ico` | `login_user01`   | `on`  |
| `btn_submit_order02_off.png` | `btn` | `submit_order02` | `off` |

```html
<!-- 이미지 네이밍 예제 -->
<img src="ico_home.png" alt="" />
<img src="ico_star01_on.png" alt="" />
<img src="btn_add_file_off.png" alt="" />
<img src="btn_add_file_on.png" alt="" />
<img src="img_swiper_item01.png" alt="" />
<img src="thumb_event_swiper01_item01.png" alt="" />
<img src="bu_circle_gray01_off.png" alt="" />
<img src="line_dot01_red.png" alt="" />
<img src="line_dot02_red.png" alt="" />
<img src="thumb_main_size01_on.png" alt="" />
<img src="thumb_main_size01_off.png" alt="" />
<img src="logo_header_lightmode.png" alt="" />
<img src="logo_footer_darkmode.png" alt="" />
<img src="map_pin01_on.png" alt="" />
<img src="map_pin01_off.png" alt="" />
<img src="sp_ico01_24x24.png" alt="" />
<img src="sp_ico01_48x48.png" alt="" />
```

- 순서가 있는 이미지 규칙은 01, 02, 03과 번호대로 표기 합니다.

```html
<img src="gradient_bg01_green01.png" alt="" />
<img src="gradient_bg01_green02.png" alt="" />

<img src="tab_notice01_item01_on.png" alt="" />
<img src="tab_notice01_item02_on.png" alt="" />
```

- 순서가 없던 이미지 중에 추가 이미지가 발생 하면 01을 건너뛰고 02부터 표기 합니다.

```html
<img src="img_main_notice.png" alt="" />
<img src="img_main_notice02.png" alt="" />

<img src="tit_member_red.png" alt="" />
<img src="tit_member02_red.png" alt="" />
```

- 숫자 표기는 분리자/구분자를 사용하지 않고 연속적인 네이밍으로 작성 합니다.

```html
<img src="banner_notice_01_black_01_on.png" alt="" /> ( X ) <img src="banner_notice01_black01_on.png" alt="" /> ( O )
```

- 이미지 파일들의 폴더 구조는 공통 폴더와 카테고리 폴더로 구분 합니다.

```markdown
assets/images/common/

<!-- 공통 이미지 -->

assets/images/join/

<!-- 회원가입 이미지 -->

assets/images/main/

<!-- 메인 이미지 -->
```

### 접두사를 활용한 파일 구분

| 네이밍     | 의미              |
| ---------- | ----------------- |
| btn\_      | 버튼              |
| bu\_       | 블릿              |
| line\_     | 선                |
| img\_      | 이미지            |
| thumb\_    | 썸네일            |
| gradient\_ | 그라데이션        |
| logo\_     | 로고              |
| map\_      | 지도관련 이미지   |
| ico\_      | 아이콘            |
| tab\_      | 탭                |
| bg\_       | 배경              |
| temp\_     | 임시              |
| ad\_       | 광고              |
| sp\_       | 스프라이트 이미지 |
| banner\_   | 배너              |
| mask\_     | 마스크 이미지     |
| avatar\_   | 프로필 이미지     |

## CSS 네이밍 규칙

- **kebab-case (케밥 케이스 표기법)**
  케밥 케이스에서는 단어 사이를 하이픈(**`-`**)으로 연결합니다. 이 방식은 CSS 네이밍에서 가장 일반적으로 사용되는 표기법입니다. 케밥 케이스는 CSS 속성과 값에서 자연스럽게 사용되기 때문에, CSS 클래스나 ID 네이밍에도 일관성을 제공합니다.
- **유형 + 속성(순서) + 상태** 순으로 작성합니다.
  - 유형과 속성이란?
    "유형"은 보다 넓은 범주에서 객체, 사물, 개념 등을 분류하는 기준을 말합니다. 유형은 동일한 특성이나 속성을 공유하는 그룹을 식별하는 데 사용되며, 일반적으로 범주나 클래스를 정의하는 용도로 사용됩니다. 예를 들어, 웹 개발에서 버튼, 입력 필드, 드롭다운 메뉴와 같은 UI 컴포넌트의 '유형'을 구분할 때 사용할 수 있습니다.
    속성은 객체, 요소, 또는 개체의 특징이나 상태를 설명하는 정보입니다. 웹 개발에서 HTML 요소의 속성은 해당 요소의 특징이나 설정을 정의합니다. 속성 안에 역할이 포함될 수 있으며, 역할은 요소의 속성 중 하나로서 그 요소가 사용자에게 어떻게 작용해야 하는지를 명시하는 역할을 합니다.

### 네이밍 샘플

- `.ico-login-user01.on`
  - **유형:** `ico` - 아이콘을 의미합니다.
  - **속성(순서):** `login-user01` - 로그인 관련 특정 유저의 첫 번째 버전을 의미합니다.
  - **상태:** `on` - 활성 상태를 의미합니다.
- `.btn-submit-order02.off`
  - **유형:** `btn` - 버튼을 의미합니다.
  - **속성(순서):** `submit-order02` - 주문 제출 버튼의 두 번째 스타일을 의미합니다.
  - **상태:** `off` - 비활성 상태를 의미합니다.

```css
/* 클래스 네이밍 예제 */
.ico-login-user01 {
}
.btn-submit-order02 {
}
```

- 상태 클래스는 하이픈(`-`)으로 연결하는 방식을 쓰지 않고 클래스 분리 방식을 사용 합니다.

```html
<div class="btn-type01-on"></div>
<!-- 나쁜 예시 -->
<div class="btn-type01 on"></div>
<!-- 좋은 예시 -->
```

- 순서가 있는 클래스 규칙은 01, 02, 03과 같이 표기 합니다.

```css
.btn-type01 {
}
.btn-type02 {
}
```

- 순서가 없던 클래스 중에 추가 이미지가 발생 하면 02부터 표기 합니다.

```css
.tit-notice {
}
.tit-notice02 {
}
```

- 숫자 표기는 분리자/구분자를 사용하지 않고 연속적인 네이밍으로 작성 합니다.

```css
.btn-type-02 /* 나쁜 예시 */
.btn-type02 /* 좋은 예시 */
```

### 레이아웃 아이디 및 클래스

- 아이디는 한 문서 내에서 고유해야 합니다. 같은 아이디를 두 번 이상 사용하지 않습니다.
- 소문자 사용을 원칙으로 합니다. **`label`**아이디는 필요에 따라서 카멜케이스를 사용 합니다.
- 레이아웃과 관련된 아이디는 아래와 같이 정의하고 필요한 경우 프로젝트 팀내에서 협의하여 사용 합니다.
- **`#layer-wrap`** 클래스 영역은 모달, 얼럿등 레이어 컴포넌트들을 컨트롤 하는 공간 입니다.
- 기본 구조

```css
/* 페이지 기본 구조 */
#wrap {
}
.skipnav {
}
#header {
}
#content {
}
.content-wrap {
}
#footer {
}

/* 레이어 컨트롤 영역 */
#layer-wrap {
}

/* 로딩 영역 */
#loading-wrap {
}

/* 기타 필요한 영역 세팅 */
```

- `<input>`, `<label>` 태그등 임시 아이디가 필요할 경우 네이밍

```html
<!-- 임시라는 temp_ 로 시작하여 해당 컴포넌트 관련 이름으로 만듭니다. -->
<!-- 단어 구분은 언더바(_)로 구분 합니다. -->
<!-- 여러곳 에서 쓰일 경우를 대비해 0000 숫자로 넘버링 해줍니다. -->

<div class="component-input">
  <label for="**temp_input_0001**" class="input-label">
    <span class="label-txt">
      <i class="ico-required-mark" role="img" aria-label="필수">*</i>
      인풋 레이블
    </span>
    <span class="label-util">인풋 텍스트,버튼등등 위치</span>
  </label>
  <div class="input-field">
    <input type="text" id="**temp_input_0001**" placeholder="input text" />
  </div>
  <div class="input-info">인풋 유틸리티 Info 영역</div>
</div>
폴더
```

### CSS 클래스 구조

- 구조 유형은 크게 컨텐츠와 컴포넌트(단일, 복합) 2가지로 분류 합니다.
- 컨텐츠는 `-wrap` 이라는 접미사를 사용합니다.
- 컴포넌트는 `component-` 라는 접두사를 사용합니다.
- 컨텐츠 & 컴포넌트를 레이아웃이 필요할 경우 `.components-layout` 클래스를 사용합니다.
- 참고로 네이밍 구조는 부모의 접미사를 자식의 접두사로 사용할수도 있습니다. (참고사항)

```css
.component-tab {
}
.tab-item {
}
.item-bg {
}
.bg-color01 {
}
.item-txt {
}
.txt-info {
}
```

#### 상태 클래스 약속어

> CSS 스타일 + 스크립트 호출 + 개발 호출

```css
/* 버튼, 체크박스, 탭등 */
.on {
}
.off {
}

/* 모달, 툴팁, 드롭다운, 아코디언등 */
.show {
}
.hide {
}

/* 고정 영역 */
.fixed {
} /* position: fixed */
.sticky {
} /* position: sticky */

/* 스텝등 */
.current {
} /* 현재위치 */
.complete {
} /* 완료된 항목 */

/* 폼 그룹 */
.form-disabled {
} /* 폼 요소가 비활성화된 상태일 때의 스타일을 적용합니다. */
.form-readonly {
} /* 읽기 전용 필드에 스타일을 적용합니다. */
.form-valid {
} /* 입력 값이 검증 조건을 만족했을 때의 스타일을 적용합니다. */
.form-invalid {
} /* 입력 값이 검증 조건을 만족하지 않았을 때의 스타일을 적용합니다. */
.form-required {
} /* 필수 입력 필드에 스타일을 적용합니다. */

/* input 그룹 */
.input-disabled {
} /* 폼 요소가 비활성화된 상태일 때의 스타일을 적용합니다. */
.input-readonly {
} /* 읽기 전용 필드에 스타일을 적용합니다. */
.input-valid {
} /* 입력 값이 검증 조건을 만족했을 때의 스타일을 적용합니다. */
.input-invalid {
} /* 입력 값이 검증 조건을 만족하지 않았을 때의 스타일을 적용합니다. */
.input-required {
} /* 필수 입력 필드에 스타일을 적용합니다. */
```

- **`expand`**(확장하다), **`reduction`**(축소하다), **`fold`**(펼치다), **`unfold`**(접다) → 사용하지 않습니다.
- 위 단어들은 **`on`**, **`off`**, **`show`**, **`hide`**로 대체 합니다.

#### 유틸리티 클래스

- 유틸리티 클래스를 생성할 때는 **`_display.scss`** **`_margin.scss`** **`_padding.scss`** **`_text.scss`** 와 같이 파일명으로 유틸리티 종류를 구분해서 정리 하도록 합니다.

```scss
/*
	유틸리티 클래스
	규칙은 tailwindcss를 참고합니다.
	https://tailwindcss.com/docs/display
*/

/* _text.scss */
.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}

/* _font.scss */
.font-bold {
  font-weight: bold;
}
.font-normal {
  font-weight: normal;
}

/* _cursor.scss */
.cursor-pointer {
  cursor: pointer;
}

/* _display.scss */
.pc-show {
  display: block;
}
.pc-hide {
  display: none;
}
.mo-show {
  display: block;
}
.mo-hide {
  display: none;
}

/* _width.scss */
.w-10 {
  width: 10px;
}
.min-w-200 {
  min-width: 200px;
}
.min-w-full {
  min-width: 100%;
}
.max-w-200 {
  max-width: 200px;
}
.max-w-full {
  max-width: 100%;
}

/* _height.scss */
.h-10 {
  height: 10px;
}
.min-h-400 {
  min-height: 400px;
}
.min-h-full {
  min-height: 100%;
}
.max-h-400 {
  max-height: 400px;
}
.max-h-full {
  max-height: 100%;
}

/* _margin.scss */
.m-0 {
  margin: 0;
}
.mt-5 {
  margin-top: 5px;
}
.mb-5 {
  margin-bottom: 5px;
}
.mr-5 {
  margin-right: 5px;
}
.ml-5 {
  margin-left: 5px;
}

/* _padding.scss */
.p-0 {
  padding: 0;
}
.pt-5 {
  padding-top: 5px;
}
.pb-5 {
  padding-bottom: 5px;
}
.pl-5 {
  padding-left: 5px;
}
.pr-5 {
  padding-right: 5px;
}

/* _editor_reset.scss */
.editor-reset {
  /* 에디터 영역 reset */
}

/* _base.scss */
.clfix {
  /* float 해제 */
}
.hide-txt {
  /* 숨김 텍스트 */
}
```

#### keyframes 네이밍 규칙

- **kebab-case (케밥 케이스 표기법)**
  케밥 케이스는 모든 소문자로 작성되며, 단어 간 구분을 위해 하이픈(`-`)을 사용하는 네이밍 방식입니다 (예: `ico-spinner`).

```scss
@keyframes ico-spinner {
  100% {
    transform: rotate(360deg);
  }
}
```

#### 스크립트 클래스 약속어

```scss
/* script에서 사용하는 클래스 */
.ui- {
}
```

#### 영역 약속어

- `wrap` `wrapper` `layout` `main` 은 영역 네이밍에 사용하지 않습니다.
- `main` `section` `article` `nav` `hgroup` 은 영역 네이밍에 사용하지 않습니다.
- `container` `header` `footer` `frame` `dialog` 은 영역 네이밍에 사용하지 않습니다.

| head      | body      | foot   | cont   |
| --------- | --------- | ------ | ------ |
| group     | area      | zone   | inner  |
| list      | box       | item   | part   |
| form      | field     | unit   | space  |
| grid      | segment   | panel  | tile   |
| cluster   | chunk     | nook   | slice  |
| enclave   | pocket    | hub    | alcove |
| vestibule | mezzanine | atrium | niche  |
| berth     | dais      | grotto |        |

1. **head**: 일반적으로 구조물의 상단 또는 시작 부분을 의미합니다.
2. **body**: 본문이나 주요 부분을 나타냅니다.
3. **foot**: 구조물의 하단 또는 마무리 부분입니다.
4. **cont (content)**: 내용물 또는 콘텐츠를 지칭합니다.
5. **group**: 공통된 특성이나 목적을 가진 항목들의 집합입니다.
6. **area**: 지정된 또는 특정한 공간을 가리킵니다.
7. **zone**: 특별한 목적이나 활동을 위해 설정된 구역입니다.
8. **inner**: 내부적인 부분이나 영역을 의미합니다.
9. **list**: 순서대로 나열된 항목들의 모임입니다.
10. **box**: 일반적으로 담는 기능을 가진 사각형 모양의 용기나 영역입니다.
11. **item**: 개별적인 항목이나 물건을 지칭합니다.
12. **part**: 전체 중 일부분을 나타냅니다.
13. **form**: 형태나 양식, 특정 목적을 위한 입력 필드들의 집합을 의미합니다.
14. **field**: 입력 또는 데이터를 담을 수 있는 공간을 지칭합니다.
15. **unit**: 독립적인 하나의 요소나 측정 단위를 나타냅니다.
16. **space**: 물리적 또는 가상의 공간을 의미합니다.
17. **grid**: 격자 또는 표와 같이 구성된 배열을 나타냅니다.
18. **segment**: 나뉘어진 부분 또는 구분된 영역입니다.
19. **panel**: 일반적으로 정보를 표시하거나 제어할 수 있는 구역입니다.
20. **tile**: 바닥이나 벽 등을 장식하는 사각형 모양의 조각입니다.
21. **cluster**: 비슷한 특성이나 목적을 공유하는 집단입니다.
22. **chunk**: 크기나 양이 상당한 부분을 의미합니다.
23. **nook**: 작고 아늑한 공간 또는 구석을 지칭합니다.
24. **slice**: 전체에서 잘라낸 조각이나 부분을 의미합니다.
25. **enclave**: 주변과 구별되는 작은 영역입니다.
26. **pocket**: 작은 공간이나 주머니 같은 저장 공간을 지칭합니다.
27. **hub**: 중심지 또는 중앙 집중점을 의미합니다.
28. **alcove**: 벽에 설치된 작은 공간, 종종 장식적 목적으로 사용됩니다.
29. **vestibule**: 건물의 입구와 내부를 연결하는 작은 공간입니다.
30. **mezzanine**: 두 주요 층 사이에 위치한 중간층을 나타냅니다.
31. **atrium**: 건물 내부의 큰 개방 공간, 종종 중앙 로비를 의미합니다.
32. **niche**: 특별한 목적을 위해 만들어진 작은 공간입니다.
33. **berth**: 배가 정박하는 위치나 잠을 잘 수 있는 침대 공간을 의미합니다.
34. **dais**: 발언자나 주요 인물이 서 있는 높은 플랫폼 또는 단상입니다.
35. **grotto**: 자연적으로 형성되었거나 인공적으로 만들어진 작은 동굴로, 장식적이거나 명상적인 용도로 사용될 수 있습니다.

> 이 단어들은 다양한 구조, 공간, 또는 구성 요소의 특정 부분을 지칭할 때 사용되며, 각각의 맥락에 따라 그 의미가 조금씩 달라질 수 있습니다. 주로 건축, 웹 디자인, UI/UX 디자인, 문서 구조화 등에서 활용되며, 각 영역이나 구성 요소의 위치, 목적, 기능을 설명하는 데 도움을 줍니다.

#### 기타 약속어

- **`text`** 네이밍은 유틸리티 클래스 및 input text를 제외하고는 **`txt`**로 사용합니다.
- 아래 단어들을 임의로 변경해서 사용하지 않습니다.

| 약속어              | 의미           |
| ------------------- | -------------- |
| rank                | 순위           |
| square              | 사각           |
| circle              | 원             |
| star                | 별             |
| shadow              | 그림자         |
| arrow               | 화살표         |
| dot                 | 점             |
| detail              | 상세내용       |
| widget              | 위젯           |
| thumb               | 썸네일         |
| img                 | 이미지         |
| link                | 링크           |
| time                | 시간           |
| date                | 날짜           |
| copyright           | 저작권         |
| type                | 타입           |
| animation           | 애니메이션     |
| display             | 디스플레이     |
| download            | 다운로드       |
| upload              | 업로드         |
| add                 | 첨부           |
| cancel              | 취소           |
| confirm             | 확인           |
| modify              | 수정           |
| write               | 쓰기           |
| del                 | 삭제           |
| lock                | 잠금           |
| unlocked            | 잠금해제       |
| point               | 강조           |
| submit              | 전송           |
| update              | 업데이트       |
| profile             | 프로필         |
| feature             | 특징           |
| description, desc   | 설명           |
| home                | 홈             |
| ad                  | 광고           |
| round               | 라운드         |
| temp                | 임시           |
| info                | 정보           |
| code                | 코드           |
| line                | 라인           |
| special             | 스페셜         |
| bar                 | 바             |
| num                 | 숫자           |
| txt                 | 텍스트         |
| tit                 | 제목           |
| banner              | 배너           |
| file                | 파일           |
| bg                  | 배경           |
| overflow            | 오버플로우     |
| prev, next          | 이전, 다음     |
| up, down            | 위, 아래       |
| refresh             | 새로고침       |
| top, middle, bottom | 위, 중간, 아래 |
| left, right         | 좌, 우         |
| stop                | 정지           |
| read                | 읽기           |
| search              | 검색           |
| find                | 찾기           |
| reg                 | 등록           |
| install, setup      | 설치           |
| run, play           | 실행           |
| check               | 체크           |
| h, v                | 수평, 수직     |
| contact             | 연락처         |
| social              | 소셜           |
| back                | 뒤로           |
