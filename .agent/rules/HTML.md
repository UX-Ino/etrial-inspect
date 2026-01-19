---
trigger: always_on
---

# HTML

> 효과적이고 접근성 높은 웹사이트를 구축하기 위해 HTML을 작성할 때 따라야 할 주요 규칙과 모범 사례를 정리했습니다.

## 문서구조

- **Doctype 선언**: 모든 HTML 문서는 `<!DOCTYPE html>`로 시작하여 HTML5 문서임을 명시해야 합니다.
- **문서 인코딩**: 문자 인코딩은 `<meta charset="UTF-8">`를 사용하여 UTF-8로 설정합니다.

```html
<!DOCTYPE html> <meta charset="UTF-8" />
```

## 메타데이타

> 메타 태그(meta tag)는 웹 페이지의 메타데이터(metadata)를 정의하는 데 사용되며, HTML 문서의 **`<head>`** 섹션 내에 위치합니다. 메타 태그는 웹 페이지에 대한 정보를 제공하지만, 페이지의 콘텐츠로 직접적으로 표시되지는 않습니다. 메타 태그의 주요 목적은 다음과 같습니다:

1. **검색 엔진 최적화(Search Engine Optimization, SEO):** 메타 태그는 검색 엔진이 웹 페이지의 내용을 이해하고 적절하게 색인화하는 데 도움을 줍니다. 예를 들어, **`<meta name="description" content="페이지 설명">`**은 검색 결과에 표시될 페이지의 간략한 설명을 제공합니다.
2. **문서 메타데이터 제공:** 페이지의 문자 인코딩, 저자, 만료 날짜, 페이지 설명 등과 같은 다양한 메타데이터를 정의합니다. 이 정보는 브라우저나 검색 엔진이 문서를 올바르게 해석하고 처리하는 데 필요합니다.
3. **웹 브라우저 제어:** 일부 메타 태그는 웹 브라우저의 행동을 제어하는 데 사용됩니다. 예를 들어, **`<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover">`**은 반응형 웹 디자인에서 모바일 기기에서의 보기 영역(viewport)을 설정합니다.
4. **소셜 미디어 통합:** Open Graph(OG) 태그와 같은 메타 태그는 소셜 미디어 플랫폼에서 페이지가 공유될 때 어떻게 보여질지를 정의합니다. 이를 통해 페이지의 제목, 설명, 이미지 등이 소셜 미디어에서 적절하게 표시될 수 있도록 합니다.
5. **Open Graph(OG) 태그: 카톡 공유하기 기능이라고 보면 됩니다. OG 데이타의 사용 여부는 전부 기획 담당자 또는 현업과 상담 후 내용을 적어야 합니다.**

메타 태그는 웹 페이지 의 효과적인 표현, 검색 엔진과의 상호작용, 그리고 사용자 경험 개선에 중요한 역할을 합니다. 따라서, 웹 페이지를 개발할 때 메타 태그의 적절한 사용은 매우 중요합니다.

```html
<!-- mobile 및 반응형 viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover" />

<!-- pc용 viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1" />

<!-- meta sample -->
<meta name="keywords" content="이트라이브,etribe,디지털 에이전시 , 웹에이전시 키워드는 10개 미만 대표 적인 것으로 구성 : " />
<meta name="description" content="이트라이브는 홍대에 위치한 디지털 미디어 에이전시. 우리는 혁신적 사고와 고객 경험의 향상을 위해 열정을 공유하는 기획자, 디자이너, 퍼블리셔, 개발자들이 근무하고 있다." />
<meta property="og:title" content="이트라이브" />
<meta property="og:url" content="etribe.co.kr / www.etribe.co.kr" />
<meta property="og:image" content="" />
<meta property="og:description" content="당신이 흥미를 가질 만한 에이전시 " />

<!-- Favicon 과 기타 앱 아이콘 -->
<link rel="shortcut icon" type="image/x-icon" href="../../images/temp-icons8-two-hearts-color-32.png" />
<!-- iOS icons -->
<link rel="apple-touch-icon" sizes="57x57" href="/icon-57x57.png" />
<link rel="apple-touch-icon" sizes="60x60" href="/icon-60x60.png" />
<link rel="apple-touch-icon" sizes="72x72" href="/icon-72x72.png" />
<link rel="apple-touch-icon" sizes="76x76" href="/icon-76x76.png" />
<link rel="apple-touch-icon" sizes="114x114" href="/icon-114x114.png" />
<link rel="apple-touch-icon" sizes="120x120" href="/icon-120x120.png" />
<link rel="apple-touch-icon" sizes="144x144" href="/icon-144x144.png" />
<link rel="apple-touch-icon" sizes="152x152" href="/icon-152x152.png" />

<!-- Android icons -->
<link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/icon-32x32.png" />
<link rel="icon" type="image/png" sizes="96x96" href="/icon-96x96.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/icon-16x16.png" />

<!--
	웹 앱 매니페스트는 웹 애플리케이션에 대한 메타데이터를 제공하는 JSON 파일로, 애플리케이션의 이름, 시작 URL, 아이콘, 배경 색상, 표시 방법 등을 정의할 수 있습니다. 주로 Progressive Web Apps (PWA)의 일부로 사용됩니다. - Android
-->
<link rel="manifest" href="site.webmanifest" />

<!-- 주소창 없애줌 웹앱일떄 - iOS.   -->
<meta name="apple-mobile-web-app-capable" content="yes" />

<!-- 주소창 없애줌 웹앱일떄 - Android. -->
<meta name="mobile-web-app-capable" content="yes" />

<!-- Make the app title different than the page title - iOS. -->
<meta name="apple-mobile-web-app-title" content="Mobile web app title" />

<!-- 상태바 색 - iOS only. -->
<meta name="apple-mobile-web-app-status-bar-style" content="black" />

<!-- 웹 애플리케이션 또는 웹사이트의 테마 색상을 지정 - Android -->
<meta name="theme-color" content="#fafafa" />

<!-- 번호 전화 번호로 자동 인식 금지. -->
<meta name="format-detection" content="telephone=no" />
```

