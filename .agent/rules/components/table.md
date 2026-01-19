# Table

> Table 컴포넌트는 구조화된 데이터를 행과 열로 표시하여 사용자가 정보를 쉽게 비교하고 이해할 수 있도록 돕는 컴포넌트입니다.

```html
<div class="component-table">
  <table>
    <caption>이벤트 일정: 날짜, 이벤트, 장소, 가격</caption>
    <col style="width: 25%;" />
    <col style="width: 25%;" />
    <col style="width: 25%;" />
    <col />
    <thead>
      <tr>
        <th scope="col">날짜</th>
        <th scope="col">이벤트</th>
        <th scope="col">장소</th>
        <th scope="col">가격</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>2월 12일</td>
        <td class="align-left">함께하는 왈츠 </td>
        <td>정당</td>
        <td class="align-right">1,3485원</td>
      </tr>
      <tr>
        <td>3월 12일</td>
        <td class="align-left">오벨리스크</td>
        <td>웨스트 윙</td>
        <td class="align-right">23,076원</td>
      </tr>
      <tr>
        <td>4월 12일</td>
        <td class="align-left">무엇</td>
        <td>정당</td>
        <td class="align-right">73,076원</td>
      </tr>
    </tbody>
  </table>
</div>
```

## TL;DR

- **언제 사용하나요?** 구조화된 데이터를 행과 열로 표시해야 할 때, 여러 항목을 비교하거나 정렬된 정보를 제공할 때 사용합니다.
- **핵심 역할**: 데이터의 논리적 구조를 시각적으로 표현하고, 행/열 헤더를 통해 정보의 관계를 명확히 전달합니다.
- **주요 클래스/속성**: `.component-table`, `.table-fixed`, `.table-scroll`, `.align-left`, `.align-right`

## 기본 마크업

### 필수 구조

- `.component-table`: 테이블을 감싸는 최상위 래퍼
- `<table>`: 실제 테이블 요소
- `<caption>`: 테이블의 제목 및 요약 정보 (접근성 필수)
- `<col>`: 열의 너비 및 스타일 정의
- `<thead>`: 테이블 헤더 영역
- `<tbody>`: 테이블 본문 영역
- `<th>`: 헤더 셀 (scope 속성 필수)
- `<td>`: 데이터 셀

### 필수 속성

- `scope="col"`: 열 헤더를 나타내는 `<th>` 요소에 사용
- `scope="row"`: 행 헤더를 나타내는 `<th>` 요소에 사용
- `scope="colgroup"`: 열 그룹 헤더에 사용
- `rowspan`: 행 병합 시 사용
- `colspan`: 열 병합 시 사용

> **TIP**: `<caption>` 태그는 테이블의 목적을 요약하여 기재하며, 스크린리더 사용자에게 중요한 정보를 제공합니다.

## 접근성 (Accessibility)

- `<caption>` 태그를 사용하여 테이블의 목적과 내용을 명확히 설명합니다.
- `<th>` 요소에 `scope` 속성을 반드시 지정하여 헤더와 데이터 셀의 관계를 명확히 합니다.
- `<col>`, `<colgroup>`, `<thead>`, `<tbody>` 등 시맨틱 요소를 사용하여 테이블 구조를 논리적으로 구성합니다.
- 행과 열을 병합할 때는 `rowspan`, `colspan` 속성을 적절히 사용하고, 스크린리더가 이해할 수 있도록 구조를 명확히 합니다.
- 복잡한 테이블의 경우 `<caption>` 내부에 `<span>`을 사용하여 상세 설명을 추가할 수 있습니다.

## 구현 가이드

### 공통 규칙

- 모든 테이블은 `.component-table` 클래스로 감싸야 합니다.
- `<caption>` 태그는 필수이며, 테이블의 목적을 간결하게 요약합니다.
- `<col>` 태그를 사용하여 열의 너비를 사전에 정의합니다.
- 헤더 셀(`<th>`)에는 반드시 `scope` 속성을 지정합니다.
- 데이터 정렬이 필요한 경우 `.align-left`, `.align-right` 클래스를 사용합니다.

