import { Violation } from '@/types';
import { getKWCAGByAxeRule } from './kwcag-mapping';

export type Role = 'Planning' | 'Design' | 'Publishing' | 'Development';

export interface CostBreakdown {
  role: Role;
  count: number; // Unique violations (after common UI dedupe)
  manMonths: number;
  description: string;
}

export interface CostReport {
  items: CostBreakdown[];
  totalViolations: number;
  totalManMonths: number; // 1 M/M = 160h
  recommendations: Record<Role, string[]>;
}

export interface RoleDistribution {
  Planning: number;
  Design: number;
  Publishing: number;
  Development: number;
}

// Role distribution mapping (percentage of effort required for each role)
const ROLE_DISTRIBUTION: Record<string, RoleDistribution> = {
  // 1. Perception
  'image-alt': { Planning: 0.4, Design: 0.0, Publishing: 0.6, Development: 0.0 },
  'video-caption': { Planning: 0.5, Design: 0.0, Publishing: 0.5, Development: 0.0 },
  'heading-order': { Planning: 0.3, Design: 0.0, Publishing: 0.7, Development: 0.0 },
  'color-contrast': { Planning: 0.0, Design: 0.6, Publishing: 0.4, Development: 0.0 },
  'link-in-text-block': { Planning: 0.0, Design: 0.5, Publishing: 0.5, Development: 0.0 },

  // 2. Operation
  'accesskeys': { Planning: 0.0, Design: 0.0, Publishing: 1.0, Development: 0.0 },
  'tabindex': { Planning: 0.0, Design: 0.0, Publishing: 0.5, Development: 0.5 },
  'focus-order-semantics': { Planning: 0.0, Design: 0.0, Publishing: 0.2, Development: 0.8 },
  'button-name': { Planning: 0.2, Design: 0.0, Publishing: 0.8, Development: 0.0 },
  'link-name': { Planning: 0.2, Design: 0.0, Publishing: 0.8, Development: 0.0 },
  'bypass': { Planning: 0.0, Design: 0.0, Publishing: 1.0, Development: 0.0 },
  'skip-link': { Planning: 0.0, Design: 0.0, Publishing: 1.0, Development: 0.0 },
  'page-has-heading-one': { Planning: 0.3, Design: 0.0, Publishing: 0.7, Development: 0.0 },
  'duplicate-id': { Planning: 0.0, Design: 0.0, Publishing: 0.8, Development: 0.2 },
  'frame-title': { Planning: 0.4, Design: 0.0, Publishing: 0.6, Development: 0.0 },

  // 3. Understandable
  'html-has-lang': { Planning: 0.0, Design: 0.0, Publishing: 1.0, Development: 0.0 },
  'valid-lang': { Planning: 0.0, Design: 0.0, Publishing: 1.0, Development: 0.0 },
  'label': { Planning: 0.0, Design: 0.0, Publishing: 1.0, Development: 0.0 },
  'label-title-only': { Planning: 0.0, Design: 0.0, Publishing: 1.0, Development: 0.0 },

  // 4. Robust
  'aria-allowed-attr': { Planning: 0.0, Design: 0.0, Publishing: 0.6, Development: 0.4 },
  'aria-roles': { Planning: 0.0, Design: 0.0, Publishing: 0.6, Development: 0.4 },
  'aria-valid-attr': { Planning: 0.0, Design: 0.0, Publishing: 0.5, Development: 0.5 },

  // Default fallback
  'default': { Planning: 0.1, Design: 0.1, Publishing: 0.5, Development: 0.3 }
};

interface RecommendationTemplates {
  Planning: string;
  Design: string;
  Publishing: string;
  Development: string;
}

