# Tab

> Tab 컴포넌트는 여러 콘텐츠 패널을 탭 형태로 전환하여 표시하는 컴포넌트입니다. 사용자가 탭을 클릭하면 해당 콘텐츠만 표시되어 공간을 효율적으로 활용할 수 있습니다.

```html
<div class="component-tab" data-active="tab1">
  <div class="tab-head">
    <button type="button" class="tab-label" data-tab-value="tab1">TAB 1</button>
    <button type="button" class="tab-label" data-tab-value="tab2">TAB 2</button>
    <button type="button" class="tab-label" data-tab-value="tab3">TAB 3</button>
  </div>
  <div class="tab-body">
    <div class="tab-content" data-tab-value="tab1">
      <div class="content-inner">Tab content 1</div>
    </div>
    <div class="tab-content" data-tab-value="tab2">
      <div class="content-inner">Tab content 2</div>
    </div>
    <div class="tab-content" data-tab-value="tab3">
      <div class="content-inner">Tab content 3</div>
    </div>
  </div>
</div>
```

## TL;DR

- **언제 사용하나요?** 여러 관련 콘텐츠를 하나의 영역에서 전환하며 표시해야 할 때 사용합니다.
- **핵심 역할**: 탭 버튼 클릭으로 콘텐츠를 전환하고, 현재 활성 탭을 시각적으로 표시합니다.
- **주요 클래스/속성**: `.component-tab`, `.tab-head`, `.tab-label`, `.tab-content`, `data-active`, `data-tab-value`

## 기본 마크업

### 필수 구조

- `.component-tab`: 최상위 래퍼 (탭 컴포넌트 전체를 감싸는 컨테이너)
- `.tab-head`: 탭 버튼들을 감싸는 헤더 영역
- `.tab-label`: 개별 탭 버튼 (사용자가 클릭하는 요소)
- `.tab-body`: 탭 콘텐츠들을 감싸는 바디 영역
- `.tab-content`: 개별 탭 콘텐츠 패널
- `.content-inner`: 실제 콘텐츠를 담는 내부 영역

### 필수 속성

- `data-active`: 최상위 `.component-tab`에 설정하며, 초기 활성화할 탭의 `data-tab-value` 값을 지정합니다.
- `data-tab-value`: 각 탭 버튼(`.tab-label`)과 콘텐츠(`.tab-content`)에 동일한 값을 부여하여 연결합니다.

> **TIP**: 각 탭 버튼과 콘텐츠는 반드시 동일한 `data-tab-value` 값을 가져야 정상적으로 연결됩니다.

## 접근성 (Accessibility)

- 탭 버튼은 `<button type="button">` 요소를 사용하여 키보드 탐색을 지원합니다.
- 활성 탭에는 `aria-selected="true"` 속성을 추가하여 스크린리더가 현재 상태를 인식할 수 있도록 합니다.
- 탭 버튼에는 `role="tab"`, 탭 리스트에는 `role="tablist"`, 탭 패널에는 `role="tabpanel"` 속성을 권장합니다.
- 키보드 방향키로 탭 간 이동이 가능하도록 구현하는 것을 권장합니다.

## 구현 가이드

### 공통 규칙

- 각 탭 버튼과 콘텐츠에 동일한 `data-tab-value` 값을 부여합니다.
- 컴포넌트의 `data-active` 속성 값으로 활성화할 탭을 지정합니다 (예: `data-active="tab1"`).
- 탭 버튼은 `<button type="button">` 요소를 사용합니다.
- 콘텐츠는 `.content-inner`로 한 번 더 감싸 스타일링의 유연성을 확보합니다.

### 클래스 & 상태 정의

