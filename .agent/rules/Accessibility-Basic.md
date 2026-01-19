---
trigger: always_on
---

# 웹 접근성 정의

> 웹 접근성은 모든 사용자가 웹 사이트의 정보에 접근하고, 기능을 사용할 수 있도록 보장하는 것을 목표로 합니다. 이는 장애가 있는 사용자들을 포함하여 모든 사용자에게 동등한 웹 경험을 제공하는 것을 의미합니다.

## 웹 접근성에 대한 W3C의 정의

- 웹 접근성은 장애를 지닌 분들이 웹을 이용할 수 있는 것을 의미합니다.
- 특히, 웹 접근성은 장애를 지닌 분들이 웹을 인지하고, 이해하고, 탐색하고 상호작용할 수 있도록 하는 것을 의미합니다. 그리고 그분들은 웹에 기여할 수 있습니다. 또한, 웹 접근성은 나이가 들면서 능력이 변하는 노인을 포함하여 다른 많은 분들에게도 이익이 됩니다.
- 출처: [WAI > Introduction to Web Accessibility](https://www.w3.org/WAI/fundamentals/accessibility-intro/)

## 정보 접근성: 모든 사용자를 위한 더 편리한 서비스

- 정보 접근성은 모든 사용자가 특정 환경이나 신체적 장애에 상관없이 웹 사이트나 애플리케이션에서 제공하는 모든 정보에 동등하게 접근하고 이용할 수 있도록 보장해 주는 것입니다. 장애인뿐만 아니라 고령자, 비장애인도 접근성의 대상이 되며 4가지 핵심 원리는 다음과 같습니다.
- **인식의 용이성**: 모든 콘텐츠는 사용자가 인식할 수 있어야 합니다.
- **운용의 용이성**: 사용자 인터페이스 구성 요소는 조작 가능하고 내비게이션할 수 있어야 합니다.
- **이해의 용이성**: 콘텐츠는 장애 유무에 관계없이 이해할 수 있게 구성되어야 합니다.
- **견고성**: 웹 콘텐츠는 미래의 기술로도 접근할 수 있도록 견고하게 만들어야 합니다.
- 출처: [네이버 접근성 페이지 : Accessibility Guide](https://accessibility.naver.com/accessibility)

## 웹 접근성 이용자 유형

- **전맹 사용자**: 시각을 통해 화면 정보를 인식하기 어려우므로 화면의 텍스트를 음성으로 읽어주는 화면 낭독 프로그램(스크린 리더)을 이용하십니다.
- **색각 이상 사용자**: 특정한 색이나 색상 구별이 어려워 색으로만 구분자를 표시할 경우 인지하기 어렵습니다.
- **고령자와 약시자**: 통상적인 크기의 폰트를 인식하기 어려우므로 폰트 확대 기능 또는 프로그램이 필요합니다.
- **청각 장애 사용자**: 동영상의 음성, 오디오, 알람과 같은 청각 콘텐츠는 인식할 수 없습니다.
- **뇌병변 장애 및 지체 장애 사용자**: 마우스와 같은 포인팅 장치를 이용하지 않는 사용자는 키보드만으로도 모든 정보에 접근하고 조작할 수 있어야 합니다.
- **일시적 장애를 겪고 있는 사용자**: 사고로 인해 일시적으로 신체의 일부를 활용하지 못하거나 갑자기 극심한 불안감을 느껴 발작을 일으키는 사용자도 고려해야 합니다.
- 출처: [네이버 접근성 페이지 : Accessibility Guide](https://accessibility.naver.com/accessibility)

## 접근성을 위한 HTML 및 CSS 사용법

- **시맨틱 HTML 마크업**: 의미론적인 HTML 태그 사용으로 콘텐츠의 구조를 명확하게 합니다. 예를 들어, **`<header>`**, **`<nav>`**, **`<main>`**, **`<footer>`** 등의 태그를 사용하여 문서의 주요 부분을 나타냅니다.
- **키보드 접근성**: 모든 인터랙션은 키보드만으로도 접근 가능해야 합니다. CSS를 사용하여 포커스가 있는 요소에 시각적 표시를 제공합니다.
- **대체 텍스트 제공**: 이미지에는 **`alt`** 속성을 사용하여 대체 텍스트를 제공합니다. 이는 시각 장애가 있는 사용자들이 이미지의 내용을 이해하는 데 필요합니다.
- **색상 대비**: 색상 대비는 WCAG 가이드라인에 따라 충분해야 합니다. 텍스트와 배경 사이에 충분한 대비를 제공하여 콘텐츠의 가독성을 높입니다.

## 숨김 텍스트 `hide-txt` 클래스

- 컨텐츠 및 컴포넌트의 설명과 상태 정보는 **`hide-txt`** 클래스를 사용 합니다.

```html
<!-- 검색 아이콘만 있는 버튼일 경우 : 숨김텍스트로 버튼 설명 -->
<button type="button" class="btn-search">
  <span class="hide-txt">검색</span>
  <i class="ico-search" aria-hidden="true"></i>
</button>
```

- 상태 정보를 표기할 때 가상클래스인 **`::after`** **`::before`** 의 **`content:” ”`** 속성은 사용하지 않습니다.
- 상태 정보는 **`aria`** 태그를 사용 합니다. **`aria`** 태그 사용 불가시 **`hide-txt`** 를 사용합니다.

```html
<!-- 탭 컴포넌트 예제 -->
<div class="component-tab" role="tablist" aria-label="Sample Tabs">
  <button class="btn-tab-item" role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1" tabindex="0">Tab 1</button>
  <button class="btn-tab-item" role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2" tabindex="-1">Tab 2</button>
  <button class="btn-tab-item" role="tab" aria-selected="false" aria-controls="panel-3" id="tab-3" tabindex="-1">Tab 3</button>

  <div id="panel-1" role="tabpanel" aria-labelledby="tab-1" tabindex="0">
    <p>Content for Tab 1</p>
  </div>
  <div id="panel-2" role="tabpanel" aria-labelledby="tab-2" tabindex="0" hidden>
    <p>Content for Tab 2</p>
  </div>
  <div id="panel-3" role="tabpanel" aria-labelledby="tab-3" tabindex="0" hidden>
    <p>Content for Tab 3</p>
  </div>
</div>

<!-- 숨김 텍스트를 사용할 경우 -->
<div class="component-tab" role="tablist" aria-label="Sample Tabs">
  <button role="tab" aria-controls="panel-1" id="tab-1" tabindex="0">
    Tab 1
    <span class="hide-txt">선택됨</span>
  </button>
  <button role="tab" aria-controls="panel-2" id="tab-2" tabindex="-1"> Tab 2 </button>
  <button role="tab" aria-controls="panel-3" id="tab-3" tabindex="-1"> Tab 3 </button>
  <!-- 코드 생략 -->
</div>
```

```scss
/* 탭 컴포넌트 예제 */
.component-tab {
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 0;
  margin: 0;

  .btn-tab-item {
    padding: 10px 15px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    margin-bottom: -1px;
    border-bottom: 1px solid transparent;

    &:focus {
      outline: none;
    }

    &[aria-selected="true"] {
      background-color: #fff;
      border-color: #ccc;
      border-bottom-color: #fff;
    }

    &:not([aria-selected="true"]) {
      background-color: #eee;
    }
  }

  [role="tabpanel"] {
    padding: 20px;
    border: 1px solid #ccc;

    &[hidden] {
      display: none;
    }
  }
}
```

## 웹 접근성 관련 사이트

- [웹접근성 연구소](https://www.wah.or.kr:444/index.asp)
- [NAVER Accessibility](https://accessibility.naver.com/)
- [한국시각장애인연합회](http://www.kbuwel.or.kr/)
- [WebWatch](http://www.webwatch.or.kr/)
- [웹 접근성 자가점검 매뉴얼(2011)](https://www.wah.or.kr:444/board/boardView.asp?brd_sn=4&brd_idx=706)