### 클래스 & 상태 정의

| 클래스/속성      | 용도                          | 비고                                    |
| ---------------- | ----------------------------- | --------------------------------------- |
| `.component-table` | 테이블 래퍼                   | 모든 테이블에 필수                      |
| `.table-fixed`   | 헤더 고정 테이블              | 스크롤 시 헤더가 고정됨                 |
| `.thead-fixed`   | 고정할 헤더 영역              | `.table-fixed`와 함께 사용              |
| `.table-scroll`  | 가로 스크롤 테이블            | 테이블 너비가 컨테이너를 초과할 때 사용 |
| `.align-left`    | 셀 내용 왼쪽 정렬             | `<td>` 또는 `<th>`에 적용               |
| `.align-right`   | 셀 내용 오른쪽 정렬           | 숫자 데이터에 주로 사용                 |

## 패턴 & 변형 (Variants)

> 각 변형은 "언제 사용해야 하는지"와 "기본 구조와 무엇이 다른지"를 함께 설명합니다.

### 복합형 테이블 (Complex Table)

- **사용 시나리오**: 행과 열을 병합하여 복잡한 데이터 구조를 표현해야 할 때 사용합니다.
- **추가 속성**: `rowspan`, `colspan`, `scope="colgroup"`
- **특징**: 다층 헤더 구조를 지원하며, 그룹화된 데이터를 효과적으로 표시합니다.

```html
<div class="component-table">
  <table>
    <caption>
      2024 주간 요율 요약
      <span>2024년 4월 15일부터 4월 20일까지의 주간 다양한 금융 도구에 대한 주간 요율</span>
    </caption>
    <col />
    <col style="width: 17%;" />
    <col style="width: 17%;" />
    <col style="width: 17%;" />
    <col style="width: 17%;" />
    <col style="width: 17%;" />
    <thead>
      <tr>
        <th rowspan="2" scope="col">구분</th>
        <th colspan="3" scope="colgroup">2024</th>
        <th colspan="2" scope="colgroup">일주일 마무리</th>
      </tr>
      <tr>
        <th scope="col">4월 15일</th>
        <th scope="col">4월 16일</th>
        <th scope="col">4월 17일</th>
        <th scope="col">4월 19일</th>
        <th scope="col">4월 20일</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">연방 자금</th>
        <td>1.84</td>
        <td>1.85</td>
        <td>1.85</td>
        <td>1.85</td>
        <td>1.85</td>
      </tr>
      <tr>
        <th scope="row">비금융</th>
        <td>1.84</td>
        <td>1.85</td>
        <td>1.85</td>
        <td>1.85</td>
        <td>1.85</td>
      </tr>
      <tr>
        <th scope="row">금융</th>
        <td>1.84</td>
        <td>1.85</td>
        <td>1.85</td>
        <td>1.85</td>
        <td>1.85</td>
      </tr>
    </tbody>
  </table>
</div>
```

### 헤더 고정 테이블 (Header Fixed)

- **사용 시나리오**: 테이블이 길어서 스크롤이 필요할 때, 헤더를 항상 보이게 유지해야 하는 경우 사용합니다.
- **추가 클래스**: `.table-fixed`, `.thead-fixed`
- **특징**: 세로 스크롤 시 헤더가 상단에 고정되어 사용자가 항상 열 제목을 확인할 수 있습니다.

```html
<div class="component-table table-fixed">
  <table>
    <caption>이벤트 일정: 날짜, 이벤트, 장소, 가격</caption>
    <col style="width: 25%;" />
    <col style="width: 25%;" />
    <col style="width: 25%;" />
    <col />
    <thead class="thead-fixed">
      <tr>
        <th scope="col">날짜</th>
        <th scope="col">이벤트</th>
        <th scope="col">장소</th>
        <th scope="col">가격</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>2월 12일</td>
        <td>함께하는 왈츠 </td>
        <td>정당</td>
        <td>1,3485원</td>
      </tr>
      <tr>
        <td>3월 12일</td>
        <td>오벨리스크</td>
        <td>웨스트 윙</td>
        <td>23,076원</td>
      </tr>
      <tr>
        <td>4월 12일</td>
        <td>무엇</td>
        <td>정당</td>
        <td>73,076원</td>
      </tr>
    </tbody>
  </table>
</div>
```