| 클래스/속성        | 용도                          | 비고                                    |
| ------------------ | ----------------------------- | --------------------------------------- |
| `.component-tab`   | 탭 컴포넌트 최상위 래퍼       | 필수 클래스                             |
| `.tab-head`        | 탭 버튼 영역                  | 필수 클래스                             |
| `.tab-label`       | 개별 탭 버튼                  | 필수 클래스                             |
| `.tab-body`        | 탭 콘텐츠 영역                | 필수 클래스                             |
| `.tab-content`     | 개별 탭 콘텐츠 패널           | 필수 클래스                             |
| `.tab-scroll`      | 가로 스크롤 활성화            | `.component-tab`에 추가                 |
| `data-active`      | 초기 활성 탭 지정             | `.component-tab`에 설정                 |
| `data-tab-value`   | 탭 버튼과 콘텐츠 연결         | `.tab-label`, `.tab-content`에 동일 값 |
| `data-props-sticky` | 탭 헤더 고정 (Sticky) 활성화 | 값: `true` 또는 기준 요소 클래스        |

### 자바스크립트 연동

- 탭 버튼 클릭 시 해당 `data-tab-value` 값을 읽어 매칭되는 콘텐츠를 활성화합니다.
- 활성화된 탭 버튼과 콘텐츠에 `.is-active` 클래스를 추가하여 시각적 상태를 표시합니다.
- `data-active` 속성 값을 업데이트하여 현재 활성 탭을 추적합니다.

## 패턴 & 변형 (Variants)

> 각 변형은 "언제 사용해야 하는지"와 "기본 구조와 무엇이 다른지"를 함께 설명합니다.

### Tab in Tab (중첩 탭)

- **사용 시나리오**: 카테고리별로 하위 탭이 필요한 경우 (예: 상품 카테고리 > 세부 필터)
- **추가/변경 속성**: 하위 탭 컴포넌트도 `.component-tab` 클래스를 사용하며, 상위 탭의 `.tab-content` 내부에 배치됩니다.
- **상호작용**: 상위 탭 전환 시 해당 하위 탭 그룹이 표시됩니다.

```html
<!-- S: 상위탭 -->
<div class="component-tab" data-active="tab1">
  <div class="tab-head">
    <button type="button" class="tab-label" data-tab-value="tab1">Tab1</button>
    <button type="button" class="tab-label" data-tab-value="tab2">Tab2</button>
    <button type="button" class="tab-label" data-tab-value="tab3">Tab3</button>
  </div>
  <div class="tab-body">
    <!-- S: [tab1] 하위탭 -->
    <div class="component-tab tab-content" data-tab-value="tab1" data-active="tab1-1">
      <div class="tab-head">
        <button type="button" class="tab-label" data-tab-value="tab1-1">Tab1-1</button>
        <button type="button" class="tab-label" data-tab-value="tab1-2">Tab1-2</button>
        <button type="button" class="tab-label" data-tab-value="tab1-3">Tab1-3</button>
      </div>
      <div class="tab-body">
        <div class="tab-content" data-tab-value="tab1-1">
          <div class="content-inner">Tab content 1 - 1</div>
        </div>
        <div class="tab-content" data-tab-value="tab1-2">
          <div class="content-inner">Tab content 1 - 2</div>
        </div>
        <div class="tab-content" data-tab-value="tab1-3">
          <div class="content-inner">Tab content 1 - 3</div>
        </div>
      </div>
    </div>
    <!-- E: [tab1] 하위탭 -->

    <!-- S: [tab2] 하위탭 -->
    <div class="component-tab tab-content" data-tab-value="tab2" data-active="tab2-1">
      <div class="tab-head">
        <button type="button" class="tab-label" data-tab-value="tab2-1">Tab2-1</button>
        <button type="button" class="tab-label" data-tab-value="tab2-2">Tab2-2</button>
        <button type="button" class="tab-label" data-tab-value="tab2-3">Tab2-3</button>
      </div>
      <div class="tab-body">
        <div class="tab-content" data-tab-value="tab2-1">
          <div class="content-inner">Tab content 2 - 1</div>
        </div>
        <div class="tab-content" data-tab-value="tab2-2">
          <div class="content-inner">Tab content 2 - 2</div>
        </div>
        <div class="tab-content" data-tab-value="tab2-3">
          <div class="content-inner">Tab content 2 - 3</div>
        </div>
      </div>
    </div>
    <!-- E: [tab2] 하위탭 -->

    <!-- S: [tab3] 하위탭 -->
    <div class="component-tab tab-content" data-tab-value="tab3" data-active="tab3-1">
      <div class="tab-head">
        <button type="button" class="tab-label" data-tab-value="tab3-1">Tab3-1</button>
        <button type="button" class="tab-label" data-tab-value="tab3-2">Tab3-2</button>
        <button type="button" class="tab-label" data-tab-value="tab3-3">Tab3-3</button>
      </div>
      <div class="tab-body">
        <div class="tab-content" data-tab-value="tab3-1">
          <div class="content-inner">Tab content 3 - 1</div>
        </div>
        <div class="tab-content" data-tab-value="tab3-2">
          <div class="content-inner">Tab content 3 - 2</div>
        </div>
        <div class="tab-content" data-tab-value="tab3-3">
          <div class="content-inner">Tab content 3 - 3</div>
        </div>
      </div>
    </div>
    <!-- E: [tab3] 하위탭 -->
  </div>
</div>
<!-- E: 상위탭 -->
```

