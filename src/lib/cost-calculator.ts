import { Violation } from '@/types';
import { getKWCAGByAxeRule } from './kwcag-mapping';

export type Role = 'Planning' | 'Design' | 'Publishing' | 'Development';

export interface CostBreakdown {
  role: Role;
  count: number; // Unique violations (after common UI dedupe)
  manHours: number;
  description: string;
}

export interface CostReport {
  items: CostBreakdown[];
  totalViolations: number;
  totalManHours: number;
  totalManMonths: number; // 1 M/M = 160h
  recommendations: Record<Role, string[]>;
}

// Role mapping only (Base MH is now calculated dynamically)
const ROLE_MAPPING: Record<string, Role> = {
  // 1. Perception
  'image-alt': 'Planning',
  'video-caption': 'Publishing',
  'heading-order': 'Publishing',
  'color-contrast': 'Design',
  'link-in-text-block': 'Design',

  // 2. Operation
  'accesskeys': 'Publishing',
  'tabindex': 'Development',
  'focus-order-semantics': 'Development',
  'button-name': 'Publishing',
  'link-name': 'Publishing',
  'bypass': 'Publishing',
  'skip-link': 'Publishing',
  'page-has-heading-one': 'Publishing',
  'duplicate-id': 'Publishing',
  'frame-title': 'Planning',

  // 3. Understandable
  'html-has-lang': 'Publishing',
  'valid-lang': 'Publishing',
  'label': 'Publishing',
  'label-title-only': 'Publishing',

  // 4. Robust
  'aria-allowed-attr': 'Publishing',
  'aria-roles': 'Publishing',
  'aria-valid-attr': 'Publishing',

  // Default fallback
  'default': 'Publishing',
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
  // If isCommon is true, keep only the FIRST instance of that (kwcagId + selector? or just kwcagId?)
  // Let's use a unique key for common items: ruleId + selector
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

  // 2. Group for Repetition Discount
  // Key: axeRuleId + failureSummary (Assuming similar failures = similar fix)
  const repetitionGroups: Record<string, number> = {};
  filteredViolations.forEach(v => {
    const key = `${v.axeRuleId}`; // Simplification: Group by Rule ID for massive bulk discount
    repetitionGroups[key] = (repetitionGroups[key] || 0) + 1;
  });

  // Track processed count for each group to apply tiered discount
  const processedCounts: Record<string, number> = {};

  filteredViolations.forEach(v => {
    const rid = v.axeRuleId || 'default';
    const kwcagItem = getKWCAGByAxeRule(rid);

    // Determine Role
    const role = ROLE_MAPPING[rid] || ROLE_MAPPING['default'];

    // Determine Base Time
    // Default to 'medium' if mapping not found to be safe
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
      repetitionDiscount = 0.1; // 6th+: 10% (Bulk fix efficiently)
    }

    // Common UI (isCommon=true) implies it appears on many pages but we filtered it to 1 instance above.
    // So for the single instance remaining, we charge full price (or impact weighted).
    // No special 'common' logic needed here as deduplication handled it.

    const finalMh = baseTime * impactMult * repetitionDiscount;

    breakdown[role].count++;
    breakdown[role].mh += finalMh;
    if (v.description) breakdown[role].desc.add(v.description);
  });

  // Calculate totals
  const totalViolations = filteredViolations.length; // Actually counted violations for cost
  // Note: Total displayed violations in report might be higher (raw), but this report validates COST.
  const totalManHours = Object.values(breakdown).reduce((sum, item) => sum + item.mh, 0);
  const totalManMonths = totalManHours / 160;

  // Format Items
  const items: CostBreakdown[] = Object.entries(breakdown).map(([role, data]) => ({
    role: role as Role,
    count: data.count,
    manHours: parseFloat(data.mh.toFixed(1)),
    description: Array.from(data.desc).slice(0, 3).join(', ') + (data.desc.size > 3 ? '...' : ''),
  }));

  // Smart Recommendations based on dominant cost driver
  const recommendations: Record<Role, string[]> = {
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

  return {
    items,
    totalViolations,
    totalManHours: parseFloat(totalManHours.toFixed(1)),
    totalManMonths: parseFloat(totalManMonths.toFixed(2)),
    recommendations
  };
}