// Remediation advice templates mapped by Axe Rule and Role
const RECOMMENDATION_TEMPLATES: Record<string, Partial<RecommendationTemplates>> = {
  'image-alt': {
    Planning: '이미지/아이콘에 의미 있는 대체 텍스트(alt/aria-label) 기획안 작성',
    Publishing: 'img 태그 alt 속성 기술 및 의미 없는 데코레이션 이미지 alt="" 빈 값 처리'
  },
  'video-caption': {
    Planning: '비디오 콘텐츠 제공 시 전용 자막(Caption) 대본 기획',
    Publishing: 'video 태그 내 track 자막 삽입 또는 하단 텍스트 원고 제공'
  },
  'heading-order': {
    Planning: '제목(Heading) 계층 및 지시 사항 구조 논리적 재설계',
    Publishing: 'h1~h6 태그를 순서에 맞춰 계층 구조로 배치'
  },
  'color-contrast': {
    Design: '명도 대비 기준(3:1 이상)을 충족하는 색상 보정 및 표준 가이드 수정',
    Publishing: '텍스트 색상 및 배경 색상 CSS 스타일 일괄 수정 적용'
  },
  'link-in-text-block': {
    Design: '텍스트 블록 내부 링크에 색상 외 추가적인 구분선/밑줄 디자인 가이드 수립',
    Publishing: 'CSS text-decoration 또는 border-bottom 활용하여 링크 시각적 구분선 적용'
  },
  'accesskeys': {
    Publishing: '중복되거나 사용성을 저해하는 accesskey 속성 제거'
  },
  'tabindex': {
    Publishing: '불필요한 tabindex 양수값 제거 및 적절한 순서 조정',
    Development: 'tabindex="-1"을 활용하여 숨겨진 슬라이더/모달 포커스 제어'
  },
  'focus-order-semantics': {
    Publishing: '논리적인 흐름에 맞게 DOM 마크업 순서 배치',
    Development: '포커스 이동 흐름 관리 및 dynamic focus 로직 보완'
  },
  'button-name': {
    Planning: '버튼 요소의 명확한 동작명(aria-label) 기획 지정',
    Publishing: '텍스트가 없는 버튼에 aria-label 속성을 통한 대체 텍스트 부여'
  },
  'link-name': {
    Planning: '링크 요소가 이동하는 목적지(네임) 기획 지정',
    Publishing: '텍스트가 없는 a 태그 또는 이미지 링크에 목적지 명시 (aria-label/alt)'
  },
  'bypass': {
    Publishing: '최상단 스킵 네비게이션(본문 바로가기) 링크 마크업 적용'
  },
  'skip-link': {
    Publishing: '스킵 네비게이션 대상 컨테이너(id="content") 연결 구조 확인'
  },
  'page-has-heading-one': {
    Planning: '페이지 대표 대제목(h1) 구조 정의',
    Publishing: '페이지 내 고유한 <h1> 태그 1개 선언'
  },
  'duplicate-id': {
    Publishing: 'HTML 소스 내 중복 정의된 id 제거 및 고유한 id 명명으로 수정',
    Development: '중복 id로 인해 오작동하는 스크립트 셀렉터 수정'
  },
  'frame-title': {
    Planning: 'iframe 프레임 요소의 목적(title) 정의',
    Publishing: 'iframe 태그에 용도를 파악할 수 있는 유의미한 title 속성 부여'
  },
  'html-has-lang': {
    Publishing: 'html 태그에 기본 언어 속성(lang="ko") 설정'
  },
  'valid-lang': {
    Publishing: 'html 태그의 lang 속성값을 유효한 언어 코드 규격에 맞춰 수정'
  },
  'label': {
    Publishing: 'input 요소와 label 요소를 id-for 연결 또는 aria-label 제공'
  },
  'label-title-only': {
    Publishing: 'placeholder에만 의존하지 않고 명확한 label 제공'
  },
  'aria-allowed-attr': {
    Publishing: '요소의 role 역할에 맞지 않는 잘못된 ARIA 속성 제거',
    Development: '보조기기 호환을 위한 ARIA 속성 명세 검증 및 정합성 보완'
  },
  'aria-roles': {
    Publishing: 'dl/li 등 특정 HTML 태그에 허용되지 않는 비표준 role 속성 수정',
    Development: '보조기기에서 인지 가능한 올바른 ARIA role 부여'
  },
  'aria-valid-attr': {
    Publishing: '오타가 있거나 존재하지 않는 잘못된 ARIA 속성 수정',
    Development: '유효한 WAI-ARIA 상태 속성만 사용되도록 검증'
  }
};