> **참고**: 하위 탭은 각각 독립적인 `data-active` 속성을 가지며, 상위 탭 전환 시에도 하위 탭의 활성 상태가 유지됩니다.

### Tab Head Sticky (고정 탭 헤더)

- **사용 시나리오**: 콘텐츠가 길어 스크롤 시에도 탭 헤더를 항상 표시해야 할 때
- **추가 속성**: `data-props-sticky="true"`를 `.component-tab`에 추가
- **동작**: 스크롤 시 탭 헤더가 화면 상단에 고정됩니다.

```html
<div class="component-tab" data-props-sticky="true" data-active="tab1">
  <div class="tab-head">
    <button type="button" class="tab-label" data-tab-value="tab1">TAB 1</button>
    <button type="button" class="tab-label" data-tab-value="tab2">TAB 2</button>
    <button type="button" class="tab-label" data-tab-value="tab3">TAB 3</button>
  </div>
  <div class="tab-body">
    <div class="tab-content" data-tab-value="tab1">
      <div class="content-inner" style="height: 100px;">Tab content 1</div>
    </div>
    <div class="tab-content" data-tab-value="tab2">
      <div class="content-inner" style="height: 100px;">Tab content 2</div>
    </div>
    <div class="tab-content" data-tab-value="tab3">
      <div class="content-inner" style="height: 100px;">Tab content 3</div>
    </div>
  </div>
</div>
```

### Tab Head Sticky: 위치 조절

- **사용 시나리오**: GNB나 헤더가 있어 탭 헤더의 고정 위치를 조정해야 할 때
- **추가 속성**: `data-props-sticky=".height-controll"` (기준 요소의 클래스명 지정)
- **동작**: 지정한 요소의 높이만큼 탭 헤더의 고정 위치가 아래로 조정됩니다.

```html
<p class="height-controll" style="position: sticky; top: 0; height: 50px; background-color: aliceblue; font-size: 20px; line-height: 50px; text-align: center;">타이틀 or GNB</p>
<div class="component-tab" data-props-sticky=".height-controll" data-active="tab1">
  <div class="tab-head">
    <button type="button" class="tab-label" data-tab-value="tab1">TAB 1</button>
    <button type="button" class="tab-label" data-tab-value="tab2">TAB 2</button>
    <button type="button" class="tab-label" data-tab-value="tab3">TAB 3</button>
  </div>
  <div class="tab-body">
    <div class="tab-content" data-tab-value="tab1">
      <div class="content-inner" style="height: 250px;">Tab content 1</div>
    </div>
    <div class="tab-content" data-tab-value="tab2">
      <div class="content-inner" style="height: 250px;">Tab content 2</div>
    </div>
    <div class="tab-content" data-tab-value="tab3">
      <div class="content-inner" style="height: 250px;">Tab content 3</div>
    </div>
  </div>
</div>
```

