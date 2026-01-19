# Pagination

> Pagination 컴포넌트는 대량의 콘텐츠를 여러 페이지로 나누어 탐색할 수 있도록 하는 네비게이션 요소입니다. 사용자가 페이지 간 이동을 쉽게 할 수 있도록 직관적인 인터페이스를 제공합니다.

```html
<!-- 기본 구조 예시 -->
<nav class="component-pagination" aria-label="페이지 탐색">
  <a href="#" class="pagination-item first"><span class="hide-txt">첫 페이지로 이동</span></a>
  <a href="#" class="pagination-item prev"><span class="hide-txt">이전 페이지로 이동</span></a>
  <span class="pagination-item" aria-current="page">1</span>
  <a href="#" class="pagination-item">2</a>
  <a href="#" class="pagination-item">3</a>
  <a href="#" class="pagination-item next"><span class="hide-txt">다음 페이지로 이동</span></a>
  <a href="#" class="pagination-item last"><span class="hide-txt">마지막 페이지로 이동</span></a>
</nav>
```

## TL;DR

- **언제 사용하나요?** 검색 결과, 목록, 테이블 등 대량의 데이터를 여러 페이지로 나누어 표시할 때 사용합니다.
- **핵심 역할**: 사용자가 페이지 간 이동을 통해 콘텐츠를 탐색할 수 있도록 하며, 현재 위치를 명확히 표시합니다.
- **주요 클래스/속성**: `.component-pagination`, `.pagination-item`, `aria-current="page"`, `aria-label`

## 기본 마크업

### 필수 구조

- `.component-pagination`: 페이지네이션 컨테이너 (`<nav>` 요소, 반드시 하나만 존재)
- `.pagination-item`: 개별 페이지 아이템 (버튼 또는 링크)
- `.pagination-item.first`: 첫 페이지로 이동 버튼
- `.pagination-item.prev`: 이전 페이지로 이동 버튼
- `.pagination-item.next`: 다음 페이지로 이동 버튼
- `.pagination-item.last`: 마지막 페이지로 이동 버튼
- `.hide-txt`: 시각적으로 숨겨진 텍스트 (접근성용)

### 필수 속성

- `aria-label`: 네비게이션의 목적을 설명 (예: `aria-label="페이지 탐색"`)
- `aria-current="page"`: 현재 활성 페이지를 나타냄
- `aria-disabled="true"`: 비활성화된 버튼 상태 표시 (첫 페이지에서 이전 버튼 등)

> **TIP**: 현재 페이지는 `<span>` 요소로, 다른 페이지는 `<a>` 요소로 마크업하여 의미론적 구조를 명확히 합니다.

## 접근성 (Accessibility)

- `<nav>` 요소를 사용하여 페이지네이션 영역을 명시합니다.
- `aria-label` 속성으로 네비게이션의 목적을 설명합니다.
- 현재 페이지는 `<span>` 요소와 `aria-current="page"` 속성을 사용하여 링크가 아님을 명확히 합니다.
- 다른 페이지는 `<a>` 요소를 사용하여 키보드 탐색이 가능하도록 합니다.
- 아이콘 버튼의 텍스트는 `.hide-txt` 클래스로 시각적으로 숨기되 스크린 리더에서는 읽히도록 합니다.
- 비활성화된 버튼은 `aria-disabled="true"` 속성을 사용하여 상태를 명확히 전달합니다.
- 키보드 포커스가 명확하게 표시되도록 충분한 대비를 제공합니다.

## 구현 가이드

### 공통 규칙

- 페이지네이션은 반드시 `<nav>` 요소를 사용하여 시맨틱 마크업을 준수합니다.
- 현재 페이지는 링크가 아닌 `<span>` 요소로 마크업합니다.
- 페이지 번호는 실제 페이지 URL과 연결되어야 합니다.
- 첫 페이지에서는 "첫 페이지", "이전" 버튼을 비활성화하고, 마지막 페이지에서는 "다음", "마지막 페이지" 버튼을 비활성화합니다.

### 클래스 & 상태 정의

| 클래스/속성              | 용도                      | 비고                                  |
| ------------------------ | ------------------------- | ------------------------------------- |
| `.component-pagination`  | 페이지네이션 컨테이너     | `<nav>` 요소에 적용                   |
| `.pagination-item`       | 개별 페이지 아이템        | 링크 또는 span 요소에 적용            |
| `.pagination-item.first` | 첫 페이지 이동 버튼       | 아이콘 버튼으로 구성                  |
| `.pagination-item.prev`  | 이전 페이지 이동 버튼     | 아이콘 버튼으로 구성                  |
| `.pagination-item.next`  | 다음 페이지 이동 버튼     | 아이콘 버튼으로 구성                  |
| `.pagination-item.last`  | 마지막 페이지 이동 버튼   | 아이콘 버튼으로 구성                  |
| `aria-current="page"`    | 현재 활성 페이지 표시     | `<span>` 요소에 적용                  |
| `aria-disabled="true"`   | 비활성화된 버튼 상태 표시 | 첫/마지막 페이지에서 이동 버튼에 적용 |

### 자바스크립트 연동 (선택)

- 페이지 변경 시 URL 업데이트 및 콘텐츠 로딩 로직을 구현합니다.
- 현재 페이지 상태에 따라 이전/다음 버튼의 활성화 상태를 동적으로 업데이트합니다.
- AJAX 방식으로 페이지를 로드하는 경우, 히스토리 API를 사용하여 브라우저 뒤로가기/앞으로가기를 지원합니다.