const DEFAULT_RECOMMENDATIONS: Record<Role, string[]> = {
  Planning: [
    "버튼/링크의 목적을 명확히 하는 대체 텍스트(aria-label) 기획 정의",
    "페이지 타이틀 및 제목(Heading) 계층 구조 재설계",
    "기획 단계에서 'WCAG 2.2' 기준을 반영한 스토리보드 작성"
  ],
  Design: [
    "명도 대비(4.5:1) 미달 색상 일괄 조정 및 가이드 업데이트",
    "색상 외 정보를 전달하는 시각적 수단(패턴, 밑줄 등) 추가",
    "포커스링(Focus Ring) 디자인 표준 정의 및 적용"
  ],
  Publishing: [
    "시맨틱 태그(header, nav, main, footer) 구조 강화",
    "Form 요소의 레이블(Label) 연결 및 title 속성 보완",
    "반복되는 UI 요소(GNB, Footer)에 스킵 네비게이션 적용"
  ],
  Development: [
    "키보드 포커스 트랩 방지 및 논리적 순서보장",
    "모달/팝업 열림/닫힘 시 포커스 관리 로직(Focus Management) 구현",
    "스크린리더 사용자(보조기기)를 위한 상태 정보(aria-expanded 등) 제공"
  ]
};

function getBaseTime(automationLevel: 'high' | 'medium' | 'manual'): number {
  switch (automationLevel) {
    case 'high': return 0.2;   // 12 min (Automated, easy fix)
    case 'medium': return 0.5; // 30 min (Semi-auto, needs check)
    case 'manual': return 1.0; // 60 min (Manual, complex)
    default: return 0.3;
  }
}

function getImpactMultiplier(impact: string): number {
  switch (impact) {
    case 'critical': return 1.5;
    case 'serious': return 1.2;
    case 'moderate': return 1.0;
    case 'minor': return 0.8;
    default: return 1.0;
  }
}

