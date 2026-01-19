# E-able A11y - 웹 접근성 자동 진단 도구

KWCAG 2.2 표준을 기반으로 한 자동 웹 접근성 진단 데스크톱 애플리케이션입니다. Electron, Next.js, Playwright, 그리고 Axe-core로 구축되었습니다.

## 🚀 주요 기능

### 웹 접근성 진단 (KWCAG 2.2)
- **자동 크롤링**: 대상 도메인 내의 페이지를 재귀적으로 탐색합니다.
- **접근성 진단**: `axe-core`와 개선된 KWCAG 규칙을 사용하여 페이지를 정밀 진단합니다.
- **대화형 리포트**: 원칙별, 영향도별, 또는 특정 KWCAG 지침별로 위반 사항을 필터링하여 확인합니다.

### SEO 최적화 분석 (v2.0 신규)
- **Sitemap.xml 검수**: 파일 존재, XML 유효성, URL 접근성, robots.txt 연동 확인
- **메타데이터 검증**: Title, Description, Canonical, Open Graph, Viewport 태그 분석
- **점수 산출**: 자동화된 SEO 점수 (0-100점)

### AI 친화도 분석 (GEO, v2.0 신규)
- **llms.txt 파서**: Markdown 구조, 키워드 밀도, 가독성 평가
- **규칙 기반 품질 평가**: 구조/분량/요약/키워드/가독성 5가지 기준 (완전 무료)
- **AI 프롬프트 생성**: ChatGPT/Gemini/Claude용 전문가 프롬프트 자동 생성
- **자동 템플릿 제안**: llms.txt 파일이 없을 경우 사이트 맞춤 템플릿 생성

### 통합 리포트
- **하이브리드 아키텍처**: 웹 애플리케이션과 독립형 데스크톱 애플리케이션 모두로 동작
- **엑셀 내보내기**: 
  - 접근성 진단 상세 리포트
  - SEO 분석 시트 (Sitemap + 메타데이터)
  - AI 최적화 시트 (llms.txt 평가 + 템플릿)
  - 종합 점수 대시보드
- **Radar Chart**: 접근성/SEO/AI 점수 시각화

## 🛠 기술 스택

- **Frontend**: Next.js 16 (App Router), React 19, Turbopack
- **Desktop Runtime**: Electron 34
- **Audit Engine**: Playwright, @axe-core/playwright
- **Storage**: LocalStorage (세션 유지용) & File System (파일 내보내기용)

## 📂 프로젝트 구조

```
.
├── src/                # Next.js 프론트엔드 소스
│   ├── app/            # App Router 페이지
│   ├── components/     # React 컴포넌트
│   ├── services/       # 비즈니스 로직 및 플랫폼 서비스
│   └── lib/            # 공유 라이브러리 (Excel, Parser)
├── electron-src/       # Electron 메인 프로세스 소스
│   ├── main.ts         # 메인 프로세스 진입점
│   └── preload.ts      # 프리로드 스크립트 (ContextBridge)
├── dist/               # Electron 빌드 결과물
├── out/                # Next.js 정적 내보내기 결과물
└── tsconfig.*.json     # TypeScript 설정 파일들
```

## 🏁 시작하기

### 사전 요구 사항

- Node.js 18 이상
- npm 또는 yarn

### 설치

```bash
npm install
```

### 개발 모드 실행

#### 1. 웹 모드 (브라우저)
Next.js 개발 서버를 실행합니다. UI 개발 시 유용합니다.

```bash
npm run dev
# 브라우저에서 http://localhost:3000 접속
```

#### 2. Electron 모드 (데스크톱)
Electron 래퍼로 애플리케이션을 실행합니다. 네이티브 기능(IPC, 파일 시스템 등) 테스트 시 유용합니다.

```bash
npm run electron:dev
# Next.js를 시작하고 Electron 창을 실행합니다.
```

### 빌드 및 배포

설치 가능한 데스크톱 애플리케이션(DMG, EXE, AppImage)을 생성하려면:

```bash
npm run dist
```
빌드된 설치 파일은 `dist/installers` 디렉토리에 생성됩니다.

## 📖 사용 방법

### 기본 사용
1. 애플리케이션 실행 (`npm run electron:dev`)
2. 대상 URL 입력 (예: `https://example.com`)
3. 진단 항목 선택:
   - ☑ 웹접근성 (KWCAG 2.2)
   - ☑ SEO 최적화
   - ☑ AI 친화도
4. "전수 검사 시작" 버튼 클릭
5. 진단 완료 후 "엑셀 다운로드" 또는 "상세 리포트 보기"

### SEO/AI 진단 활용
- **SEO 분석**: Sitemap.xml, 메타 태그, robots.txt 자동 검증
- **AI 친화도 평가**: llms.txt 파일 품질 분석 (0-100점)
- **AI 프롬프트 생성**: 리포트 화면에서 "AI에게 추가 검증 요청" 버튼 클릭
  - ChatGPT/Gemini/Claude 중 선택
  - 전문가 프롬프트가 자동으로 복사되고 AI 도구가 새 탭에서 열림
  - Ctrl/Cmd+V로 붙여넣기하여 심층 분석 요청

### Excel 리포트 구조
v2.0부터 Excel 파일에 다음 시트들이 포함됩니다:
1. **접근성 진단 결과**: KWCAG 2.2 위반 상세 내역
2. **SEO 분석**: Sitemap.xml 및 메타데이터 검수
3. **AI 최적화**: llms.txt 평가 및 자동 생성 템플릿
4. **종합 점수**: 접근성/SEO/AI 통합 점수 (A~F 등급)

## 🔄 버전 히스토리

### v2.0 (2026-01-05)
- ✨ **신규**: SEO 최적화 분석 기능
- ✨ **신규**: AI 친화도 분석 (GEO) 기능
- ✨ **신규**: AI 프롬프트 자동 생성 (ChatGPT/Gemini/Claude)
- ✨ **신규**: Radar Chart 시각화
- ✨ **신규**: Excel 리포트 3개 시트 추가
- 🎨 **개선**: 진단 옵션 체크박스 (접근성/SEO/AI 선택 가능)
- 📦 **의존성**: `fast-xml-parser`, `marked`, `recharts` 추가

### v1.0 (이전)
- ✅ KWCAG 2.2 웹 접근성 자동 진단
- ✅ Playwright + axe-core 기반 크롤링
- ✅ Excel 리포트 생성
- ✅ Electron 데스크톱 앱

## 🧩 아키텍처 참고 사항

- **플랫폼 추상화**: `PlatformAuditService`를 통해 실행 환경을 감지하고, `WebAuditService` (HTTP API)와 `ElectronAuditService` (IPC) 중 적절한 방식을 자동으로 전환하여 사용합니다.
- **IPC 통신**: 데스크톱 모드 실행 시, 브라우저 샌드박스 제한을 피하기 위해 크롤링, 엑셀 생성 등의 무거운 작업은 `ipcRenderer`를 통해 Electron 메인 프로세스로 위임됩니다.
- **SEO/AI 진단**: 
  - Sitemap 파싱: `fast-xml-parser` 사용
  - llms.txt 분석: 정규식 기반 Markdown 파싱
  - 완전 무료: API 키 불필요, 규칙 기반 평가

## 📄 라이선스

사내용 (Internal Use Only).
# E-able-a11y