## 패턴 & 변형 (Variants)

> 각 변형은 "언제 사용해야 하는지"와 "기본 구조와 무엇이 다른지"를 함께 설명합니다.

### 기본 페이지네이션 (Full Pagination)

- 첫 페이지, 이전, 페이지 번호, 다음, 마지막 페이지 버튼을 모두 포함하는 완전한 형태입니다.
- 페이지 수가 많고 사용자가 특정 페이지로 직접 이동할 필요가 있을 때 사용합니다.
- 데스크톱 환경에서 주로 사용됩니다.

```html
<!-- 기본 페이지네이션 -->
<nav class="component-pagination" aria-label="페이지 탐색">
  <a href="#" class="pagination-item first"><span class="hide-txt">첫 페이지로 이동</span></a>
  <a href="#" class="pagination-item prev"><span class="hide-txt">이전 페이지로 이동</span></a>
  <span class="pagination-item" aria-current="page">1</span>
  <a href="#" class="pagination-item">2</a>
  <a href="#" class="pagination-item">3</a>
  <a href="#" class="pagination-item">4</a>
  <a href="#" class="pagination-item">5</a>
  <a href="#" class="pagination-item">6</a>
  <a href="#" class="pagination-item">7</a>
  <a href="#" class="pagination-item">8</a>
  <a href="#" class="pagination-item">9</a>
  <a href="#" class="pagination-item">10</a>
  <a href="#" class="pagination-item next"><span class="hide-txt">다음 페이지로 이동</span></a>
  <a href="#" class="pagination-item last"><span class="hide-txt">마지막 페이지로 이동</span></a>
</nav>
```

### 간단한 페이지네이션 (Mini Pagination)

- 이전/다음 버튼과 현재 페이지 정보만 표시하는 간단한 형태입니다.
- 페이지 수가 적거나 모바일 환경에서 공간이 제한적일 때 사용합니다.
- "현재 페이지 / 전체 페이지" 형식으로 정보를 제공합니다.

```html
<!-- 간단한 페이지네이션 -->
<nav class="component-pagination-mini" aria-label="페이지네이션">
  <a href="#" class="pagination-item prev"><span class="hide-txt">이전 페이지로 이동</span></a>
  <span class="pagination-item-group">
    <span class="pagination-item" aria-current="page">1</span>
    <span class="pagination-item" aria-hidden="true">/</span>
    <span class="pagination-item">100</span>
  </span>
  <a href="#" class="pagination-item next"><span class="hide-txt">다음 페이지로 이동</span></a>
</nav>
```

## 상세 예시 (Patterns)

### 첫 페이지 상태

첫 페이지에서는 "첫 페이지", "이전" 버튼이 비활성화됩니다.

```html
<nav class="component-pagination" aria-label="페이지 탐색">
  <span class="pagination-item first" aria-disabled="true"><span class="hide-txt">첫 페이지로 이동</span></span>
  <span class="pagination-item prev" aria-disabled="true"><span class="hide-txt">이전 페이지로 이동</span></span>
  <span class="pagination-item" aria-current="page">1</span>
  <a href="#" class="pagination-item">2</a>
  <a href="#" class="pagination-item">3</a>
  <a href="#" class="pagination-item next"><span class="hide-txt">다음 페이지로 이동</span></a>
  <a href="#" class="pagination-item last"><span class="hide-txt">마지막 페이지로 이동</span></a>
</nav>
```

### 마지막 페이지 상태

마지막 페이지에서는 "다음", "마지막 페이지" 버튼이 비활성화됩니다.

```html
<nav class="component-pagination" aria-label="페이지 탐색">
  <a href="#" class="pagination-item first"><span class="hide-txt">첫 페이지로 이동</span></a>
  <a href="#" class="pagination-item prev"><span class="hide-txt">이전 페이지로 이동</span></a>
  <a href="#" class="pagination-item">8</a>
  <a href="#" class="pagination-item">9</a>
  <span class="pagination-item" aria-current="page">10</span>
  <span class="pagination-item next" aria-disabled="true"><span class="hide-txt">다음 페이지로 이동</span></span>
  <span class="pagination-item last" aria-disabled="true"><span class="hide-txt">마지막 페이지로 이동</span></span>
</nav>
```

## API / Props Reference

| Props / 속성            | Type    | Default | Description                                |
| ----------------------- | ------- | ------- | ------------------------------------------ |
| `aria-label`            | string  | -       | 네비게이션의 목적을 설명 (필수)            |
| `aria-current`          | string  | -       | 현재 페이지 표시 (`"page"` 값 사용)        |
| `aria-disabled`         | boolean | false   | 버튼 비활성화 상태 표시                    |
| `.component-pagination` | class   | -       | 페이지네이션 컨테이너 클래스 (필수)        |
| `.pagination-item`      | class   | -       | 개별 페이지 아이템 클래스 (필수)           |
| `.first`                | class   | -       | 첫 페이지 이동 버튼 클래스                 |
| `.prev`                 | class   | -       | 이전 페이지 이동 버튼 클래스               |
| `.next`                 | class   | -       | 다음 페이지 이동 버튼 클래스               |
| `.last`                 | class   | -       | 마지막 페이지 이동 버튼 클래스             |
| `.hide-txt`             | class   | -       | 시각적으로 숨겨진 텍스트 클래스 (접근성용) |