## 태그 사용 기준

- **시맨틱 태그 사용**: 의미론적으로 적합한 태그를 사용하여 내용의 구조를 명확히 합니다. 예를 들어, **`<header>`**, **`<footer>`**, **`<article>`**, **`<section>`** 등의 태그를 적절하게 활용합니다.
- **비시맨틱 태그 사용 최소화**: **`<div>`**와 **`<span>`** 같은 비시맨틱 태그의 사용은 최소화하며, 필요한 경우에만 사용합니다.
- 시맨틱 태그의 사용은 프로젝트 퍼블리싱 PL과 협의하여 결정하도록 합니다.

### 속성 순서 및 작성 방식

- **속성 순서**: 일관된 속성 순서를 따릅니다. 일반적으로, **`id`**, **`class`**, **`name`**, **`data-*`**, **`src`**, **`for`**, **`type`**, **`href`**, **`value`**, **`title`**, **`alt`**, **`role`**, **`aria-*`** 순으로 작성합니다.
- **불필요한 속성 생략**: 불필요하거나 기본값인 속성은 생략합니다. 예를 들어, **`<script>`** 태그의 **`type`** 속성은 HTML5에서는 불필요합니다.
- 속성 순서는 참고 해주시면 됩니다. gulp에서 자동으로 정렬 됩니다.

## HTML 유효성

- **표준 준수**: 가능한 한 HTML5와 같은 최신 웹 표준을 따르세요. 이는 기술의 호환성을 보장하고, 미래 지향적인 웹 개발을 지원합니다.
- **유효성 검사 도구 사용**: [W3C Markup Validation Service](https://validator.w3.org/)와 같은 도구를 사용하여 HTML 코드가 표준을 준수하는지 검사하세요. 이러한 도구는 구문 오류, 누락된 태그, 잘못된 속성 등을 식별할 수 있습니다.
- **코드 오류 수정**: 유효성 검사 도구에서 지적한 모든 오류를 수정하세요. 이는 웹 사이트의 기능성 향상은 물론 검색 엔진 최적화(SEO)에도 도움이 됩니다.
- **uxg-boilerplate-2024**에 포함된 유효성 검사 기능을 사용 합니다.

### HTML 유효성 검사 사용 예시

```bash
// vscode 터미널에서 아래 명령어 실행
npm run checkhtml

// 아래와 같은 메세지가 나타날 경우 내용 확인하여 조치 필요 (ChatGPT 활용 가능)
C:\workspaces\global_bcom_pub\trunk>npm run checkhtml

> uxg-boilerplate-2024@0.5.0 checkhtml
> gulp checkhtml

[15:55:08] Using gulpfile C:\workspaces\global_bcom_pub\trunk\gulpfile.js
[15:55:08] Starting 'checkhtml'...
[15:55:08] Starting 'validateHtml'...
Validating HTML files in: [ 'dist/**/*.html', '!dist/guide/**', '!dist/pages/include/**' ]
HTML validation started at: 2024. 7. 2. 오후 3:55:08
Validation result for file: dist\pages\main\main.html

C:\workspaces\global_bcom_pub\trunk\dist\pages\main\main.html
  157:52  warning  Inline style is not allowed  no-inline-style

✖ 1 problem (0 errors, 1 warning)

More information:
  https://html-validate.org/rules/no-inline-style.html

HTML validation completed with warnings.
[15:55:12] Finished 'validateHtml' after 3.31 s
[15:55:12] Finished 'checkhtml' after 3.32 s

C:\workspaces\global_bcom_pub\trunk>
```

> 효과적이고 표준에 부합하는 HTML 마크업을 작성하는 데 필요한 규칙과 지침을 제공합니다. 이러한 규칙들은 웹사이트의 접근성, 검색 엔진 최적화(SEO), 그리고 유지보수의 용이성을 향상시키는 데 중요한 역할을 합니다.