export function calculateCost(violations: Violation[]): CostReport {
  const breakdown: Record<Role, { count: number; mh: number; desc: Set<string> }> = {
    Planning: { count: 0, mh: 0, desc: new Set() },
    Design: { count: 0, mh: 0, desc: new Set() },
    Publishing: { count: 0, mh: 0, desc: new Set() },
    Development: { count: 0, mh: 0, desc: new Set() },
  };

  // 1. Filter Common UI violations
  const commonSeen = new Set<string>();
  const filteredViolations = violations.filter(v => {
    if (v.isCommon) {
      const key = `${v.axeRuleId}-${v.selector}`;
      if (commonSeen.has(key)) return false; // Skip duplicate common UI
      commonSeen.add(key);
      return true;
    }
    return true;
  });

  // Calculate unique pages and files to edit for overhead
  const nonCommonPages = new Set<string>(
    filteredViolations.filter(v => !v.isCommon).map(v => v.pageUrl)
  );
  const commonFilesCount = commonSeen.size;
  const totalFilesToEdit = nonCommonPages.size + commonFilesCount;

  // Calculate total occurrences of common violations for QA verification overhead
  const totalCommonOccurrences = violations.filter(v => v.isCommon).length;

  // 2. Group for Repetition Discount & Role Frequency counts
  const processedCounts: Record<string, number> = {};
  const roleViolationsCount: Record<Role, Record<string, number>> = {
    Planning: {},
    Design: {},
    Publishing: {},
    Development: {}
  };

  filteredViolations.forEach(v => {
    const rid = v.axeRuleId || 'default';
    const kwcagItem = getKWCAGByAxeRule(rid);

    // Get Role Distribution (using new percentage distribution model)
    const dist = ROLE_DISTRIBUTION[rid] || ROLE_DISTRIBUTION['default'];

    // Determine Base Time
    const automationLevel = kwcagItem?.automationLevel || 'medium';
    const baseTime = getBaseTime(automationLevel);

    // Determine Impact Multiplier
    const impactMult = getImpactMultiplier(v.impact);

    // Determine Repetition Discount
    const groupKey = rid;
    const currentCount = (processedCounts[groupKey] || 0) + 1;
    processedCounts[groupKey] = currentCount;

    let repetitionDiscount = 1.0;
    if (currentCount === 1) {
      repetitionDiscount = 1.0; // 1st: Full cost
    } else if (currentCount <= 5) {
      repetitionDiscount = 0.5; // 2nd-5th: 50%
    } else {
      repetitionDiscount = 0.1; // 6th+: 10%
    }

    const finalMh = baseTime * impactMult * repetitionDiscount;

    // Distribute hours across roles based on their effort percentages
    Object.entries(dist).forEach(([roleKey, percentage]) => {
      const role = roleKey as Role;
      if (percentage > 0) {
        breakdown[role].mh += finalMh * percentage;
        breakdown[role].count++;
        if (v.description) {
          breakdown[role].desc.add(v.description);
        }
        // Count violation frequencies per role for top 3 recommendations
        roleViolationsCount[role][rid] = (roleViolationsCount[role][rid] || 0) + 1;
      }
    });
  });

  // Add File Modification Overhead (0.2 Hours per unique file: 60% Publishing, 40% Development)
  if (totalFilesToEdit > 0) {
    const fileOverheadTotal = totalFilesToEdit * 0.2;
    breakdown['Publishing'].mh += fileOverheadTotal * 0.6;
    breakdown['Development'].mh += fileOverheadTotal * 0.4;
  }

  // Add Common UI QA Verification Overhead (0.05 Hours per common occurrence: 50% Planning, 50% Publishing)
  if (totalCommonOccurrences > 0) {
    const commonVerificationTotal = totalCommonOccurrences * 0.05;
    breakdown['Planning'].mh += commonVerificationTotal * 0.5;
    breakdown['Publishing'].mh += commonVerificationTotal * 0.5;
  }

  // Calculate totals in Man-Months (1 M/M = 160 Hours)
  const totalViolations = filteredViolations.length;
  const totalManHours = Object.values(breakdown).reduce((sum, item) => sum + item.mh, 0);
  const totalManMonths = totalManHours / 160;

  // Format Items (converting internally computed manHours to manMonths)
  const items: CostBreakdown[] = Object.entries(breakdown).map(([role, data]) => ({
    role: role as Role,
    count: data.count,
    manMonths: parseFloat((data.mh / 160).toFixed(4)), // High-fidelity MM (e.g. 0.0012)
    description: Array.from(data.desc).slice(0, 3).join(', ') + (data.desc.size > 3 ? '...' : ''),
  }));

  // Compile Dynamic Recommendations (TOP 3 rule violations per role)
  const recommendations: Record<Role, string[]> = {
    Planning: [],
    Design: [],
    Publishing: [],
    Development: []
  };

  const roles: Role[] = ['Planning', 'Design', 'Publishing', 'Development'];

  roles.forEach(role => {
    // Sort rules for this role by violation count desc
    const sortedRules = Object.entries(roleViolationsCount[role])
      .sort((a, b) => b[1] - a[1]) // Sort desc
      .map(entry => ({ ruleId: entry[0], count: entry[1] }));

    const dynamicRecs: string[] = [];

    sortedRules.forEach(({ ruleId, count }) => {
      const template = RECOMMENDATION_TEMPLATES[ruleId]?.[role];
      if (template) {
        const kwcagItem = getKWCAGByAxeRule(ruleId);
        const kwcagPrefix = kwcagItem ? `[KWCAG ${kwcagItem.id} ${kwcagItem.guideline}] ` : '';
        dynamicRecs.push(`${kwcagPrefix}${template} (검출: ${count}건)`);
      }
    });

    // Pad with default recommendations if fewer than 3
    const finalRecs = [...dynamicRecs];
    const defaults = DEFAULT_RECOMMENDATIONS[role];
    for (let i = 0; i < defaults.length && finalRecs.length < 3; i++) {
      if (!finalRecs.includes(defaults[i])) {
        finalRecs.push(defaults[i]);
      }
    }

    recommendations[role] = finalRecs.slice(0, 3);
  });

  return {
    items,
    totalViolations,
    totalManMonths: parseFloat(totalManMonths.toFixed(4)),
    recommendations
  };
}
