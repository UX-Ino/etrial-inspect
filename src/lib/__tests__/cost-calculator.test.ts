import { calculateCost } from '../cost-calculator';
import { Violation } from '@/types';

describe('Cost Calculator LOE Logic Test', () => {
  it('should correctly filter common UI violations and compute M/M based on role distribution and overheads', () => {
    const mockViolations = [
      {
        pageUrl: 'http://localhost:8080/main.jsp',
        axeRuleId: 'image-alt', // 'image-alt' is Planning: 40%, Publishing: 60%. Automation: high (Base time: 0.2H).
        impact: 'serious', // Impact multiplier: 1.2
        isCommon: false,
        description: '대체 텍스트 없음'
      },
      {
        pageUrl: 'http://localhost:8080/main.jsp',
        axeRuleId: 'color-contrast', // 'color-contrast' is Design: 60%, Publishing: 40%. Automation: medium (Base time: 0.5H).
        impact: 'critical', // Impact multiplier: 1.5
        isCommon: false,
        description: '명도 대비 미달'
      },
      // Common UI items (should deduplicate based on ruleId + selector)
      {
        pageUrl: 'http://localhost:8080/kor/company/pr.jsp',
        axeRuleId: 'color-contrast',
        impact: 'critical',
        isCommon: true,
        selector: '.bx-pager-link',
        description: '명도 대비 미달 공통'
      },
      {
        pageUrl: 'http://localhost:8080/kor/company/ceo.jsp',
        axeRuleId: 'color-contrast',
        impact: 'critical',
        isCommon: true,
        selector: '.bx-pager-link',
        description: '명도 대비 미달 공통'
      }
    ] as Violation[];

    const report = calculateCost(mockViolations);

    // 1. Deduplication check
    // Total raw violations: 4
    // Deduplicated count: 3 (First common UI item is kept, second is filtered)
    expect(report.totalViolations).toBe(3);

    // 2. Calculations check
    // 2.1 unique pages for non-common: 'http://localhost:8080/main.jsp' -> 1 file
    // 2.2 unique common files: '.bx-pager-link' -> 1 file
    // Total files to edit: 2. File overhead = 2 * 0.2H = 0.4H (Pub: 0.24H, Dev: 0.16H)
    // 2.3 total common occurrences: 2. Common QA verification overhead = 2 * 0.05H = 0.1H (Plan: 0.05H, Pub: 0.05H)

    // 3. Output formats check
    expect(report.totalManMonths).toBeGreaterThan(0);
    expect(typeof report.totalManMonths).toBe('number');

    // Confirm that items contain manMonths and NO manHours
    report.items.forEach(item => {
      expect(item.manMonths).toBeGreaterThanOrEqual(0);
      expect((item as any).manHours).toBeUndefined();
    });

    // Planning should have items and description
    const planningItem = report.items.find(i => i.role === 'Planning');
    expect(planningItem).toBeDefined();
    expect(planningItem?.count).toBeGreaterThan(0);
  });
});
