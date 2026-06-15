# Skill: KWCAG 룰 추가

## 언제 사용하나
새로운 KWCAG 또는 axe-core 커스텀 룰을 이 프로젝트에 추가할 때.

## 룰 파일 위치
```
src/
└── features/
    └── audit/
        └── rules/          # 커스텀 KWCAG 룰 정의
```

## 추가 절차

### 1단계: 기존 룰 파악
```bash
# 현재 등록된 룰 확인
find src/features/audit/rules -name "*.ts" | head -20
```

### 2단계: 룰 파일 생성
파일명 패턴: `kwcag-{원칙번호}-{지침번호}-{설명}.ts`
예: `kwcag-1-1-1-alt-text.ts`

```typescript
import type { RuleObject } from 'axe-core';

export const kwcag_X_X_X: RuleObject = {
  id: 'kwcag-X-X-X',
  selector: '/* CSS 셀렉터 */',
  tags: ['kwcag22', 'wcag2a'],
  metadata: {
    description: '룰 설명',
    help: '수정 방법 안내',
    helpUrl: 'https://www.wah.or.kr/',
  },
  check: (node, _options, context) => {
    // 검사 로직
    // true = 통과, false = 위반
    return true;
  },
};
```

### 3단계: 룰 등록
룰 목록 인덱스 파일(예: `src/features/audit/rules/index.ts`)에 추가:
```typescript
export { kwcag_X_X_X } from './kwcag-X-X-X-description';
```

### 4단계: 테스트 작성 (TDD)
```bash
# 테스트 파일 위치
src/features/audit/rules/__tests__/kwcag-X-X-X.test.ts
```
- RED: 위반 케이스에서 `false` 반환 확인
- GREEN: 통과 케이스에서 `true` 반환 확인
- REFACTOR: 엣지 케이스 추가

### 5단계: 품질 게이트
```bash
npm test -- --testPathPattern="kwcag-X-X-X"  # 해당 룰 테스트
npm run build                                  # 빌드 오류 없음 확인
```

### 6단계: 문서 업데이트
`.agent/rules/Accessibility-Checklist2.1.md`에 해당 항목 추가 또는 체크.

## 관련 파일
- `.claude/rules/a11y-coding.md` — 접근성 코딩 정책
- `.agent/rules/Accessibility-Basic.md` — 개념 참조
- `docs/plans/` — 대규모 룰 추가 시 계획 문서 작성