### 가로 스크롤 테이블 (Horizontal Scroll)

- **사용 시나리오**: 열이 많아 화면 너비를 초과하는 경우, 가로 스크롤을 제공해야 할 때 사용합니다.
- **추가 클래스**: `.table-scroll`
- **특징**: 테이블이 컨테이너 너비를 초과하면 자동으로 가로 스크롤이 활성화됩니다.

```html
<div class="component-table table-scroll">
  <table>
    <caption>이벤트 일정: 날짜, 이벤트, 장소, 가격</caption>
    <col style="width: 150px;" />
    <col style="width: 150px;" />
    <col style="width: 150px;" />
    <col style="width: 150px;" />
    <col style="width: 150px;" />
    <col style="width: 150px;" />
    <thead>
      <tr>
        <th scope="col">날짜</th>
        <th scope="col">이벤트</th>
        <th scope="col">장소</th>
        <th scope="col">가격</th>
        <th scope="col">가격</th>
        <th scope="col">가격</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>2월 12일</td>
        <td>함께하는 왈츠 </td>
        <td>정당</td>
        <td>정당</td>
        <td>정당</td>
        <td>1,3485원</td>
      </tr>
      <tr>
        <td>3월 12일</td>
        <td>오벨리스크</td>
        <td>웨스트 윙</td>
        <td>웨스트 윙</td>
        <td>웨스트 윙</td>
        <td>23,076원</td>
      </tr>
    </tbody>
  </table>
</div>
```

## 상세 예시 (Patterns)

### 정렬 클래스 활용

테이블 셀의 내용을 정렬해야 하는 경우, `.align-left` 또는 `.align-right` 클래스를 사용합니다. 특히 숫자 데이터는 오른쪽 정렬을 권장합니다.

```html
<div class="component-table">
  <table>
    <caption>이벤트 일정표</caption>
    <col style="width: 25%;" />
    <col style="width: 40%;" />
    <col style="width: 20%;" />
    <col style="width: 15%;" />
    <thead>
      <tr>
        <th scope="col">날짜</th>
        <th scope="col">이벤트</th>
        <th scope="col">장소</th>
        <th scope="col">가격</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>2월 12일</td>
        <td class="align-left">함께하는 왈츠</td>
        <td>정당</td>
        <td class="align-right">1,3485원</td>
      </tr>
    </tbody>
  </table>
</div>
```

### 복합 구조 활용 팁

- `rowspan`과 `colspan`을 함께 사용할 때는 헤더 구조를 명확히 설계합니다.
- `scope="colgroup"`을 사용하여 그룹화된 열 헤더를 명시합니다.
- `<caption>` 내부에 `<span>`을 추가하여 상세 설명을 제공할 수 있습니다.

## API / Props Reference

| 클래스/속성      | Type   | Default | Description                                  |
| ---------------- | ------ | ------- | -------------------------------------------- |
| `.component-table` | class  | -       | 테이블 래퍼 (필수)                           |
| `.table-fixed`   | class  | -       | 헤더 고정 테이블                             |
| `.thead-fixed`   | class  | -       | 고정할 헤더 영역 (`.table-fixed`와 함께 사용) |
| `.table-scroll`  | class  | -       | 가로 스크롤 테이블                           |
| `.align-left`    | class  | -       | 셀 내용 왼쪽 정렬                            |
| `.align-right`   | class  | -       | 셀 내용 오른쪽 정렬                          |
| `scope`          | attr   | -       | 헤더 셀의 범위 지정 (col, row, colgroup)     |
| `rowspan`        | attr   | 1       | 행 병합 개수                                 |
| `colspan`        | attr   | 1       | 열 병합 개수                                 |
