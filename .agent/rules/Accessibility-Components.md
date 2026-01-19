---
trigger: model_decision
---

# 웹 접근성 컴포넌트 가이드

## 목차

- [공통](#공통)
- [Button](#button)
- [Icon](#icon)
- [Profile](#profile)
- [List](#list)
- [Form Element](#form-element)
- [Input](#input)
- [Checkbox & Radio](#checkbox--radio)
- [Select](#select)
- [Textarea](#textarea)
- [Switch](#switch)
- [Counter](#counter)
- [Date Picker](#date-picker)
- [Date Range Picker](#date-range-picker)
- [Dropzone API](#dropzone-api)
- [Snackbar](#snackbar)
- [Tooltip](#tooltip)
- [Modal](#modal)
- [Alert](#alert)
- [Carousel](#carousel)
- [Pagination](#pagination)
- [Breadcrumb](#breadcrumb)
- [Accordion](#accordion)
- [Step](#step)
- [Table](#table)
- [Tab](#tab)
- [Slider](#slider)

## 공통

- ARIA 속성이 `id` 속성을 참조하는 경우 중복되지 않는 고유한 값으로 설정해야 합니다.

## Button

1. **키보드 Tab 키 이동 시 기본 아웃라인 표시 확인**
   - **브라우저 기본 아웃라인**: 버튼 태그의 기본 아웃라인이 키보드 Tab 키로 이동 시 올바르게 표시되는지 확인합니다.
   - **모든 면의 아웃라인 확인**: 좌측, 우측 등 모든 면의 아웃라인이 가려지지 않고 모두 표시되는지 정확히 확인합니다.
2. **기본 아웃라인 적용**
   - **Chrome 기본 아웃라인 CSS 속성**:
     ```css
     :focus-visible {
       outline: -webkit-focus-ring-color auto 1px;
     }
     ```
   - **outline-offset 속성**: 아웃라인이 가려지는 문제를 개선하기 위해 **`outline-offset`** 속성을 사용할 수 있습니다.
     ```css
     button:focus-visible {
       outline-offset: 2px; /* 예시 값, 필요에 따라 조정 */
     }
     ```
3. **다른 컴포넌트의 아웃라인 스타일**
   - 버튼뿐만 아니라 아웃라인 스타일을 변경한 다른 컴포넌트에도 기본값(사용자 에이전트 스타일)을 적용해야 합니다.
4. **키보드 포커스와 마우스 호버 효과 일치**
   - **포커스 효과**: 키보드 포커스가 있을 때도 마우스 호버와 동일한 효과를 적용해야 합니다.
     ```css
     button:hover,
     button:focus-visible {
       /* 호버와 포커스 스타일 */
       background-color: #0056b3;
       color: white;
     }
     ```
5. **정보(i 아이콘) 버튼의 대체 텍스트**
   - **대체 텍스트 변경**: 정보(i 아이콘) 버튼의 대체 텍스트를 "도움말" 등 기능에 부합하는 명칭으로 변경을 권장합니다.

     ```html
     <button type="button" aria-label="도움말">
       <i class="ico-info" aria-hidden="true"></i>
     </button>

     또는

     <button type="button">
       <i class="ico-info" role="img" aria-label="도움말"></i>
     </button>

     또는

     <button type="button">
       <i class="ico-info" aria-hidden="true"></i>
       <span class="hide-txt">도움말</span>
     </button>
     ```

6. **Top 버튼의 기능 및 포커스 이동**
   - **Top 버튼**: 페이지 상단으로 스크롤되며, 초점도 최상위 컨테이너 요소 등으로 이동해야 합니다.
   - **컨테이너 요소에 초점 이동**: `tabindex="-1"` 속성을 적용하여 초점을 이동시킵니다.

     ```html
     <button onclick="scrollToTop()">Top</button>

     <script>
       function scrollToTop() {
         document.getElementById("wrap").scrollIntoView();
         document.getElementById("wrap").focus();
       }
     </script>

     <div id="wrap" tabindex="-1">
       <!-- 페이지 콘텐츠 -->
     </div>
     ```

7. **일반 태그 버튼으로 만들기**
   - `<a>`, `<button>` 태그를 사용하지 않고 버튼을 만들어야 할 경우
   - 아래와 같이 role 과 초점 이동 및 이벤트를 위한 속성을 추가 합니다.

     ```html
     <div class="btn" role="button" tabindex="0" onclick="handleClick()" onkeydown="handleKeyDown(event)" onkeyup="handleKeyUp(event)">
       <span class="btn-txt">텍스트</span>
     </div>

     <script>
       function handleClick() {
         alert("버튼 클릭됨");
       }

       function handleKeyDown(event) {
         if (event.key === "Enter" || event.key === " ") {
           event.preventDefault(); // Enter 키와 Space 키가 눌렸을 때 페이지가 스크롤되지 않도록 방지
           handleClick();
         }
       }

       function handleKeyUp(event) {
         if (event.key === " ") {
           event.preventDefault(); // Space 키가 눌렸을 때 페이지가 스크롤되지 않도록 방지
         }
       }
     </script>
     ```

## Icon

1. **아이콘 이미지에 대체 텍스트를 제공해야 합니다.**
   - **닫기 아이콘의 예**: `<i>` 태그에 `role="img"` 속성과 `aria-label="닫기"` 속성을 제공해야 합니다.
     - 모바일 환경에서의 초점을 고려하여 숨긴 텍스트 방식이 아닌 ARIA 속성을 사용합니다.

   ```html
   <i class="ico-close ico-normal" role="img" aria-label="닫기"></i>
   ```

2. **텍스트 있는 아이콘 버튼 등 아이콘에 의미를 제거해야 하는 경우 `aria-hidden="true"` 속성을 제공해야 합니다.**

   ```html
   <button>검색<i class="ico-search ico-normal" aria-hidden="true"></i></button>
   ```

## Profile

1. **Dropdown과 같이 관련 기능이 있는 경우에만 `<button>` 태그를 사용해야 합니다.**
   - 기능이 없는 경우 `<button>` 태그를 제거해야 합니다.

   ```html
   <!-- 기능이 있는 경우 -->
   <button aria-haspopup="true" aria-expanded="false">프로필 메뉴</button>

   <!-- 기능이 없는 경우 -->
   <span>프로필 메뉴</span>
   ```

2. **프로필 이미지에 대한 대체 텍스트를 제공해야 합니다.**
   - 별도의 `<img>` 태그가 없으므로 ARIA 속성이나 숨긴 텍스트를 사용하여 대체 텍스트를 제공해야 합니다.
     - 비로그인 또는 프로필 설정 전: "기본 프로필 사진"
     - 프로필 설정 후: "<유저명> 프로필 사진"
     - ARIA 속성 사용 예:
     ```html
     <span class="profile-img" role="img" aria-label="기본 프로필 사진"></span>
     ```
3. **Dropdown의 `<button>` 태그의 기능에 맞는 대체 텍스트를 제공해야 합니다.**
   - 프로필 사진의 대체 텍스트와 함께 “메뉴 더보기”와 같은 대체 텍스트를 제공해야 합니다.
   ```html
   <button aria-haspopup="true" aria-expanded="false">
     <span class="hide-txt">유저명 프로필 사진</span>
     <span class="hide-txt">메뉴 더보기</span>
   </button>
   ```
4. **Dropdown은 ARIA APG(Authoring Practices Guide)의 [Disclosure (Show/Hide) Pattern > Example Disclosure Navigation Menu](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) 가이드를 준수해야 합니다.**
   - 키보드의 방향키, Home 또는 End 키로 내비게이션 메뉴를 이동하는 기능은 적용하지 않음 (선택사항)

   ```html
   <div class="dropdown">
     <button aria-haspopup="true" aria-expanded="false" aria-controls="menu"> 메뉴 열기 </button>
     <ul id="menu" role="menu" aria-hidden="true">
       <li role="none"><a role="menuitem" href="#">프로필 보기</a></li>
       <li role="none"><a role="menuitem" href="#">설정</a></li>
       <li role="none"><a role="menuitem" href="#">로그아웃</a></li>
     </ul>
   </div>

   <style>
     .dropdown [aria-hidden="true"] {
       display: none;
     }
   </style>

   <script>
     document.querySelector(".dropdown button").addEventListener("click", function () {
       var expanded = this.getAttribute("aria-expanded") === "true" || false;
       this.setAttribute("aria-expanded", !expanded);
       var menu = document.getElementById("menu");
       menu.setAttribute("aria-hidden", expanded);
     });
   </script>
   ```

5. **Dropdown의 하위 메뉴가 페이지를 이동하는 링크인지, 기능을 실행하는 버튼인지, 대화 상자를 활성화하는 실행 버튼인지에 따라 해당하는 마크업을 구현해야 합니다.**
   - 페이지를 이동하는 링크:
     ```html
     <a href="profile.html">프로필 보기</a>
     ```
   - 기능을 실행하는 버튼:
     ```html
     <button>설정</button>
     ```
   - 대화 상자를 활성화하는 실행 버튼:
     ```html
     <button aria-haspopup="dialog">설정 열기</button>
     ```

## List

1. **`bbs-thumb`의 섬네일 이미지에 대체 텍스트를 제공해야 합니다.**
   - 요소의 기능과 목적을 제목과 내용만으로 충분히 이해할 수 있는 등 섬네일 이미지의 용도가 단순 장식용이어도 **`<img>`** 태그에 **`alt=""`** 속성을 제공해야 합니다.

   ```html
   <img src="thumbnail.jpg" alt="" />
   ```

2. **`bbs-thumb`의 `<a>` 태그 타입의 콘텐츠 마크업은 `<div>`, `<p>` 태그와 같은 블록 요소보다는 `<span>`, `<em>`, `<strong>` 태그 및 가상 요소와 같은 인라인 요소 사용을 적극 권장합니다.**
   - VoiceOver에서 **`<a>`** 태그에 블록 요소가 포함되면 링크 텍스트를 분리하여 음성 출력하는 현상을 개선하기 위함입니다.
   - **`<a>`** 태그에서만 발생하는 현상으로, 다른 타입에 **`<a>`** 태그를 사용할 때도 인라인 요소만을 사용하는 것을 권장합니다.
   - 인라인 요소를 사용하고 스타일은 자유롭게 적용할 수 있습니다.
   - 이 현상은 순차 탐색 시에 해당합니다.
   ```html
   <a href="link.html">
     <span>제목</span>
     <span>내용</span>
   </a>
   ```
3. **`bbs-thumb`의 `<div>` 태그 타입과 같이 ARIA를 사용한 버튼은 ARIA APG(Authoring Practices Guide)의 Button Pattern > Button Examples 가이드를 준수해야 합니다.**
   - 키보드 상호작용에서 엔터와 스페이스 키의 **`keydown`** 이벤트와 **`keyup`** 이벤트의 동작 차이를 주의해야 합니다.
   ```html
   <div role="button" tabindex="0" onkeydown="if(event.key === 'Enter' || event.key === ' ') { this.click(); }"> 버튼 텍스트 </div>
   ```
4. **버튼에 `aria-pressed` 속성은 토글 버튼에만 적용해야 합니다.**
   - 토글 기능이 없는 버튼에는 **`aria-pressed`** 속성을 제공하지 않아야 합니다.
   - 센스리더에서 **`aria-pressed`** 속성을 지원하지 않으므로 데스크톱 환경에서는 제한하고 대신 토글 상태 값을 숨긴 텍스트로 제공해야 합니다.

   ```html
   <button aria-pressed="true">
     토글 버튼
     <span class="sr-only">선택됨</span>
   </button>

   <button>일반 버튼</button>
   ```

## Form Element

1. **입력 서식이 여러 개로 나누어져 있는 경우 각각의 서식마다 고유한 레이블을 제공해야 합니다.**
   - 예: 주민등록번호 앞자리, 주민등록번호 뒷자리, 주민등록번호 뒤 첫 번째 자리
   - 서식이 여러 개로 나누어져 있는 경우 첫 번째 서식을 제외하고는 대부분 화면에 레이블이 표시되지 않으므로 **`aria-label`** 속성을 활용하여 레이블을 제공해야 합니다.
   - 첫 번째 서식에 **`<label>`** 태그를 사용하여 레이블을 제공하면 마우스 클릭으로 해당 서식을 활성화하는 등의 접근성 이점이 있습니다.
   - 첫 번째 서식에 **`<label>`** 태그 적용과 별개로 **`aria-label`** 속성으로 정확한 레이블을 제공해야 합니다.
   ```html
   <label for="ssn-front">주민등록번호 앞자리</label>
   <input type="text" id="ssn-front" aria-label="주민등록번호 앞자리" />
   <input type="text" aria-label="주민등록번호 뒷자리" />
   <input type="text" aria-label="주민등록번호 뒤 첫 번째 자리" />
   ```
2. **레이블 텍스트가 화면에 표시되는 경우 `<label>` 태그 사용을 적극 권장합니다.**
   ```html
   <label for="name">이름</label> <input type="text" id="name" />
   ```
3. **필수 입력 서식의 경우 `<input>` 태그에 `aria-required="true"` 속성을 적용하면 스크린 리더에서 필수 입력임을 음성으로 출력합니다.**
   - 센스리더는 **`<input>`** 태그에서만 **`aria-required`** 속성을 지원하므로 호환성을 고려하여 레이블에 “필수”와 같은 대체 텍스트를 제공해야 합니다.
   - ARIA의 **`aria-required`** 속성과 HTML의 **`required`** 속성의 센스리더 음성 출력 결과는 동일합니다.
   ```html
   <label for="email">이메일 <span aria-hidden="true">필수</span></label> <input type="email" id="email" aria-required="true" required />
   ```
4. **Input과 동일한 원칙이 적용됩니다.**

## Input

1. **`<input>` 태그에 초점 이동 시 브라우저 기본 아웃라인을 제공해야 합니다.**
   - 파일 첨부 서식의 경우, 우측의 파일 추가 레이블이 버튼처럼 보이므로, `<input>` 태그에 초점 이동 시 해당 `<label>` 태그에 아웃라인을 표시하는 방법도 고려할 수 있습니다.
   ```html
   <label for="file-upload" style="outline: auto;">
     파일 추가
     <input type="file" id="file-upload" style="outline: none;" />
   </label>
   ```
2. **레이블 텍스트가 화면에 표시되는 경우 `<label>` 태그 사용을 적극 권장합니다.**
   - `<label>` 태그 안에 `<input>` 태그를 포함하여 레이블을 암시적으로 제공하면 레이블 오류를 방지할 수 있습니다.
   ```html
   <label
     >이름
     <input type="text" />
   </label>
   ```
3. **레이블 텍스트가 화면에 표시되지 않는 경우 `<input>` 태그에 `aria-label` 속성으로 레이블을 제공해야 합니다.**
   - 레이블은 서식명만 간단명료하게 제공해야 합니다.
   ```html
   <input type="text" aria-label="이름" />
   ```
4. **`<input>` 태그에 `<label>` 태그와 `aria-label` 속성을 모두 제공한 경우 우선순위에 유의해야 합니다.**
   - `<label>` 태그를 적용하면 `aria-label` 속성은 필수사항이 아니지만, 둘 다 제공할 경우 `aria-label` 속성값이 해당 서식의 레이블 명으로 사용됩니다.
   ```html
   <label for="email">이메일</label> <input type="email" id="email" aria-label="이메일 주소" />
   ```
5. **센스리더는 `<label>` 태그나 `aria-label` 속성 등으로 레이블을 제공하면 placeholder 텍스트를 음성 출력하지 못하므로, 날짜 입력과 같은 특정 형식을 placeholder에 제공할 때는 같은 내용을 레이블에도 포함해야 합니다.**
   - 센스리더를 제외한 타 스크린 리더에서 중복 음성 출력을 줄이고, 간단명료한 레이블 제공을 위해 placeholder 텍스트나 title 속성의 부연 설명은 필요한 서식에만 최소한으로 제공해야 합니다.
   ```html
   <label for="birthdate">생년월일 (YYYY-MM-DD)</label> <input type="text" id="birthdate" placeholder="YYYY-MM-DD" aria-label="생년월일" />
   ```
6. **텍스트 입력 서식의 삭제(지우기)(x 아이콘) 버튼의 대체 텍스트를 “내용 지우기” 등 좀 더 기능에 부합하는 명칭으로 제공해야 합니다.**
   ```html
   <button aria-label="내용 지우기">x</button>
   ```
7. **비밀번호 입력 서식의 “비밀번호 보이게 설정” / “비밀번호 안 보이게 설정” 버튼의 대체 텍스트를 “비밀번호 표시” / “비밀번호 숨기기” 등 좀 더 간략한 명칭으로 권장합니다.**
   - 가상 요소에 텍스트 사용을 지양하므로 대체 텍스트는 숨긴 텍스트나 `aria-label` 속성으로 제공해야 합니다.
   ```html
   <button aria-label="비밀번호 표시">👁️</button>
   ```
8. **필수 입력 서식의 경우 `<input>` 태그에 `aria-required="true"` 속성을 제공하면 스크린 리더에서 필수 입력임을 음성 출력합니다.**
   - 센스리더는 `<input>` 태그에서만 `aria-required` 속성을 지원하므로 호환성을 고려하여 레이블에 “필수”와 같은 대체 텍스트를 제공해야 합니다.

   ```html
   <label for="username">사용자 이름 <span aria-hidden="true">필수</span></label> <input type="text" id="username" aria-required="true" required />
   ```

9. **입력 오류가 발생한 서식에 `aria-invalid="true"` 속성을 적용하면 스크린 리더에서 잘못된 입력임을 음성 출력합니다.**
   - 사용자가 올바르게 다시 입력하면 **`aria-invalid="false"`**로 변경해야 합니다.
   ```html
   <input type="text" aria-invalid="true" aria-errormessage="error-message" /> <span id="error-message" role="alert">잘못된 입력입니다.</span>
   ```
10. **입력 서식 하단의 오류 메시지 요소를 `aria-errormessage="IDREF"` 속성으로 연결할 수 있습니다.**
    - **`aria-errormessage`** 속성은 **`aria-invalid="true"`** 속성과 함께 적용해야 합니다.
    ```html
    <input type="text" aria-invalid="true" aria-errormessage="error-message" /> <span id="error-message" role="alert">잘못된 입력입니다.</span>
    ```
11. **입력 서식 하단의 설명 문구에 접근성을 제공하기 위한 추가 작업이 필요할 수 있습니다.**
    - 입력 서식과 설명 문구를 **`aria-describedby="IDREF"`** 속성으로 연결함으로써 선형 구조 오류를 개선할 수 있습니다.
    ```html
    <label for="phonenumber">전화번호</label>
    <input type="text" id="phonenumber" aria-describedby="phone-desc" />
    <span id="phone-desc">예: 010-1234-5678</span>
    ```

## Checkbox & Radio

1. **`<input>` 태그의 브라우저 기본 아웃라인을 확인해야 합니다.**
   - **Chrome 기본 아웃라인 CSS 속성 (사용자 에이전트 스타일시트)**:
     ```css
     :focus-visible {
       outline: -webkit-focus-ring-color auto 1px;
     }
     ```
   - **outline-offset 속성**: 아웃라인의 가려짐 등을 개선할 수 있습니다.
   - **아웃라인 표시**: 올바르게 표시하기 위해서는 `<input>` 태그의 크기와 위치가 체크박스의 체크 아이콘과 동일해야 합니다.
     - `<input>` 태그에 체크 아이콘을 스타일링하는 것을 권장합니다.
   ```html
   <style>
     input[type="checkbox"]:focus-visible {
       outline: -webkit-focus-ring-color auto 1px;
       outline-offset: 2px;
     }
   </style>
   <label for="agree">
     <input type="checkbox" id="agree" />
     이용약관 동의
   </label>
   ```
2. **약관동의 팝업 버튼을 `<button>` 태그로 변경하고, 약관명 + 상세보기 팝업으로 대체 텍스트를 제공해야 합니다.**
   - 지금과 같이 “팝업 열림”으로 제공해도 무방하지만, 새 창 링크는 “새창”으로, 팝업 버튼은 “팝업”으로 간략하게 제공해 보려고 합니다.
   - 예: [필수] 이용약관 동의 상세보기 팝업
   ```html
   <button aria-label="[필수] 이용약관 동의 상세보기 팝업"> 이용약관 동의 상세보기 </button>
   ```

## Select

1. **레이블 텍스트가 화면에 표시되는 경우 `<label>` 태그 사용을 적극 권장합니다.**
   ```html
   <label for="country">국가 선택</label>
   <select id="country" name="country">
     <option value="kr">대한민국</option>
     <option value="us">미국</option>
     <option value="jp">일본</option>
   </select>
   ```
2. **레이블 텍스트가 화면에 표시되지 않는 경우 `<select>` 태그에 `aria-label` 속성으로 레이블을 제공해야 합니다.**
   ```html
   <select aria-label="국가 선택" name="country">
     <option value="kr">대한민국</option>
     <option value="us">미국</option>
     <option value="jp">일본</option>
   </select>
   ```
3. **Select-custom에 ARIA APG(Authoring Practices Guide)의 [Combobox Pattern > Select-Only Combobox Example](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/) 가이드를 적용해야 합니다.**
   - 가이드에 제시된 ARIA 속성과 키보드 상호작용 기능을 적용해야 합니다.
   - `<select>` 태그와 유사한 사용자 경험을 제공합니다.
   - ARIA 속성이 `id` 속성을 참조하는 경우 중복되지 않는 고유한 값으로 설정해야 합니다.

   ```html
   <div class="combobox" role="combobox" aria-expanded="false" aria-haspopup="listbox">
     <input type="text" aria-autocomplete="list" aria-controls="listbox1" aria-activedescendant="option1" aria-labelledby="combobox1" />
     <ul role="listbox" id="listbox1">
       <li id="option1" role="option" aria-selected="false">대한민국</li>
       <li id="option2" role="option" aria-selected="false">미국</li>
       <li id="option3" role="option" aria-selected="false">일본</li>
     </ul>
   </div>
   ```

   ```html
   <style>
     .combobox input:focus-visible {
       outline: -webkit-focus-ring-color auto 1px;
     }
     .combobox ul {
       display: none;
     }
     .combobox[aria-expanded="true"] ul {
       display: block;
     }
   </style>

   <script>
     document.querySelector(".combobox input").addEventListener("focus", function () {
       this.parentElement.setAttribute("aria-expanded", "true");
     });
     document.querySelector(".combobox input").addEventListener("blur", function () {
       this.parentElement.setAttribute("aria-expanded", "false");
     });
   </script>
   ```

## Textarea

1. **`<textarea>` 태그에 초점 이동 시 브라우저 기본 아웃라인을 제공해야 합니다.**

   ```html
   <style>
     textarea:focus-visible {
       outline: -webkit-focus-ring-color auto 1px;
     }
   </style>

   <textarea></textarea>
   ```

2. **레이블 텍스트가 화면에 표시되는 경우 `<label>` 태그 사용을 적극 권장합니다.**

   ```html
   <label for="comments">의견을 입력해 주세요</label> <textarea id="comments"></textarea>
   ```

3. **레이블 텍스트가 화면에 표시되지 않는 경우 `<textarea>` 태그에 `aria-label` 속성으로 레이블을 제공해야 합니다.**
   ```html
   <textarea aria-label="의견을 입력해 주세요"></textarea>
   ```
4. **Input 컴포넌트와 동일한 접근성 규칙을 적용합니다.**
   - 필수 입력 서식의 경우 **`aria-required="true"`** 속성을 제공하여 스크린 리더에서 필수 입력임을 음성 출력합니다.
   - 입력 오류가 발생한 서식에 **`aria-invalid="true"`** 속성을 적용하여 스크린 리더에서 잘못된 입력임을 음성 출력합니다.
   - 입력 서식 하단의 설명 문구를 **`aria-describedby`** 속성으로 연결하여 선형 구조 오류를 개선합니다.

   ```html
   <label for="description">설명 <span aria-hidden="true">필수</span></label>
   <textarea id="description" aria-required="true" required aria-describedby="description-help"></textarea>
   <span id="description-help">여기에 설명을 입력해 주세요.</span>
   ```

## Switch

1. `<input>` 태그의 초점을 브라우저 기본 아웃라인으로 제공해야 합니다.

   ```html
   <style>
     input[type="checkbox"]:focus-visible {
       outline: -webkit-focus-ring-color auto 1px;
     }
   </style>

   <input type="checkbox" id="switch" />
   ```

2. 레이블 텍스트가 화면에 표시되지 않는 경우 `<input>` 태그에 `aria-label` 속성으로 레이블을 제공해야 합니다.

   ```html
   <input type="checkbox" aria-label="스위치" id="switch" />
   ```

3. **스크린 리더 사용자는 체크박스의 `checked` 속성에 따라 스위치의 상태를 인지하므로, 상태 값 중복을 피하고자 ON/OFF 스위치 텍스트 요소에 `aria-hidden="true"` 속성을 제공해야 합니다.**

   ```html
   <label for="switch" class="switch">
     <input type="checkbox" id="switch" />
     <span class="switch-txt" aria-hidden="true">ON</span>
   </label>
   ```

4. `<input>` 태그에 `role="switch"` 속성을 제공하면 스크린 리더에서 전환 버튼임을 음성 출력합니다.
   - 현재 최신 버전의 센스리더에서 비정상적으로 음성 출력하므로 사용을 제한합니다.

   ```html
   <input type="checkbox" aria-label="스위치" role="switch" id="switch" />
   ```

5. **ARIA APG(Authoring Practices Guide)의 Switch Pattern > [Switch Example Using HTML Checkbox Input](https://www.w3.org/WAI/ARIA/apg/patterns/switch/examples/switch-checkbox/) 가이드를 참고할 수 있습니다.**

   ```html
   <label for="switch" class="switch">
     <input type="checkbox" id="switch" aria-label="스위치" aria-hidden="true" />
     <span class="switch-txt" aria-hidden="true">ON</span>
   </label>
   ```

## Counter

1. **센스리더에서 마이너스 버튼, 플러스 버튼으로 음성 출력하므로 정확한 대체 텍스트를 제공해야 합니다.**
   - 예: "인원수 추가", "인원수 감소"와 같이 기능에 대해 명확한 대체 텍스트를 제공하는 것을 권장합니다.

   ```html
   <button aria-label="인원수 감소">-</button>
   <input type="text" aria-label="인원 수" value="0" />
   <button aria-label="인원수 추가">+</button>
   ```

2. **초기화 버튼에 대체 텍스트를 제공해야 합니다.**
   ```html
   <button aria-label="카운터 초기화">초기화</button>
   ```
3. **화면 설계에 따라 수량을 직접 입력하는 경우 Input 컴포넌트의 가이드를 준수해야 합니다.**
   ```html
   <label for="quantity">수량 입력</label> <input type="number" id="quantity" name="quantity" aria-label="수량 입력" />
   ```

## Date Picker

1. **Mobiscroll 및 FullCalendar를 사용한 달력 예제들은 잘못된 ARIA 속성 사용, 키보드 조작 불가능, 초점 표시 부재, 스크린 리더 미지원 등의 접근성 오류가 있습니다.**
   - 라이브러리가 제공하는 접근성 옵션을 다시 한번 확인하거나, 접근성이 보장된 다른 라이브러리를 사용해야 합니다.
   - 또는 사용자가 직접 날짜를 입력할 수 있도록 제공하거나, **`<input>`** 태그의 **`date`** 타입을 적극 권장합니다.
     - 날짜를 직접 입력으로 제공할 때는 레이블에 입력 형식을 포함하는 등의 추가 작업에 대한 자세한 내용을 Input 컴포넌트에서 확인 바랍니다.

   ```html
   <label for="birthdate">생년월일 (YYYY-MM-DD)</label> <input type="date" id="birthdate" name="birthdate" />
   ```

2. **입력 서식을 읽기 전용(`readonly` 속성)으로 제공한 경우에는 달력의 접근성뿐만 아니라 키보드로 달력 대화 상자를 닫을 수 있도록 닫기(취소) 버튼을 제공해야 합니다.**

   ```html
   <input type="text" id="datepicker" readonly aria-label="날짜 선택" /> <button aria-label="달력 닫기">닫기</button>
   ```

3. **ARIA APG(Authoring Practices Guide)의 Dialog (Modal) Pattern > [Date Picker Dialog Example](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/) 가이드를 참고해야 합니다.**
   - Date Picker 컴포넌트의 두 라이브러리를 적절히 합치면 ARIA 가이드와 유사해지는 것 같지만, 결과적으로 제대로 구현되지 않은 것 같습니다.

   ```html
   <div role="dialog" aria-modal="true" aria-labelledby="dialog-label">
     <h2 id="dialog-label">날짜 선택</h2>
     <table role="grid">
       <!-- 달력 내용 -->
     </table>
     <button aria-label="취소">닫기</button>
   </div>
   ```

4. **현재 최신 버전의 센스리더와 경우에 따라 NVDA도 `role="grid"` ARIA 속성을 제대로 지원하지 않으므로 사용을 제한합니다.**
   - 당분간은 **`<table>`**과 **`<button>`** 태그로 구조화하고, “선택됨” 숨긴 텍스트를 제공하며, 키보드 Tab 키 운용 등 기존의 달력 패턴을 권장합니다.

   ```html
   <table>
     <thead>
       <tr>
         <th>일</th>
         <th>월</th>
         <th>화</th>
         <th>수</th>
         <th>목</th>
         <th>금</th>
         <th>토</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td><button aria-label="1월 1일">1</button></td>
         <td><button aria-label="1월 2일">2</button></td>
         <!-- 더 많은 날짜 -->
       </tr>
     </tbody>
   </table>
   <span class="sr-only">선택됨</span>
   ```

## Date Range Picker

1. **날짜를 직접 입력으로 제공한 경우 레이블에 입력 형식을 포함해야 합니다.**
   - 예: **`시작일 YYYY-MM-DD`**
   - 자세한 내용은 Input 컴포넌트를 참고 바랍니다.

   ```html
   <label for="start-date">시작일 (YYYY-MM-DD)</label>
   <input type="date" id="start-date" name="start-date" />
   <label for="end-date">종료일 (YYYY-MM-DD)</label>
   <input type="date" id="end-date" name="end-date" />
   ```

2. **날짜를 직접 입력할 수 있는 경우 접근성이 미흡한 달력에 초점 이동이 되지 않도록 해야 합니다.**
   - 예를 들어, 입력 서식이나 달력 아이콘을 클릭했을 때만 달력이 표시되도록 하여 키보드 초점 이동 시에는 달력이 표시되지 않도록 합니다.

   ```html
   <label for="start-date">시작일 (YYYY-MM-DD)</label>
   <input type="date" id="start-date" name="start-date" />
   <button aria-label="달력 열기" onclick="showCalendar()">📅</button>
   <div id="calendar" style="display:none;">
     <!-- 달력 내용 -->
   </div>

   <script>
     function showCalendar() {
       var calendar = document.getElementById("calendar");
       if (calendar.style.display === "none") {
         calendar.style.display = "block";
       } else {
         calendar.style.display = "none";
       }
     }
   </script>
   ```

3. **Lightpick에서 날짜를 직접 입력할 경우 입력한 값이 달력에 반영되어야 합니다.**
   - 날짜를 직접 입력한 경우에도 달력에서 선택한 것과 동일하게 동작해야 합니다.

   ```html
   <label for="start-date">시작일 (YYYY-MM-DD)</label>
   <input type="text" id="start-date" name="start-date" aria-label="시작일 (YYYY-MM-DD)" oninput="updateCalendar()" />
   <label for="end-date">종료일 (YYYY-MM-DD)</label>
   <input type="text" id="end-date" name="end-date" aria-label="종료일 (YYYY-MM-DD)" oninput="updateCalendar()" />
   <div id="calendar">
     <!-- Lightpick 달력 -->
   </div>

   <script>
     function updateCalendar() {
       // Lightpick 달력의 날짜 업데이트 로직
     }
   </script>
   ```

## Dropzone API

1. **Dropzone 영역의 "Drop files here to upload", "파일을 마우스로 끌어오세요" 버튼은 부적절하므로 `<button>` 태그를 제거하여 마우스 사용만을 지원하되, 별도의 "파일 추가" 버튼을 제공하는 것이 바람직합니다.**
   - 마우스 기능과 동등한 대체 수단을 제공하는 것입니다.

   ```html
   <div id="dropzone" aria-label="파일을 이곳에 드래그하여 업로드하세요"></div>
   <button aria-label="파일 추가" onclick="document.getElementById('fileInput').click()"> 파일 추가 </button>
   <input type="file" id="fileInput" style="display:none" />
   ```

2. **첨부한 파일을 삭제할 때 초점이 사라지지 않도록 초점 관리가 필요합니다.**
   - 일반적으로 삭제한 항목의 다음 항목의 "삭제" 버튼으로 초점 이동을 제공합니다.
   - 마지막 항목을 삭제한 경우 이전 항목(새로운 마지막 항목)의 "삭제" 버튼으로 초점 이동을 제공합니다.
   - 모든 항목을 삭제한 경우 "파일 추가" 버튼으로 초점 이동을 제공합니다.

   ```html
   <ul id="fileList">
     <li>
       <span>파일1.pdf</span>
       <button aria-label="파일1 삭제" onclick="deleteFile(this)">삭제</button>
     </li>
     <li>
       <span>파일2.pdf</span>
       <button aria-label="파일2 삭제" onclick="deleteFile(this)">삭제</button>
     </li>
   </ul>
   <button aria-label="파일 추가" onclick="document.getElementById('fileInput').click()"> 파일 추가 </button>
   <input type="file" id="fileInput" style="display:none" />

   <script>
     function deleteFile(button) {
       var li = button.parentElement;
       var ul = li.parentElement;
       var nextFocusElement = null;

       if (li.nextElementSibling) {
         nextFocusElement = li.nextElementSibling.querySelector("button");
       } else if (li.previousElementSibling) {
         nextFocusElement = li.previousElementSibling.querySelector("button");
       } else {
         nextFocusElement = document.querySelector('button[aria-label="파일 추가"]');
       }

       ul.removeChild(li);

       if (nextFocusElement) {
         nextFocusElement.focus();
       }
     }
   </script>
   ```

## Snackbar

1. **ARIA APG(Authoring Practices Guide)의 Alert Pattern > [Alert Example](https://www.w3.org/WAI/ARIA/apg/patterns/alert/examples/alert/) 가이드를 준수해야 합니다.**
   - 동적으로 생성한 스낵바 컨테이너 요소에 **`role="alert"`** 속성을 제공해야 합니다.

   ```html
   <div role="alert" aria-live="assertive" class="snackbar">
     파일이 성공적으로 업로드되었습니다.
     <button onclick="closeSnackbar()">닫기</button>
   </div>
   ```

2. **일정 시간 이후 자동으로 사라지는 Snackbar 컴포넌트는 접근성 위배 사항이므로 사용을 제한해야 합니다.**
   - 스크린 리더를 사용하지 않는 화면 확대 사용자나 시야가 좁은 사용자는 스낵바 메시지가 표시되었는지 인지하지 못할 수 있습니다.
   - 한국형 웹 콘텐츠 접근성 지침 2.1 기준, “응답 시간 조절” 검사 항목 위배에 해당합니다.
3. **일정 시간이 지난 후에 자동으로 사라지지 않고 별도의 “닫기” 버튼을 제공하는 등 대화형 형식일 경우 Alert 컴포넌트를 참고 바랍니다.**

   ```html
   <div role="alert" aria-live="assertive" class="snackbar">
     파일이 성공적으로 업로드되었습니다.
     <button onclick="closeSnackbar()">닫기</button>
   </div>

   <script>
     function closeSnackbar() {
       var snackbar = document.querySelector(".snackbar");
       snackbar.style.display = "none";
     }
   </script>
   ```

## Tooltip

1. **툴팁 메시지가 표시될 때 메시지 컨테이너 요소의 닫기(X 아이콘) 버튼으로 초점 이동하는 기능을 제거해야 합니다.**
   - 선형 구조에서 툴팁 버튼과 메시지 컨테이너 요소가 서로 인접하기 때문에 별도의 초점 이동이 필요하지 않습니다.
     - 닫기 버튼으로 초점 이동 시 역순으로 탐색해야 하는 불편함이 발생합니다.
   - 툴팁 메시지가 표시됐을 때 툴팁 버튼을 가리는 등 초점 인식에 문제가 발생하는 경우에는 메시지 컨테이너 요소에 **`tabindex="-1"`** 속성을 추가한 후 초점 이동을 제공할 수 있습니다.
     - 이때는 메시지 컨테이너 요소에 초점이 표시되어야 합니다.

   ```html
   <button id="tooltip-button" aria-describedby="tooltip">도움말</button>
   <div id="tooltip" role="tooltip" aria-hidden="true">
     툴팁 메시지 내용
     <button aria-label="도움말 닫기" onclick="hideTooltip()">X</button>
   </div>

   <script>
     function showTooltip() {
       var tooltip = document.getElementById("tooltip");
       tooltip.setAttribute("aria-hidden", "false");
       tooltip.focus();
     }

     function hideTooltip() {
       var tooltip = document.getElementById("tooltip");
       tooltip.setAttribute("aria-hidden", "true");
     }
   </script>
   ```

2. **툴팁 메시지가 표시될 때 메시지 컨테이너 요소의 `aria-hidden` 속성값을 올바르게 적용해야 합니다.**
   - 툴팁 메시지가 표시될 때: `aria-hidden="false"`

   ```html
   <div id="tooltip" role="tooltip" aria-hidden="true">
     툴팁 메시지 내용
     <button aria-label="도움말 닫기" onclick="hideTooltip()">X</button>
   </div>
   ```

3. **메시지 컨테이너 요소의 닫기(X 아이콘) 버튼에 대체 텍스트를 제공해야 합니다.**
   - 툴팁 버튼의 대체 텍스트가 “도움말”이라면, “도움말 닫기”와 같이 제공해야 합니다.

   ```html
   <button aria-label="도움말 닫기" onclick="hideTooltip()">X</button>
   ```

4. **ARIA 속성이 `id` 속성을 참조하는 경우 중복되지 않는 고유한 값으로 설정해야 합니다.**

   ```html
   <button id="tooltip-button-1" aria-describedby="tooltip-1">도움말</button>
   <div id="tooltip-1" role="tooltip" aria-hidden="true">
     툴팁 메시지 내용
     <button aria-label="도움말 닫기" onclick="hideTooltip()">X</button>
   </div>
   ```

## Modal

1. **ARIA APG(Authoring Practices Guide)의 Dialog (Modal) Pattern > [Modal Dialog Example](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/) 가이드를 준수해야 합니다.**
   - 기본적으로 Alert and Message Dialogs Pattern과 유사하나, 일부 ARIA 속성 및 대화 상자가 표시될 때의 초점 이동 등의 차이점에 주의해야 합니다.
2. **센스리더에서 `aria-modal="true"` 속성의 미지원 문제를 해결하기 위해 `aria-hidden="true"` 또는 `inert` 속성을 적용할 때, 중첩 대화 상자의 경우도 고려해야 합니다.**
   - 자세한 내용은 Alert 컴포넌트를 참고 바랍니다.
3. **Modal 대화 상자의 닫기(X 아이콘) 버튼에 “닫기”와 같은 대체 텍스트를 제공해야 합니다.**

   ```html
   <button aria-label="닫기" onclick="closeModal()">X</button>
   ```

4. **Modal 대화 상자의 닫기(X 아이콘) 버튼을 디자인과 동일한 선형 구조로 구성해야 합니다.**
   - 만약 디자인상 닫기 버튼이 헤더 영역에 위치한다면, 닫기 버튼은 헤더 영역에 배치되어야 합니다.
   - 초점이 포커스 트랩에 의해 대화 상자 내부를 벗어날 수 없기 때문에 닫기 버튼을 디자인과 동일한 선형 구조로 제공해도 됩니다.
   - ARIA APG에 따르면 헤더의 닫기 버튼이 대화 상자가 표시될 때 초점 이동하는 첫 번째 요소가 될 수 있습니다.

   ```html
   <div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
     <div class="modal-header">
       <h2 id="dialog-title">대화 상자 제목</h2>
       <button aria-label="닫기" onclick="closeModal()">X</button>
     </div>
     <div class="modal-content">
       <!-- 내용 -->
     </div>
   </div>
   ```

5. **Modal 대화 상자의 콘텐츠에는 적절한 수준의 제목 태그를 제공해야 합니다.**
   - 대화 상자에 타이틀이 있는 경우 이를 제목(예: **`<h2>`**) 태그로 구조화하여 대화 상자의 레이블로 활용할 수 있습니다.
   - 대화 상자에 타이틀이 없는 경우 **`aria-label`** 속성을 사용하여 대화 상자의 레이블을 제공할 수 있습니다.
   - 그 외 콘텐츠 블록에도 논리적인 수준으로 제목 태그를 제공해야 합니다.

   ```html
   <div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
     <h2 id="dialog-title">대화 상자 제목</h2>
     <p>대화 상자 내용</p>
     <button aria-label="닫기" onclick="closeModal()">닫기</button>
   </div>
   ```

6. **Modal 대화 상자를 활성화하는 실행 버튼에 “팝업”과 같은 팝업 알림을 제공해야 합니다.**
   - 센스리더가 **`aria-haspopup="dialog"`** 속성을 지원하지 않으므로 간단명료한 대체 텍스트를 숨긴 텍스트로 제공합니다.
     - 예: **`<button>우편번호 검색<span class="hide-txt">팝업</span></button>`**

   ```html
   <button onclick="openModal()"> 우편번호 검색<span class="hide-txt">팝업</span> </button>
   ```

7. **ARIA 속성이 `id` 속성을 참조하는 경우 중복되지 않는 고유한 값으로 설정해야 합니다.**

   ```html
   <button id="open-modal-1" aria-describedby="modal-description-1"> 열기 </button>
   <div role="dialog" id="modal-1" aria-labelledby="dialog-title-1" aria-describedby="modal-description-1">
     <h2 id="dialog-title-1">대화 상자 제목</h2>
     <p id="modal-description-1">대화 상자 설명</p>
     <button aria-label="닫기" onclick="closeModal()">닫기</button>
   </div>
   ```

## Alert

1. **ARIA APG(Authoring Practices Guide)의 Alert and Message Dialogs Pattern > [Alert Dialog Example](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/examples/alertdialog/) 가이드를 준수해야 합니다.**
   - ARIA 속성과 키보드 기능, 초점 관리 등의 가이드를 적용해야 합니다.

   ```html
   <div role="alertdialog" aria-labelledby="alert-title" aria-describedby="alert-description" aria-modal="true">
     <h2 id="alert-title">경고</h2>
     <p id="alert-description">경고 메시지 내용</p>
     <button aria-label="닫기" onclick="closeAlert()">닫기</button>
   </div>
   ```

2. **센스리더에서 `aria-modal="true"` 속성을 지원하지 않으므로 `aria-hidden="true"` 또는 `inert` 속성을 추가로 제공해야 합니다.**
   - Alert 대화 상자가 표시되었을 때 본문 콘텐츠의 최상위 요소에 **`aria-hidden="true"`** 또는 **`inert`** 속성을 적용해야 합니다.
     - 예: **`aria-hidden="true"`** 속성을 적용한 경우:

   ```html
   <div id="wrap" aria-hidden="true">
     <!-- 본문 콘텐츠 -->
   </div>
   <div role="alertdialog" aria-labelledby="alert-title" aria-describedby="alert-description" aria-modal="true">
     <h2 id="alert-title">경고</h2>
     <p id="alert-description">경고 메시지 내용</p>
     <button aria-label="닫기" onclick="closeAlert()">닫기</button>
   </div>

   <script>
     function closeAlert() {
       document.getElementById("wrap").setAttribute("aria-hidden", "false");
       // Alert 대화 상자를 닫는 로직
     }
   </script>
   ```

   - 본문 컨테이너 요소와 대화 상자 요소의 구조를 분리함으로써 **`aria-hidden`** 속성의 잘못된 적용 오류를 예방할 수 있습니다.
   - Alert 대화 상자를 닫으면 본문 콘텐츠의 최상위 요소에 적용한 **`aria-hidden`** 속성을 **`false`**로 변경하거나 해당 속성을 제거해야 합니다.

3. **ARIA 속성이 `id` 속성을 참조하는 경우 중복되지 않는 고유한 값으로 설정해야 합니다.**

   ```html
   <div role="alertdialog" aria-labelledby="alert-title-1" aria-describedby="alert-description-1" aria-modal="true">
     <h2 id="alert-title-1">경고</h2>
     <p id="alert-description-1">경고 메시지 내용</p>
     <button aria-label="닫기" onclick="closeAlert()">닫기</button>
   </div>
   ```

## Carousel

1. **Swiper.js의 접근성(a11y) API를 참고하여 내비게이션, 페이지네이션 등의 대체 텍스트를 기본 언어와 동일하게 제공해야 합니다.**
   - 한국어 예:
     - Next slide -> 다음 슬라이드
     - Go to slide {{index}} -> {{index}}번째 슬라이드로 이동

   ```jsx
   var swiper = new Swiper(".swiper-container", {
     a11y: {
       prevSlideMessage: "이전 슬라이드",
       nextSlideMessage: "다음 슬라이드",
       firstSlideMessage: "첫 번째 슬라이드",
       lastSlideMessage: "마지막 슬라이드",
       paginationBulletMessage: "{{index}}번째 슬라이드로 이동",
     },
   });
   ```

2. **재생/정지, 내비게이션, 클릭할 수 있는 페이지네이션 등의 컨트롤은 슬라이드 이전에 배치해야 합니다.**

   ```html
   <div class="carousel-controls">
     <button aria-label="재생">▶</button>
     <button aria-label="정지">■</button>
     <button aria-label="이전 슬라이드">←</button>
     <button aria-label="다음 슬라이드">→</button>
   </div>
   <div class="swiper-container">
     <!-- 슬라이드 콘텐츠 -->
   </div>
   ```

3. **Swiper.js에서 접근성 알림을 위해 제공한 요소에 `display: none` 속성을 적용하여 렌더링 되지 않도록 해야 합니다.**

   ```css
   .swiper-notification {
     display: none;
   }
   ```

4. **캐러셀의 내비게이션 또는 클릭할 수 있는 페이지네이션 컨트롤을 제공한 경우 화면에 표시된 슬라이드 항목만 키보드 및 스크린 리더로 조작할 수 있도록 해야 합니다.**

   ```html
   <div class="swiper-slide" inert>슬라이드 1</div>
   <div class="swiper-slide" inert>슬라이드 2</div>
   <div class="swiper-slide">슬라이드 3</div>
   ```

5. **캐러셀에 내비게이션 또는 클릭할 수 있는 페이지네이션 컨트롤이 없거나, 메뉴 링크 목록과 같이 화면에 표시되지 않은 항목에 키보드의 Tab 키로 바로 접근하는 것이 더 적합한 경우는 예외입니다.**
   - 일반적으로 내비게이션을 제공하는 이미지 또는 텍스트 링크 캐러셀은 **`inert`** 속성의 적용을 권장합니다.

   ```html
   <div class="swiper-slide" inert>이미지 1</div>
   <div class="swiper-slide" inert>이미지 2</div>
   <div class="swiper-slide">이미지 3</div>
   ```

6. **슬라이드의 콘텐츠가 텍스트나 이미지로만 구성되어 키보드의 초점 이동이 불가능한 경우 반드시 내비게이션 또는 클릭할 수 있는 페이지네이션을 제공해야 합니다.**

   ```html
   <div class="swiper-container">
     <div class="swiper-wrapper">
       <div class="swiper-slide">이미지 또는 텍스트 슬라이드 1</div>
       <div class="swiper-slide">이미지 또는 텍스트 슬라이드 2</div>
       <div class="swiper-slide">이미지 또는 텍스트 슬라이드 3</div>
     </div>
     <!-- 내비게이션 -->
     <div class="swiper-button-prev" aria-label="이전 슬라이드"></div>
     <div class="swiper-button-next" aria-label="다음 슬라이드"></div>
     <!-- 페이지네이션 -->
     <div class="swiper-pagination" aria-label="슬라이드 페이지네이션"></div>
   </div>
   ```

## Pagination

1. **페이지네이션 링크의 컨테이너 요소를 `<nav aria-label="페이지네이션">` 태그로 변경해야 합니다.**

   ```html
   <nav aria-label="페이지네이션">
     <ul>
       <!-- 페이지네이션 링크들 -->
     </ul>
   </nav>
   ```

2. **“첫 페이지로 이동”, “전 페이지로 이동” 링크의 링크 텍스트 수정을 권장합니다.**
   - 예: 처음 페이지로 이동, 이전 페이지로 이동

   ```html
   <a href="#" aria-label="처음 페이지로 이동">처음</a> <a href="#" aria-label="이전 페이지로 이동">이전</a>
   ```

3. **현재 페이지에서는 `<a>` 태그를 제거하여 불필요한 초점 이동을 방지해야 합니다.**
   - **`<a>`** 태그를 제거하고 **`<span>`** 태그로 대체한 경우에도 **`<span>`** 태그에 **`aria-current="page"`** 속성을 제공할 수 있습니다.

   ```html
   <span aria-current="page">1</span>
   <a href="#">2</a>
   <a href="#">3</a>
   ```

4. **처음 페이지, 이전 페이지 및 마지막 페이지, 다음 페이지 링크가 시각적으로 비활성화될 경우 키보드 및 스크린 리더 사용자를 위한 몇 가지 조치가 필요합니다.**
   - 스크린 리더에 비활성 상태 전달: 비활성화된 **`<a>`** 태그에 **`aria-disabled="true"`** 속성을 제공

   ```html
   <a href="#" aria-disabled="true" tabindex="-1">처음</a
   ```

   - 키보드 접근 제한: **`<a>`** 태그의 **`href`** 속성을 제거하거나 **`tabindex="-1"`** 속성을 제공
   - 페이지 이동 기능 차단: **`<a>`** 태그의 페이지 이동 기능을 스크립트 등으로 차단
   - 이전 상태로 복귀: 활성 상태로 변경되면 이전 상태로 복원

   ```html
   <script>
     document.querySelectorAll('a[aria-disabled="true"]').forEach(function (element) {
       element.addEventListener("click", function (event) {
         event.preventDefault();
       });
     });
   </script>
   ```

5. **More의 경우 말줄임표 아이콘에 대체 텍스트를 제공해야 합니다.**
   - 예: **`<i class="pagination-item more-before" role="img" aria-label="말줄임표"></i>`**

   ```html
   <nav aria-label="페이지네이션">
     <ul>
       <li><a href="#" aria-label="처음 페이지로 이동">처음</a></li>
       <li><a href="#" aria-label="이전 페이지로 이동">이전</a></li>
       <li><span aria-current="page">1</span></li>
       <li><a href="#">2</a></li>
       <li><a href="#">3</a></li>
       <li>
         <i class="pagination-item more-before" role="img" aria-label="말줄임표"></i>
       </li>
       <li><a href="#" aria-label="다음 페이지로 이동">다음</a></li>
       <li><a href="#" aria-label="마지막 페이지로 이동">마지막</a></li>
     </ul>
   </nav>
   ```

## Breadcrumb

1. **홈 링크의 링크 텍스트는 기본 언어와 일치해야 합니다.**
   - 한국어 예: "홈" 또는 "홈으로"

   ```html
   <nav aria-label="Breadcrumb">
     <ol>
       <li><a href="/">홈</a></li>
       <li><a href="/category">카테고리</a></li>
       <li aria-current="page">현재 페이지</li>
     </ol>
   </nav>
   ```

2. **Base의 경우 ARIA APG(Authoring Practices Guide)의 Breadcrumb Pattern > Breadcrumb Example 가이드를 준수해야 합니다.**
   - 센스리더 사용 가능

   ```html
   <nav aria-label="Breadcrumb">
     <ol>
       <li><a href="/">홈</a></li>
       <li><a href="/category">카테고리</a></li>
       <li aria-current="page">현재 페이지</li>
     </ol>
   </nav>
   ```

3. **Select의 경우 ARIA APG(Authoring Practices Guide)의 Disclosure (Show/Hide) Pattern > [Example Disclosure Navigation Menu](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) 가이드를 준수해야 합니다.**
   - 키보드의 방향키, Home 또는 End 키로 내비게이션 메뉴를 이동하는 기능은 적용하지 않습니다 (선택사항).
   - Tab 키로 이동합니다.
   - 브레드크럼 버튼에 **`title`** 속성이나 숨긴 텍스트로 1 depth 메뉴와 같은 부연 설명을 추가해야 합니다.
     - 예: **`<button title="1 depth 메뉴">현재 메뉴명</button>`**
     - 브레드크럼 버튼에 현재 메뉴명만 표시되어 버튼의 대체 텍스트가 미흡하므로 **`title`** 속성이나 숨긴 텍스트로 부연 설명을 제공해야 합니다.
     - **`aria-label`** 속성이 아닌, **`title`** 속성이나 숨긴 텍스트를 사용해야 합니다.

   ```html
   <nav aria-label="Breadcrumb">
     <ol>
       <li><a href="/">홈</a></li>
       <li><button title="1 depth 메뉴">카테고리</button></li>
       <li aria-current="page">현재 페이지</li>
     </ol>
   </nav>
   ```

4. **ARIA 속성이 `id` 속성을 참조하는 경우 중복되지 않는 고유한 값으로 설정해야 합니다.**

   ```html
   <nav aria-label="Breadcrumb">
     <ol>
       <li><a href="/" id="home-link">홈</a></li>
       <li><a href="/category" id="category-link">카테고리</a></li>
       <li aria-current="page" id="current-page">현재 페이지</li>
     </ol>
   </nav>
   ```

## Accordion

1. **아코디언 헤더를 활성화했을 때 초점이 아코디언 콘텐츠로 이동하지 않고 해당 헤더 버튼에 유지되어야 합니다.**

   ```html
   <button aria-expanded="false" aria-controls="accordion-content-1"> 아코디언 제목 1 </button>
   <div id="accordion-content-1" hidden>
     <!-- 아코디언 콘텐츠 -->
   </div>

   <script>
     document.querySelector("button[aria-expanded]").addEventListener("click", function () {
       var expanded = this.getAttribute("aria-expanded") === "true";
       this.setAttribute("aria-expanded", !expanded);
       var content = document.getElementById(this.getAttribute("aria-controls"));
       content.hidden = expanded;
     });
   </script>
   ```

2. **아코디언 콘텐츠 요소에 `tabindex="0"` 속성을 사용해야 하는 경우는 아코디언 콘텐츠가 텍스트나 이미지 등으로만 구성되어 키보드로 조작할 수 없는 스크롤 요소일 때에만 해당합니다.**

   ```html
   <div id="accordion-content-2" tabindex="0" hidden>
     <!-- 텍스트나 이미지로만 구성된 아코디언 콘텐츠 -->
   </div>
   ```

3. **ARIA APG(Authoring Practices Guide)의 Accordion Pattern (Sections With Show/Hide Functionality)와 Disclosure (Show/Hide) Pattern의 차이를 이해하고 구분하여 사용해야 합니다.**
   - Accordion Pattern (Sections With Show/Hide Functionality)의 예제는 세 개의 섹션으로 구성된 콘텐츠 블록 중에서 사용자가 원하는 섹션을 선택하여 표시할 수 있는 예제입니다.
     - 각각의 아코디언 헤더는 **`<h3>`** 태그를 사용하여 해당 섹션의 제목을 나타냅니다.
     - 콘텐츠 섹션은 레이블이 지정된 **`role="region"`** 속성에 의해 **`<section>`** 태그로 인식되고, 랜드마크 항목으로 분류되어 스크린 리더 사용자의 빠른 탐색을 지원합니다.

   ```html
   <h3>
     <button aria-expanded="false" aria-controls="section1">섹션 1</button>
   </h3>
   <section id="section1" role="region" aria-labelledby="section1-header" hidden>
     <h4 id="section1-header">섹션 1 제목</h4>
     <p>섹션 1 내용</p>
   </section>
   ```

   - Disclosure (Show/Hide) Pattern은 콘텐츠를 축소(숨김)하거나 확장(표시)할 수 있는 패턴을 의미합니다. 대표적으로 FAQ(자주 묻는 질문)에서 사용됩니다.
     - 표시 버튼과 버튼으로 가시성이 제어되는 콘텐츠로 구성된 부분은 Accordion Example과 동일하나, 마크업 구조에 **`<dl>`** 태그를 사용하고 아코디언 헤더의 제목(**`<h3>`**) 태그와 아코디언 패널의 레이블이 지정된 **`role="region"`** 속성이 없는 등의 차이점이 있습니다.

   ```html
   <button aria-expanded="false" aria-controls="faq1">질문 1</button>
   <div id="faq1" hidden>
     <p>답변 1</p>
   </div>

   <script>
     document.querySelectorAll("button[aria-controls]").forEach((button) => {
       button.addEventListener("click", function () {
         const expanded = this.getAttribute("aria-expanded") === "true";
         this.setAttribute("aria-expanded", !expanded);
         document.getElementById(this.getAttribute("aria-controls")).hidden = expanded;
       });
     });
   </script>
   ```

4. **ARIA 속성이 `id` 속성을 참조하는 경우 중복되지 않는 고유한 값으로 설정해야 합니다.**

   ```html
   <button aria-expanded="false" aria-controls="accordion-content-unique-1"> 아코디언 제목 1 </button>
   <div id="accordion-content-unique-1" hidden>
     <!-- 아코디언 콘텐츠 -->
   </div>
   ```

## Step

1. **현재 단계 요소에 현재 단계 상태 정보를 제공해야 합니다.**
   - 현재 단계 요소에 **`aria-current="step"`** 속성을 적용하면 스크린 리더에서 현재 단계임을 음성으로 출력합니다. (센스리더 사용 가능)
     - 예: **`<li><span aria-current="step">2단계</span></li>`** <!-- 센스리더 버그가 있으므로 `<li>` 태그에 적용하지 않도록 주의 -->
   - iOS의 VoiceOver에서 **`<span>`** 태그 등 텍스트 요소에 **`aria-current`** 속성을 적용하면 음성 출력하지 않으므로 모바일 환경을 고려한다면 숨긴 텍스트로 제공해야 합니다.
     - 예: **`<li><span>2단계</span><span class="hide-txt">현재 단계</span></li>`**
   - 가상 요소에 텍스트 사용을 지양하므로 상태 정보는 숨긴 텍스트나 **`aria-current`** 속성으로 제공해야 합니다.

   ```html
   <ol>
     <li><span>1단계</span></li>
     <li> <span aria-current="step">2단계</span><span class="hide-txt">현재 단계</span> </li>
     <li><span>3단계</span></li>
   </ol>
   ```

2. **단계 표시는 순서 있는 목록(`<ol>` 태그)이 의미에 더 부합하는 것 같습니다.**
   - 하지만, **`list-style-type: none`** 속성을 적용하면 스크린 리더에서 구분할 수 없습니다.

   ```html
   <ol style="list-style-type: none;">
     <li><span>1단계</span></li>
     <li> <span aria-current="step">2단계</span><span class="hide-txt">현재 단계</span> </li>
     <li><span>3단계</span></li>
   </ol>
   ```

3. **순서 있는 단계 표시에서 "완료됨" 상태 정보는 필수가 아닙니다.**

   ```html
   <ol>
     <li><span>1단계 완료됨</span></li>
     <li> <span aria-current="step">2단계</span><span class="hide-txt">현재 단계</span> </li>
     <li><span>3단계</span></li>
   </ol>
   ```

## Table

1. **`<caption>` 태그에 표의 제목과 요약 정보를 제공해야 합니다.**
   - 예: **`공지사항: 번호, 제목, 조회수`**

   ```html
   <table>
     <caption> 공지사항: 번호, 제목, 조회수 </caption>
     <thead>
       <tr>
         <th>번호</th>
         <th>제목</th>
         <th>조회수</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td>1</td>
         <td>공지사항 제목 1</td>
         <td>100</td>
       </tr>
       <tr>
         <td>2</td>
         <td>공지사항 제목 2</td>
         <td>150</td>
       </tr>
     </tbody>
   </table>
   ```

2. **스크롤 테이블을 키보드로 조작할 수 있도록 스크롤(`overflow: scroll` 속성) 요소에 `tabindex="0"` 속성을 제공해야 합니다.**
   - 스크롤하기 전의 테이블 콘텐츠에 링크나 버튼과 같은 초점을 이동할 수 있는 요소가 포함된 경우 해당 요소로 초점 이동하여 스크롤 할 수 있으므로 별도의 **`tabindex="0"`** 속성을 제공하지 않습니다.
   - 키보드 방향키로 값을 조절하는 셀렉트나 라디오, 슬라이더, 텍스트 필드는 제외입니다.

   ```html
   <div style="overflow: scroll;" tabindex="0">
     <table>
       <caption> 공지사항: 번호, 제목, 조회수 </caption>
       <thead>
         <tr>
           <th>번호</th>
           <th>제목</th>
           <th>조회수</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td>1</td>
           <td>공지사항 제목 1</td>
           <td>100</td>
         </tr>
         <tr>
           <td>2</td>
           <td>공지사항 제목 2</td>
           <td>150</td>
         </tr>
       </tbody>
     </table>
   </div>
   ```

## Tab

1. **ARIA APG(Authoring Practices Guide)의 Tabs Pattern > [Example of Tabs with Automatic Activation](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/) 또는 [Example of Tabs with Manual Activation](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-manual/) 가이드를 올바르게 적용해야 합니다.**
   - 누락된 ARIA 속성을 모두 적용해야 합니다.
   - 탭 패턴의 키보드 상호작용 적용을 보류하되, 추후 추가될 가능성을 염두에 두어 사전 구현을 권장합니다.
     - 관련하여 `role="tab"` 요소가 `<button>` 태그인 경우 `tabindex` 속성이 불필요해집니다.
   - 탭 패널 요소의 `tabindex` 속성은 적용하지 않습니다.
     - 탭 패널 요소의 `tabindex="0"` 속성은 내부 스크롤이 필요한 특정 경우에만 적용하는 것으로, 자세한 내용은 웹와치 전문가 심사 1차 보고서를 참고 바랍니다.
   - ARIA 속성이 `id` 속성을 참조하는 경우 중복되지 않는 고유한 값으로 설정해야 합니다.

   ```html
   <div role="tablist" aria-label="Sample Tabs">
     <button role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1"> 탭 1 </button>
     <button role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2"> 탭 2 </button>
   </div>
   <div id="panel-1" role="tabpanel" aria-labelledby="tab-1">
     <!-- 탭 1 콘텐츠 -->
   </div>
   <div id="panel-2" role="tabpanel" aria-labelledby="tab-2" hidden>
     <!-- 탭 2 콘텐츠 -->
   </div>

   <script>
     document.querySelectorAll('[role="tab"]').forEach((tab) => {
       tab.addEventListener("click", function () {
         document.querySelectorAll('[role="tab"]').forEach((t) => t.setAttribute("aria-selected", "false"));
         document.querySelectorAll('[role="tabpanel"]').forEach((p) => (p.hidden = true));

         this.setAttribute("aria-selected", "true");
         document.getElementById(this.getAttribute("aria-controls")).hidden = false;
       });
     });
   </script>
   ```

2. **페이지 내의 탭 전환이 아닌, 하위 메뉴나 연관된 다른 페이지로 링크 이동하는 경우에는 Tabs Pattern으로 적용해서는 안 됩니다.**
   - 하위 메뉴를 예로 들면, `<nav aria-label="하위 메뉴">`, `<ul>`, `<li>`, `<a href aria-current="page">` 태그 등을 활용하여 하위 메뉴의 링크 목록을 제공해야 합니다.
   - 탭 패턴과는 달리 페이지를 이동할 때는 페이지 타이틀(문서 제목)도 함께 변경해야 한다는 점을 유념해야 합니다.

   ```html
   <nav aria-label="하위 메뉴">
     <ul>
       <li><a href="page1.html" aria-current="page">페이지 1</a></li>
       <li><a href="page2.html">페이지 2</a></li>
       <li><a href="page3.html">페이지 3</a></li>
     </ul>
   </nav>
   ```

## Slider

1. **슬라이더에 레이블 제공 시 명확한 레이블을 제공해야 합니다.**
   - 예: "최소 금액", "최대 금액" (슬라이더라는 역할명은 스크린 리더에서 제공하므로 레이블에 포함하지 않음)

   ```html
   <label for="min-amount">최소 금액</label>
   <input type="range" id="min-amount" name="min-amount" min="0" max="10000" step="100" />
   <label for="max-amount">최대 금액</label>
   <input type="range" id="max-amount" name="max-amount" min="0" max="10000" step="100" />
   ```

2. **슬라이더와 함께 직접 입력 서식을 제공한 경우 Input 컴포넌트를 참고하여 해당 입력 서식에도 명확한 레이블을 제공해야 합니다.**

   ```html
   <label for="amount-input">금액 입력</label> <input type="number" id="amount-input" name="amount-input" min="0" max="10000" step="100" />
   ```

3. **슬라이더 01의 `<input>` 태그에 `aria-valuetext` 속성을 제공하여 스크린 리더 친화적인 설명을 제공해야 합니다.**
   - 금액을 설정하는 슬라이더의 예를 들면, 현재 값이 1100이고 원 단위 표기일 때, **`<input>`** 태그에 **`aria-valuetext="1,100원"`** 속성을 적용하면 스크린 리더가 현재 값을 “1100”이 아닌 “1,100원”으로 음성 출력합니다.

   ```html
   <input type="range" id="slider-01" name="slider-01" min="0" max="10000" step="100" aria-valuetext="1,100원" />
   ```

4. **슬라이더 01 `<input>` 태그의 부모 요소에 적용된 `aria-hidden="true"` 속성을 제거해야 합니다.**

   ```html
   <div>
     <label for="slider-01">슬라이더 01</label>
     <input type="range" id="slider-01" name="slider-01" min="0" max="10000" step="100" aria-valuetext="1,100원" />
   </div>
   ```

5. **슬라이더 02와 같이 라이브러리를 사용한 경우 ARIA APG(Authoring Practices Guide)의 Slider Pattern > [Media Seek Slider Example](https://www.w3.org/WAI/ARIA/apg/patterns/slider/examples/slider-seek/) 또는 Slider (Multi-Thumb) Pattern > [Horizontal Multi-Thumb Slider Example](https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/examples/slider-multithumb/) 등 가이드를 준수해야 합니다.**
   - 슬라이더 02에 적용한 라이브러리는 키보드 및 센스리더로 사용할 수 있습니다.

   ```html
   <div role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" aria-orientation="horizontal" tabindex="0">
     <!-- 슬라이더 콘텐츠 -->
   </div>
   ```

6. **이전 버전인 AOS 10에서는 TalkBack을 통해 ARIA를 사용한 커스텀 슬라이더의 값을 제스처로 조절할 수 없기 때문에 `<input>` 태그를 사용하거나, 값을 직접 입력하도록 대체 수단을 제공해야 할 수 있습니다. 최신 버전의 AOS에서 재테스트가 필요합니다.**

   ```html
   <label for="slider-03">슬라이더 03</label>
   <input type="range" id="slider-03" name="slider-03" min="0" max="100" step="1" />
   <label for="slider-03-input">슬라이더 값 입력</label>
   <input type="number" id="slider-03-input" name="slider-03-input" min="0" max="100" step="1" />
   ```
