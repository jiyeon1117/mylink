// 강의 교안 각 주차의 '직접 해보기 / 오늘의 실습 체크리스트'
// kind: code = 이 저장소 코드에 반영된 항목, env = 개인 PC·콘솔에서 하는 환경 설정 항목
export type PracticeItem = { text: string; kind: "code" | "env"; where?: string };
export type PracticeWeek = { week: number; title: string; items: PracticeItem[]; result: string; href?: string };

export const practiceWeeks: PracticeWeek[] = [
  {
    week: 1,
    title: "AI 코딩 패러다임과 바이브 코딩",
    result: "Next.js 프로젝트 생성 및 실행",
    href: "/",
    items: [
      { text: "Antigravity 다운로드 및 설치", kind: "env" },
      { text: "Next.js 프로젝트 생성", kind: "code", where: "package.json, src/app" },
      { text: "개발 서버 실행 → 브라우저에서 확인", kind: "code", where: "npm run dev" },
    ],
  },
  {
    week: 2,
    title: "Gemini CLI 환경 준비",
    result: "Next.js 프로필 페이지",
    href: "/",
    items: [
      { text: "Gemini CLI 설치 및 로그인", kind: "env" },
      { text: "Gemini 3.0 Pro 모델 선택", kind: "env" },
      { text: "Next.js 프로필 페이지 생성", kind: "code", where: "src/app/page.tsx" },
    ],
  },
  {
    week: 3,
    title: "Git과 GitHub 버전 관리",
    result: "GitHub 저장소 mylink 연동",
    items: [
      { text: "GitHub 계정 확인 / 가입", kind: "env" },
      { text: "새 레포지토리 생성 (mylink)", kind: "code", where: "github.com/jiyeon1117/mylink" },
      { text: "Git 연동", kind: "code", where: ".git" },
      { text: "첫 커밋 및 푸시", kind: "code", where: "커밋 기록" },
      { text: "GitHub에서 결과 확인", kind: "code", where: "GitHub 저장소" },
    ],
  },
  {
    week: 4,
    title: "효과적인 프롬프트 작성",
    result: "나쁜 vs 좋은 프롬프트 비교",
    href: "/practice/prompt/",
    items: [
      { text: "나쁜 프롬프트로 프로필 스타일링", kind: "code", where: "/practice/prompt" },
      { text: "결과물 확인 및 문제점 분석", kind: "code", where: "/practice/prompt" },
      { text: "좋은 프롬프트로 동일 작업 (네오브루탈리즘)", kind: "code", where: "/practice/prompt" },
      { text: "결과물 비교", kind: "code", where: "/practice/prompt" },
      { text: "브라우저 창 크기 조절로 반응형 확인", kind: "code", where: "360 / 768 / 1024px" },
    ],
  },
  {
    week: 5,
    title: "프로젝트 기획 및 명세 작성",
    result: "PRD · 사용자 시나리오 · 와이어프레임",
    items: [
      { text: "Gemini/Claude로 PRD 초안 작성", kind: "code", where: "docs/PRD.md" },
      { text: "PRD 검토 및 수정", kind: "code", where: "docs/PRD.md" },
      { text: "마크다운 파일로 저장", kind: "code", where: "docs/" },
      { text: "사용자 시나리오 작성", kind: "code", where: "docs/user-scenario.md" },
      { text: "와이어프레임 스케치 (텍스트)", kind: "code", where: "docs/wireframe.md" },
    ],
  },
  {
    week: 6,
    title: "링크 목록 UI 제작",
    result: "shadcn/ui + 더미 데이터 링크 목록",
    href: "/",
    items: [
      { text: "shadcn/ui 설치", kind: "code", where: "src/components/ui" },
      { text: "링크 더미 데이터 작성 (인스타그램 · 유튜브 · 블로그)", kind: "code", where: "src/data/links.ts" },
      { text: "링크 목록 컴포넌트 제작", kind: "code", where: "src/components/link-list.tsx" },
      { text: "화면에서 결과 확인", kind: "code", where: "홈 화면" },
    ],
  },
  {
    week: 7,
    title: "링크 추가 기능 구현 (Create)",
    result: "/mypage 링크 추가 폼",
    href: "/mypage/",
    items: [
      { text: "/mypage 페이지 만들기", kind: "code", where: "src/app/mypage/page.tsx" },
      { text: "링크 추가 폼 만들기 (제목, 주소, 버튼)", kind: "code", where: "add-link-form.tsx" },
      { text: "추가 버튼 클릭 시 목록에 추가", kind: "code", where: "add-link-form.tsx" },
      { text: "입력 칸 자동으로 비우기", kind: "code", where: "add-link-form.tsx" },
      { text: "빈 칸 검증 추가하기", kind: "code", where: "add-link-form.tsx" },
      { text: "테스트: 링크 추가 → 새로고침", kind: "code", where: "9주차에 영구 저장으로 해결" },
    ],
  },
  {
    week: 9,
    title: "Firebase 소개와 연동",
    result: "Firestore 저장 · 불러오기",
    href: "/mypage/",
    items: [
      { text: "Firebase 프로젝트 생성", kind: "env" },
      { text: "Firestore 생성 - 테스트 모드", kind: "env" },
      { text: "Firebase SDK 설치 및 설정", kind: "code", where: "src/lib/firebase-store.ts" },
      { text: "링크 저장 기능 (Create)", kind: "code", where: "addDoc" },
      { text: "링크 불러오기 (Read)", kind: "code", where: "getDocs" },
      { text: "새로고침 후 유지 확인", kind: "code", where: "/mypage" },
    ],
  },
  {
    week: 10,
    title: "링크 수정/삭제 기능 (Update/Delete)",
    result: "인라인 편집 + 삭제 확인 모달 → CRUD 완성",
    href: "/mypage/",
    items: [
      { text: "링크 항목에 수정/삭제 버튼 추가", kind: "code", where: "manage-link-list.tsx" },
      { text: "인라인 편집 UI 구현", kind: "code", where: "manage-link-list.tsx" },
      { text: "Update 기능 Firestore 연동", kind: "code", where: "updateDoc" },
      { text: "삭제 확인 모달 구현", kind: "code", where: "Dialog" },
      { text: "Delete 기능 Firestore 연동", kind: "code", where: "deleteDoc" },
      { text: "전체 테스트 (수정/삭제)", kind: "code", where: "/mypage" },
    ],
  },
  {
    week: 11,
    title: "회원가입과 로그인",
    result: "구글 로그인 + 사용자별 데이터 분리",
    href: "/mypage/",
    items: [
      { text: "Firebase 콘솔에서 구글 로그인 활성화", kind: "env" },
      { text: "AI 프롬프트로 로그인 기능 구현", kind: "code", where: "signInWithPopup" },
      { text: "헤더에 로그인/로그아웃 UI 추가", kind: "code", where: "site-header.tsx" },
      { text: "Firestore 경로 개인화 적용", kind: "code", where: "users/{uid}/links" },
      { text: "테스트: 로그인 후 데이터 분리 확인", kind: "code", where: "/mypage" },
    ],
  },
  {
    week: 12,
    title: "개인별 페이지와 보안",
    result: "프로필 수정 + /username 공개 페이지 + Security Rules",
    href: "/jiyeon1117/",
    items: [
      { text: "마이페이지에 프로필 수정 기능 추가", kind: "code", where: "profile-editor.tsx" },
      { text: "AI 프롬프트로 /[username] 페이지 생성", kind: "code", where: "src/app/[username]" },
      { text: "Security Rules 설정 + 테스트", kind: "code", where: "firestore.rules" },
    ],
  },
  {
    week: 13,
    title: "클릭 통계 기능",
    result: "클릭 카운트 + 마이페이지 통계 섹션",
    href: "/mypage/",
    items: [
      { text: "AI 프롬프트로 링크 클릭 카운트 저장 구현", kind: "code", where: "increment(1)" },
      { text: "각 링크별 클릭수 표시 기능 추가", kind: "code", where: "stats-section.tsx" },
      { text: "마이페이지에 통계 섹션 추가", kind: "code", where: "stats-section.tsx" },
      { text: "테스트: 링크 클릭하고 통계 확인", kind: "code", where: "/jiyeon1117 → /mypage" },
    ],
  },
];
