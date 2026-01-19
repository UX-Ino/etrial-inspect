---
trigger: always_on
---

# 코딩 스타일

코딩 스타일은 코드의 가독성과 일관성을 보장하기 위해 필수적입니다. 이 섹션에서는 HTML 및 CSS 코드 작성 시 고려해야 할 주요 스타일 규칙에 대해 설명합니다.

## 들여쓰기 및 공백

- **들여쓰기**: HTML 요소의 중첩 구조를 명확하게 표현하기 위해 탭(tab)이나 공백(space) 2개를 사용하여 들여쓰기를 합니다. 이는 부모-자식 관계를 시각적으로 쉽게 구별할 수 있도록 도와줍니다.
- **공백**: CSS 선언 블록에서 속성과 값 사이에는 공백 하나를 두어 가독성을 높입니다. 예: `color: red;`
- 들여쓰기를 위해 탭을 사용하거나 탭과 공백을 혼합하지 마세요.

## 코드 포맷팅 규칙

- **HTML**: 모든 HTML 태그는 소문자를 사용합니다. 속성은 항상 큰 따옴표(" ")로 감싸며, 여러 속성이 있는 경우 공백으로 구분합니다.
  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <title>문서 제목</title>
      <link rel="stylesheet" href="styles.css" />
    </head>
    <body>
      <div class="container">
        <h1>메인 제목</h1>
        <p class="description">이것은 단락입니다.</p>
        <img src="image.jpg" alt="설명 텍스트" />
      </div>
    </body>
  </html>
  ```
- **CSS**: 선택자와 중괄호 사이에는 공백을 두고, 선언 블록의 시작 중괄호 **`{`**는 선택자와 같은 줄에 둡니다. 선언은 각각 새로운 줄에 작성합니다. 속성 값에 따옴표를 사용해야 하는 경우 큰 따옴표(" ")를 사용합니다.

  ```css
  .container {
    width: 100%;
    margin: auto;
  }

  h1 {
    color: blue;
    font-size: 20px;
  }

  .image-background {
    background-image: url("background.jpg");
  }
  ```

## 코드 사용 규칙

### 링크태그 (`<a href="">`)

- `<a href="">` 태그의 href 값은 빈 값으로 둡니다. a태그로 버튼 태그를 만들 때는 href="javascript:void(0)" 등으로 처리 했었지만 링크와 버튼의 구분이 명확한 현재는 url값이 기획서에 있을 경우는 해당 url을 넣어주고 없을 경우는 빈 값으로 두도록 합니다.

### 헤딩태그 (`<h1> ~ <h6>`)

`h1`, `h2`, `h3`, `h4`, `h5`, `h6` 태그는 HTML에서 제목의 중요도를 계층적으로 나타내는 헤딩(heading) 태그입니다. 이들은 웹 문서의 구조를 명확히 하고, 콘텐츠의 이해를 돕는 데 중요한 역할을 합니다. 코딩 컨벤션에 포함시킬 수 있는 몇 가지 주요 마크업 원칙을 정리하면 다음과 같습니다:

#### 1. 계층적 사용

- `h1`부터 `h6`까지의 헤딩은 계층적으로 사용해야 합니다. `h1`은 가장 높은 수준의 제목을 나타내고, `h2`는 `h1`의 하위 섹션, `h3`은 `h2`의 하위 섹션처럼 계속 이어지게 설계해야 합니다. 제목의 수준은 문서의 섹션 구조를 반영해야 합니다.

#### 2. 유일한 `h1`

- 각 페이지에는 하나의 `h1` 태그만 사용하는 것이 일반적인 권장사항입니다. 이는 페이지의 주제나 목적을 가장 잘 나타내는 제목입니다.

#### 3. 의미적 정확성

- 제목 태그는 오로지 제목을 위해 사용되어야 합니다. 스타일링 목적으로 제목 태그를 사용하지 않아야 하며, 대신 CSS를 사용하여 스타일을 적용해야 합니다.

### 아이콘 사용 (`<i>`)

아이콘을 컨텐츠의 CSS 배경 이미지가 아닌, 별도의 HTML 마크업 요소로 포함하는 방식은 여러 유리한 점을 가지고 있습니다. 이 방식은 웹 접근성, 인터랙티브 디자인, 컨텐츠 관리 측면에서 장점을 제공합니다.

```html
<!-- 스크린 리더에 읽히지 않아야 할 경우 -->
<i class="ico-close ico-normal" aria-hidden="true"></i>

<!-- 스크린 리더에 읽혀야 할 경우 -->
<i class="ico-close ico-normal" role="img" aria-label="닫기"></i>

<!-- 버튼 사용 예시 -->
<button type="button" class="btn">
  <i class="ico-search ico-normal" aria-hidden="true"></i>
  <span class="btn-txt">검색</span>
</button>
```

### 플로팅 속성

플로팅 속성은 요소가 화면에 고정되어 스크롤과 관계없이 항상 동일한 위치에 유지되도록 하는 데 사용됩니다. 이는 중요한 액션 버튼, 알림 배너, 헤더 또는 네비게이션 바와 같은 요소에 유용합니다.

#### 사용 위치:

- 고정된 버튼 그룹이나 요소는 페이지 내의 중요한 액션을 나타내거나, 사용자가 항상 접근할 수 있도록 화면의 특정 위치에 고정됩니다.
- 예: `component-btns fixed`, `history-wrap fixed`

#### z-index 관리:

- 고정된 요소는 다른 콘텐츠와 겹침이 없도록 적절한 `z-index` 값을 사용합니다.
- `z-index` 값은 \_variables.scss 파일의 규칙을 따릅니다.

#### 예제 코드:

```html
<!-- 컴포넌트 버튼 그룹 : fixed -->
<div class="component-btns fixed">
  <div class="btns-row">
    <button type="button" class="btn">
      <span class="btn-txt">플로팅 버튼</span>
    </button>
    <button type="button" class="btn">
      <span class="btn-txt">플로팅 버튼</span>
    </button>
  </div>
</div>

<!-- 컨텐츠 그룹 : fixed -->
<div class="history-wrap fixed">컨텐츠 내용 생략...</div>
```

### iOS safe area

iOS Safe Area는 iOS 기기에서 UI 요소가 잘리지 않고 화면 내에 적절히 배치되도록 보장하기 위해 사용됩니다. 이는 특히 노치(notch)나 홈 인디케이터(home indicator)가 있는 기기에서 중요합니다. Safe Area를 고려하지 않으면 UI 요소가 잘리거나 접근하기 어려운 위치에 놓일 수 있습니다.

#### Safe Area 적용:

- `constant(safe-area-inset-top)`, `constant(safe-area-inset-right)`, `constant(safe-area-inset-bottom)`, `constant(safe-area-inset-left)` CSS 변수를 사용하여 Safe Area 내에 요소를 배치합니다.
- `env(safe-area-inset-top)`, `env(safe-area-inset-right)`, `env(safe-area-inset-bottom)`, `env(safe-area-inset-left)` CSS 변수를 사용하여 Safe Area 내에 요소를 배치합니다.
- 반응형 디자인을 적용하여 모든 기기에서 올바르게 표시되도록 합니다.

#### 플로팅 및 고정된 요소:

- `fixed` 또는 `absolute` 위치를 사용하는 플로팅 요소는 Safe Area를 고려하여 배치합니다.
- 예: `calc` 함수와 `env` 변수를 사용하여 Safe Area 내에 위치 조정.

#### Constant 사용 이유

- **호환성**: 모든 브라우저가 `env()` 변수를 지원하지 않을 수 있으므로, CSS 변수를 사용하여 기본값을 설정합니다. 이를 통해 브라우저 호환성을 높일 수 있습니다.

**`body`에 safe area 속성을 적용하는 이유는 다음과 같습니다:**

1. **안전한 사용성 보장**: 다양한 기기에서 안전한 영역을 확보하기 위해서입니다. 특히 노치, 홈버튼, 둥근 모서리 등이 있는 기기에서는 콘텐츠가 잘리거나 접근하기 어려운 경우가 생길 수 있습니다. 이를 방지하기 위해 safe area를 사용하여 이러한 영역을 피해 콘텐츠를 배치합니다.
2. **일관성 유지**: `body`에 safe area 속성을 적용함으로써 전체 페이지의 레이아웃이 일관성을 유지할 수 있습니다. 이렇게 하면 페이지의 다른 요소들이 safe area에 맞춰 배치되므로 사용자가 어디서든 동일한 경험을 할 수 있습니다.
3. **유연한 디자인**: 다양한 화면 크기와 해상도를 지원하기 위해서입니다. safe area를 사용하면 기기의 화면 크기와 관계없이 콘텐츠가 적절히 배치되며, 사용자가 기기를 회전시키거나 크기를 조정할 때도 문제가 발생하지 않습니다.

**`body` left와 right에 safe area 속성을 적용하는 이유:**

1. **가로모드 지원**: 많은 기기에서 가로모드를 지원하기 때문에, 가로모드에서도 콘텐츠가 안전하게 표시되도록 left와 right에도 safe area 속성을 적용합니다. 특히, 가로모드에서는 화면의 좌우에 노치나 둥근 모서리가 있을 수 있습니다.
2. **일관된 레이아웃**: 세로모드와 가로모드 모두에서 일관된 사용자 경험을 제공하기 위해 left와 right에도 safe area를 적용합니다. 이렇게 하면 사용자가 기기를 어떤 방향으로 사용하든 동일한 레이아웃과 디자인을 경험할 수 있습니다.
3. **미래의 기기 대응**: 현재는 노치나 둥근 모서리가 주로 화면의 상단이나 하단에 있지만, 미래에는 다양한 형태의 기기가 나올 수 있습니다. 미리 left와 right에 safe area를 적용해 두면, 새로운 기기에서도 문제가 발생하지 않도록 대비할 수 있습니다.

```scss
// 디바이스 safe area 관련 예제 코드
// px, rem 단위를 구분하여 사용 가능
// 디자인 가이드에 따라 값은 다르게 사용 합니다.

body {
  padding-top: calc(5rem + constant(safe-area-inset-top));
  padding-top: calc(5rem + env(safe-area-inset-top));
  padding-bottom: calc(5rem + constant(safe-area-inset-bottom));
  padding-bottom: calc(5rem + env(safe-area-inset-bottom));
  padding-left: calc(50rem + constant(safe-area-inset-left));
  padding-left: calc(50rem + env(safe-area-inset-left));
  padding-right: calc(50rem + constant(safe-area-inset-right));
  padding-right: calc(50rem + env(safe-area-inset-right));
}
```

```scss
// 0 값을 사용할때 단위를 넣어 줘야 합니다.
// calc() 함수 내에서는 단위를 명시해야 합니다. calc() 함수는 다른 값들과의 연산을 위해 단위를 필요로 하므로, 다음과 같이 0에 단위를 붙여 사용해야 합니다:

padding-top: calc(0px + constant(safe-area-inset-top));
padding-top: calc(0rem + env(safe-area-inset-top));
padding-bottom: calc(0px + constant(safe-area-inset-bottom));
padding-bottom: calc(0rem + env(safe-area-inset-bottom));
padding-left: calc(0px + constant(safe-area-inset-left));
padding-left: calc(0rem + env(safe-area-inset-left));
padding-right: calc(0px + constant(safe-area-inset-right));
padding-right: calc(0rem + env(safe-area-inset-right));
```

#### 예제 코드:

```html
<!-- 플로팅 UI별로 적용할 경우 -->

<!-- 예제 1 -->
<button class="btn fixed">Action</button>

<!-- 예제 2 -->
<div class="floating-UI">임시 클래스</div>

<style>
  .btn.fixed {
    bottom: calc(2rem + constant(safe-area-inset-bottom));
    bottom: calc(2rem + env(safe-area-inset-bottom));
    right: calc(20rem + constant(safe-area-inset-right));
    right: calc(20rem + env(safe-area-inset-right));
  }

  .floating-UI {
    top: calc(5rem + constant(safe-area-inset-top));
    top: calc(5rem + env(safe-area-inset-top));
    bottom: calc(5rem + constant(safe-area-inset-bottom));
    bottom: calc(5rem + env(safe-area-inset-bottom));
    left: calc(50rem + constant(safe-area-inset-left));
    left: calc(50rem + env(safe-area-inset-left));
    right: calc(50rem + constant(safe-area-inset-right));
    right: calc(50rem + env(safe-area-inset-right));
  }
</style>
```

## 코멘트 사용 지침

- **구조 주석**: 큰 섹션의 시작과 끝을 표시하거나, 파일의 주요 부분을 구분하는 데 주석을 사용합니다.
- **일시적 주석**: 향후 수정이 필요하거나 잠시 비활성화된 코드에 대해 주석을 달아 해당 상황을 명확히 합니다.

> 주석 사용은 코드의 의도와 구조를 명확히 하여 다른 개발자들이 코드를 이해하고 유지보수하는 데 큰 도움이 됩니다. 불필요하거나 오해를 불러일으킬 수 있는 주석은 피해야 합니다.

- **HTML 주석**: HTML 주석은 **`<!-- 주석 내용 -->`** 형태로 사용합니다. 페이지 레이아웃의 주요 부분이나 복잡한 구조를 설명할 때 유용합니다.
- **HTML 수정 주석**: HTML 수정 주석은 **`<!-- 20240228 수정 -->`** **`<!-- //20240228 수정 -->`** 형태로 시작과 끝을 표시 해줍니다. 기본 형태는 위와 같고 프로젝트 내에서 변경하여 사용할 수 있습니다. 목적은 개발자가 알아보기 쉽게 하기 위함입니다. (마지막 **`//`**와 날짜사이는 띄어쓰기 하지 않습니다.)
- **CSS 주석**: CSS 주석은 **`/* 주석 내용 */`** 형태로 사용합니다. 스타일 규칙의 목적이나 특정 속성의 사용 이유를 설명할 때 사용합니다.
- **CSS 수정 주석**: CSS 수정 주석은 개발자에게 전달 할 필요가 없기 때문에 표시하지 않지만 예외로 표시가 필요할 경우는 **`/* 20240228 수정 */`** **`/* //20240228 수정 */`** HTML 주석과 동일하게 표시 합니다.
- **`/*! 주석 */`** 형태의 주석은, Gulp와 같은 빌드 도구를 사용하여 CSS 파일을 최소화(minify)하는 과정에서도 해당 주석을 보존하기 위한 명시적인 지시자입니다. 이러한 주석은 주로 라이브러리 라이선스 정보 또는 저작권 표기와 같은 중요 메타데이터를 유지하기 위해 사용됩니다. 일반적인 사용 사례에서는 필요하지 않으므로 **`!`** 는 사용하지 않습니다.
- **SCSS 주석**: SCSS 주석은 ( **`// SCSS 주석`** )퍼블리싱 항목 별로 표시 해줍니다. CSS 컴파일 될때는 삭제 됨으로 퍼블리싱 작업자들이 사용하기 편하게 주석으로 가이드 해주세요.

> HTML과 CSS 코드를 작성할 때 기본적으로 따라야 할 들여쓰기, 공백 처리, 코드 포맷팅 및 주석 사용에 대한 지침을 제공합니다. 이러한 규칙들은 코드의 일관성과 가독성을 높이는 데 도움이 됩니다.