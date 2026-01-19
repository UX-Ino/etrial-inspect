# Modal 컴포넌트 패턴

## 개요
접근성을 고려한 모달(다이얼로그) 컴포넌트 패턴입니다.

## 기본 구조

```html
<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <div class="modal__overlay" data-close-modal></div>
  <div class="modal__container">
    <header class="modal__header">
      <h2 class="modal__title" id="modal-title">모달 제목</h2>
      <button class="modal__close" aria-label="닫기" data-close-modal>
        <span aria-hidden="true">&times;</span>
      </button>
    </header>

    <div class="modal__body">
      <p>모달 내용입니다.</p>
    </div>

    <footer class="modal__footer">
      <button class="button button--secondary" data-close-modal>취소</button>
      <button class="button button--primary">확인</button>
    </footer>
  </div>
</div>
```

## 변형

### Alert Modal
```html
<div class="modal modal--alert" role="alertdialog" aria-modal="true">
  <div class="modal__overlay"></div>
  <div class="modal__container">
    <div class="modal__icon modal__icon--warning">⚠️</div>
    <h2 class="modal__title">경고</h2>
    <p class="modal__message">정말 삭제하시겠습니까?</p>
    <div class="modal__actions">
      <button class="button button--secondary">취소</button>
      <button class="button button--danger">삭제</button>
    </div>
  </div>
</div>
```

### Confirm Modal
```html
<div class="modal modal--confirm" role="dialog">
  <div class="modal__overlay"></div>
  <div class="modal__container modal__container--small">
    <h2 class="modal__title">확인</h2>
    <p class="modal__message">계속하시겠습니까?</p>
    <div class="modal__actions">
      <button class="button button--secondary">아니오</button>
      <button class="button button--primary">예</button>
    </div>
  </div>
</div>
```

## CSS 예시

```css
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: none;
  align-items: center;
  justify-content: center;
}

.modal[aria-hidden="false"] {
  display: flex;
}

.modal__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.modal__container {
  position: relative;
  max-width: 500px;
  max-height: 90vh;
  width: 90%;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.modal__title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.modal__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
}

.modal__close:hover {
  background-color: var(--color-gray-100);
}

.modal__body {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

.modal__footer {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  padding: 1.5rem;
  border-top: 1px solid var(--color-border);
}
```

## JavaScript 예시

```javascript
// 모달 열기
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // 첫 번째 포커스 가능한 요소에 포커스
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (focusableElements.length) {
    focusableElements[0].focus();
  }
}

// 모달 닫기
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// ESC 키로 닫기
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const openModal = document.querySelector('.modal[aria-hidden="false"]');
    if (openModal) {
      closeModal(openModal.id);
    }
  }
});

// 오버레이 클릭으로 닫기
document.addEventListener('click', (e) => {
  if (e.target.hasAttribute('data-close-modal')) {
    const modal = e.target.closest('.modal');
    if (modal) {
      closeModal(modal.id);
    }
  }
});
```

## 접근성 체크리스트
- ✅ role="dialog" 또는 role="alertdialog"
- ✅ aria-modal="true"
- ✅ aria-labelledby로 제목 연결
- ✅ ESC 키로 닫기
- ✅ 포커스 트랩 (모달 내부에만 포커스)
- ✅ 모달 열릴 때 body 스크롤 방지
- ✅ 닫기 버튼에 aria-label