### Tab Scroll (가로 스크롤 탭)

- **사용 시나리오**: 탭이 많아 화면 너비를 초과할 때
- **추가 클래스**: `.tab-scroll`을 `.component-tab`에 추가
- **동작**: 탭 클릭 시 해당 탭이 좌측으로 이동하며 가로 스크롤이 활성화됩니다.

```html
<div class="component-tab tab-scroll" data-active="tab1">
  <div class="tab-head">
    <button type="button" class="tab-label" data-tab-value="tab1">TAB 1</button>
    <button type="button" class="tab-label" data-tab-value="tab2">TAB 2</button>
    <button type="button" class="tab-label" data-tab-value="tab3">TAB 3</button>
    <button type="button" class="tab-label" data-tab-value="tab4">TAB 4</button>
    <button type="button" class="tab-label" data-tab-value="tab5">TAB 5</button>
  </div>
  <div class="tab-body">
    <div class="tab-content" data-tab-value="tab1">
      <div class="content-inner">Tab content 1</div>
    </div>
    <div class="tab-content" data-tab-value="tab2">
      <div class="content-inner">Tab content 2</div>
    </div>
    <div class="tab-content" data-tab-value="tab3">
      <div class="content-inner">Tab content 3</div>
    </div>
    <div class="tab-content" data-tab-value="tab4">
      <div class="content-inner">Tab content 4</div>
    </div>
    <div class="tab-content" data-tab-value="tab5">
      <div class="content-inner">Tab content 5</div>
    </div>
  </div>
</div>
```

## 상세 예시 (Patterns)

### Tab Head Sticky + Scroll

Sticky 헤더와 가로 스크롤을 함께 사용하는 패턴입니다. 탭이 많고 콘텐츠가 길 때 유용합니다.

```html
<div class="component-tab tab-scroll" data-props-sticky="true" data-active="tab1">
  <div class="tab-head">
    <button type="button" class="tab-label" data-tab-value="tab1">TAB 1</button>
    <button type="button" class="tab-label" data-tab-value="tab2">TAB 2</button>
    <button type="button" class="tab-label" data-tab-value="tab3">TAB 3</button>
    <button type="button" class="tab-label" data-tab-value="tab4">TAB 4</button>
    <button type="button" class="tab-label" data-tab-value="tab5">TAB 5</button>
  </div>
  <div class="tab-body">
    <div class="tab-content" data-tab-value="tab1">
      <div class="content-inner" style="height: 400px;">Tab content 1</div>
    </div>
    <div class="tab-content" data-tab-value="tab2">
      <div class="content-inner" style="height: 400px;">Tab content 2</div>
    </div>
    <div class="tab-content" data-tab-value="tab3">
      <div class="content-inner" style="height: 400px;">Tab content 3</div>
    </div>
    <div class="tab-content" data-tab-value="tab4">
      <div class="content-inner" style="height: 400px;">Tab content 4</div>
    </div>
    <div class="tab-content" data-tab-value="tab5">
      <div class="content-inner" style="height: 400px;">Tab content 5</div>
    </div>
  </div>
</div>
```

### Tab in Tab + Sub Tab Sticky

중첩 탭에서 하위 탭 헤더만 고정하는 패턴입니다. 상위 탭은 일반 탭으로, 하위 탭만 Sticky를 적용합니다.

