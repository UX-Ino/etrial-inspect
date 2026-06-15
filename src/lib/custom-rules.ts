export const CUSTOM_RULE_SCRIPT = `
(function() {
  const violations = [];

  // Helper to add violation
  const addViolation = (id, description, help, element, failureSummary) => {
    // Check if violation already exists for this ID
    let violation = violations.find((v) => v.id === id);
    if (!violation) {
      violation = {
        id,
        impact: 'serious', // Default impact for ARIA misuse
        description,
        help,
        helpUrl: 'https://github.com/google/antigravity',
        nodes: [],
      };
      violations.push(violation);
    }

    // specific selector generation
    const getSelector = (el) => {
      if (el.id) return '#' + el.id;
      const path = [];
      let current = el;
      while (current && current.nodeType === Node.ELEMENT_NODE) {
        let selector = current.nodeName.toLowerCase();
        if (current.id) {
          selector += '#' + current.id;
          path.unshift(selector);
          break;
        } else {
          let sib = current;
          let nth = 1;
          while ((sib = sib.previousElementSibling)) {
            if (sib.nodeName.toLowerCase() === selector) nth++;
          }
          if (nth !== 1) selector += ':nth-of-type(' + nth + ')';
        }
        path.unshift(selector);
        current = current.parentElement;
      }
      return path.join(' > ');
    };

    violation.nodes.push({
      html: element.outerHTML.substring(0, 200),
      target: [getSelector(element)],
      failureSummary,
    });
  };

  // Rule 1: Tab Component
  document.querySelectorAll('[role="tab"]').forEach((el) => {
    if (!el.hasAttribute('aria-selected')) {
      addViolation(
        'custom-aria-tab-missing-selected',
        'Tab 요소는 aria-selected 속성을 가져야 합니다.',
        'role="tab" 요소에 aria-selected="true" 또는 "false"를 명시하세요.',
        el,
        'aria-selected attribute is missing'
      );
    }
    if (!el.hasAttribute('aria-controls')) {
      addViolation(
        'custom-aria-tab-missing-controls',
        'Tab 요소는 aria-controls 속성을 가져야 합니다.',
        'role="tab" 요소에 제어하는 패널의 ID를 aria-controls로 명시하세요.',
        el,
        'aria-controls attribute is missing'
      );
    } else {
      // Tabpanel connection check
      const targetId = el.getAttribute('aria-controls');
      const targetEl = document.getElementById(targetId);
      if (!targetEl) {
        addViolation(
          'custom-aria-tab-invalid-controls',
          'Tab이 가리키는 콘텐츠 패널이 존재하지 않습니다.',
          `ID "${targetId}"를 가진 요소가 DOM에 존재해야 합니다.`,
          el,
          'Referenced aria-controls element not found'
        );
      } else if (targetEl.getAttribute('role') !== 'tabpanel') {
        addViolation(
          'custom-aria-tab-controls-role-mismatch',
          'Tab 연결 패널의 역할(role)이 올바르지 않습니다.',
          `ID "${targetId}" 요소에 role="tabpanel"을 설정해야 합니다.`,
          el,
          'Referenced element is not role="tabpanel"'
        );
      }
    }

    // Tablist container check
    if (!el.closest('[role="tablist"]')) {
      addViolation(
        'custom-aria-tab-missing-tablist',
        'Tab 요소는 role="tablist" 내부에서 정의되어야 합니다.',
        '탭 메뉴들을 감싸는 부모 컨테이너에 role="tablist"를 명시하세요.',
        el,
        'Missing role="tablist" ancestor'
      );
    }
  });

  // Rule 2: Checkbox
  document.querySelectorAll('[role="checkbox"]').forEach((el) => {
    if (!el.hasAttribute('aria-checked')) {
      addViolation(
        'custom-aria-checkbox-missing-checked',
        'Checkbox 요소는 aria-checked 속성을 가져야 합니다.',
        'role="checkbox" 요소에 aria-checked="true/false/mixed"를 명시하세요.',
        el,
        'aria-checked attribute is missing'
      );
    }
  });

  // Rule 3: Radio
  document.querySelectorAll('[role="radio"]').forEach((el) => {
    if (!el.hasAttribute('aria-checked')) {
      addViolation(
        'custom-aria-radio-missing-checked',
        'Radio 요소는 aria-checked 속성을 가져야 합니다.',
        'role="radio" 요소에 aria-checked="true/false"를 명시하세요.',
        el,
        'aria-checked attribute is missing'
      );
    }
  });

  // Rule 4: Slider
  document.querySelectorAll('[role="slider"]').forEach((el) => {
    const missingAttrs = [];
    if (!el.hasAttribute('aria-valuenow')) missingAttrs.push('aria-valuenow');
    if (!el.hasAttribute('aria-valuemin')) missingAttrs.push('aria-valuemin');
    if (!el.hasAttribute('aria-valuemax')) missingAttrs.push('aria-valuemax');

    if (missingAttrs.length > 0) {
      addViolation(
        'custom-aria-slider-missing-values',
        'Slider 요소는 aria-valuenow, aria-valuemin, aria-valuemax 속성을 가져야 합니다.',
        'role="slider" 요소에 다음 속성이 누락되었습니다: ' + missingAttrs.join(', '),
        el,
        'Missing attributes: ' + missingAttrs.join(', ')
      );
    }
  });

  // Rule 5: Button (Toggle)
  document.querySelectorAll('[role="button"], button').forEach((el) => {
    if (el.hasAttribute('aria-pressed')) {
      const val = el.getAttribute('aria-pressed');
      if (val !== 'true' && val !== 'false' && val !== 'mixed') {
        addViolation(
          'custom-aria-button-invalid-pressed',
          'Button의 aria-pressed 속성값은 true, false, 또는 mixed여야 합니다.',
          '현재 값 "' + val + '"은 유효하지 않습니다.',
          el,
          'Invalid aria-pressed value: ' + val
        );
      }
    }
  });

  // Rule 6: Boilerplate hide-txt check
  document.querySelectorAll('.hide-txt').forEach((el) => {
    if (!el.textContent || !el.textContent.trim()) {
      addViolation(
        'custom-boilerplate-empty-hidetxt',
        '숨김 텍스트(.hide-txt)의 내용이 비어있습니다.',
        '스크린 리더가 읽어줄 대체 텍스트 콘텐츠를 입력해 주세요.',
        el,
        'Empty hidden text helper (.hide-txt)'
      );
    }
  });

  return violations;
})();
`;
