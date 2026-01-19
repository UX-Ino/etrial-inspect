# Card 컴포넌트 패턴

## 개요
콘텐츠를 담는 카드 컴포넌트 패턴입니다.

## 기본 구조

```html
<article class="card">
  <img class="card__image" src="image.jpg" alt="설명">
  <div class="card__content">
    <h3 class="card__title">제목</h3>
    <p class="card__description">설명</p>
  </div>
  <footer class="card__footer">
    <button class="card__button button button--primary">더보기</button>
  </footer>
</article>
```

## 변형

### Featured Card
```html
<article class="card card--featured">
  <div class="card__badge">추천</div>
  <img class="card__image" src="image.jpg" alt="설명">
  <div class="card__content">
    <h3 class="card__title">특별한 카드</h3>
    <p class="card__description">강조된 카드입니다.</p>
  </div>
</article>
```

### Horizontal Card
```html
<article class="card card--horizontal">
  <img class="card__image" src="image.jpg" alt="설명">
  <div class="card__content">
    <h3 class="card__title">가로 카드</h3>
    <p class="card__description">이미지가 좌측에 있습니다.</p>
  </div>
</article>
```

## CSS 예시

```css
.card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card__content {
  padding: 1.5rem;
  flex: 1;
}

.card__title {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
}

.card__description {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.card__footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-border);
}

.card--featured {
  position: relative;
  border: 2px solid var(--color-primary);
}

.card__badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  background: var(--color-primary);
  color: white;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.card--horizontal {
  flex-direction: row;
}

.card--horizontal .card__image {
  width: 200px;
  height: auto;
}
```

## 그리드 레이아웃

```html
<div class="card-grid">
  <article class="card">...</article>
  <article class="card">...</article>
  <article class="card">...</article>
</div>
```

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
```