```html
<!-- S: 상위탭 -->
<div class="component-tab" data-active="tab1">
  <div class="tab-head">
    <button type="button" class="tab-label" data-tab-value="tab1">Tab1</button>
    <button type="button" class="tab-label" data-tab-value="tab2">Tab2</button>
    <button type="button" class="tab-label" data-tab-value="tab3">Tab3</button>
  </div>
  <div class="tab-body">
    <!-- S: [tab1] 하위탭 -->
    <div class="component-tab tab-content" data-tab-value="tab1" data-active="tab1-1" data-props-sticky="true">
      <div class="tab-head">
        <button type="button" class="tab-label" data-tab-value="tab1-1">Tab1-1</button>
        <button type="button" class="tab-label" data-tab-value="tab1-2">Tab1-2</button>
        <button type="button" class="tab-label" data-tab-value="tab1-3">Tab1-3</button>
      </div>
      <div class="tab-body">
        <div class="tab-content" data-tab-value="tab1-1">
          <div class="content-inner" style="height: 400px;">Tab content 1 - 1</div>
        </div>
        <div class="tab-content" data-tab-value="tab1-2">
          <div class="content-inner" style="height: 400px;">Tab content 1 - 2</div>
        </div>
        <div class="tab-content" data-tab-value="tab1-3">
          <div class="content-inner" style="height: 400px;">Tab content 1 - 3</div>
        </div>
      </div>
    </div>
    <!-- E: [tab1] 하위탭 -->

    <!-- S: [tab2] 하위탭 -->
    <div class="component-tab tab-content" data-tab-value="tab2" data-active="tab2-1" data-props-sticky="true">
      <div class="tab-head">
        <button type="button" class="tab-label" data-tab-value="tab2-1">Tab2-1</button>
        <button type="button" class="tab-label" data-tab-value="tab2-2">Tab2-2</button>
        <button type="button" class="tab-label" data-tab-value="tab2-3">Tab2-3</button>
      </div>
      <div class="tab-body">
        <div class="tab-content" data-tab-value="tab2-1">
          <div class="content-inner" style="height: 400px;">Tab content 2 - 1</div>
        </div>
        <div class="tab-content" data-tab-value="tab2-2">
          <div class="content-inner" style="height: 400px;">Tab content 2 - 2</div>
        </div>
        <div class="tab-content" data-tab-value="tab2-3">
          <div class="content-inner" style="height: 400px;">Tab content 2 - 3</div>
        </div>
      </div>
    </div>
    <!-- E: [tab2] 하위탭 -->

    <!-- S: [tab3] 하위탭 -->
    <div class="component-tab tab-content" data-tab-value="tab3" data-active="tab3-1" data-props-sticky="true">
      <div class="tab-head">
        <button type="button" class="tab-label" data-tab-value="tab3-1">Tab3-1</button>
        <button type="button" class="tab-label" data-tab-value="tab3-2">Tab3-2</button>
        <button type="button" class="tab-label" data-tab-value="tab3-3">Tab3-3</button>
      </div>
      <div class="tab-body">
        <div class="tab-content" data-tab-value="tab3-1">
          <div class="content-inner" style="height: 400px;">Tab content 3 - 1</div>
        </div>
        <div class="tab-content" data-tab-value="tab3-2">
          <div class="content-inner" style="height: 400px;">Tab content 3 - 2</div>
        </div>
        <div class="tab-content" data-tab-value="tab3-3">
          <div class="content-inner" style="height: 400px;">Tab content 3 - 3</div>
        </div>
      </div>
    </div>
    <!-- E: [tab3] 하위탭 -->
  </div>
</div>
<!-- E: 상위탭 -->
```

## API / Props Reference

| Props / 속성        | Type   | Default | Description                                                |
| ------------------- | ------ | ------- | ---------------------------------------------------------- |
| `data-active`       | string | -       | 초기 활성화할 탭의 `data-tab-value` 값                     |
| `data-tab-value`    | string | -       | 탭 버튼과 콘텐츠를 연결하는 고유 식별자                    |
| `data-props-sticky` | string | -       | 탭 헤더 고정 활성화 (`true` 또는 기준 요소 클래스명)       |
| `.tab-scroll`       | class  | -       | 가로 스크롤 활성화 (`.component-tab`에 클래스로 추가)      |
