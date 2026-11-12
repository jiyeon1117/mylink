# 🔗 마이링크 (MyLink)

> **아이디어를 현실로 - 바이브 코딩** 16주 프로젝트 · 링크트리 클론

나의 모든 링크를 한 페이지에 모아 `/username` 주소 하나로 공유하는 서비스입니다.

- **배포 주소:** https://jiyeon1117.github.io/mylink/
- **내 공개 페이지:** https://jiyeon1117.github.io/mylink/jiyeon1117/

## 기술 스택

Next.js 15 (App Router, Static Export) · TypeScript · Tailwind CSS 4 · shadcn/ui · Firebase (Firestore, Auth) · GitHub Pages

## 주요 기능

| 기능 | 위치 |
| --- | --- |
| 네오브루탈리즘 프로필 페이지 | `/` |
| 링크 목록 (더미 데이터, shadcn/ui) | `/` |
| 링크 추가 · 수정 · 삭제 (CRUD) + 입력 검증 | `/mypage` |
| 구글 로그인 / 로그아웃 | 헤더 |
| 프로필 수정 (username · displayName · bio, 중복 체크) | `/mypage` |
| 개인 공개 페이지 + 404 | `/{username}` |
| 링크 클릭 카운트 + 통계 섹션 | `/{username}` → `/mypage` |

## 주차별 '직접 해보기' 체크리스트

| 주차 | 주제 | 실습 결과 |
| --- | --- | --- |
| 1 | AI 코딩 패러다임 | ✅ Next.js 프로젝트 생성 · 개발 서버 실행 |
| 2 | Gemini CLI 환경 준비 | ✅ 프로필 페이지 (`src/app/page.tsx`) |
| 3 | Git과 GitHub | ✅ `mylink` 저장소 생성 · 커밋 · 푸시 |
| 4 | 효과적인 프롬프트 | ✅ 좋은 프롬프트로 네오브루탈리즘 스타일링, 반응형 확인 |
| 5 | 기획 및 명세 | ✅ [PRD](docs/PRD.md) · [사용자 시나리오](docs/user-scenario.md) · [와이어프레임](docs/wireframe.md) |
| 6 | 링크 목록 UI | ✅ shadcn/ui 컴포넌트 · 더미 데이터(`src/data/links.ts`) · 링크 목록 |
| 7 | 링크 추가 (Create) | ✅ `/mypage` 폼 · 입력 칸 비우기 · 빈 칸/주소 형식 검증 |
| 9 | Firebase 연동 | ✅ Firestore 저장(addDoc) · 불러오기(getDocs) · 새로고침 후 유지 |
| 10 | 수정/삭제 (Update/Delete) | ✅ 인라인 편집 · 삭제 확인 모달 · updateDoc/deleteDoc |
| 11 | 회원가입과 로그인 | ✅ 구글 로그인 · 헤더 UI · `users/{uid}/links` 개인화 |
| 12 | 개인별 페이지와 보안 | ✅ 프로필 수정 · `/[username]` · [Security Rules](firestore.rules) |
| 13 | 클릭 통계 | ✅ `increment(1)` 클릭 카운트 · 총/링크별 클릭수 통계 |

> Antigravity·Gemini CLI 설치 같은 개발 환경 설정은 각자 PC에서 진행하는 항목입니다.

## Firebase 연결 (완료)

| 항목 | 설정 |
| --- | --- |
| 프로젝트 | `mylink-project` (ID `mylink-project-853cf`), Analytics 사용 안 함 |
| Firestore | Standard, 리전 `asia-northeast3 (Seoul)`, 테스트 모드로 생성 후 [`firestore.rules`](firestore.rules) 게시 |
| Authentication | Google 로그인 사용 설정, 승인된 도메인에 `jiyeon1117.github.io` 추가 |
| 웹 앱 | `mylink-web` — 설정값은 [`src/lib/firebase-config.ts`](src/lib/firebase-config.ts) |

> 웹 앱 설정값(apiKey 등)은 브라우저에 그대로 전달되는 공개 정보이고, 데이터 보호는 Security Rules가 담당합니다.
> `NEXT_PUBLIC_DEMO_MODE=1`로 빌드하면 Firebase 없이 브라우저 저장소(데모 모드)로 동작합니다.

## 로컬 실행

```bash
npm install
cp .env.example .env.local   # (선택) Firebase 값 입력
npm run dev                  # http://localhost:3000/mylink
```

## Firestore 구조

```
users/{userId}/profile/main      { username, displayName, bio }
users/{userId}/links/{linkId}    { title, url, clickCount, createdAt }
usernames/{username}             { uid }
```
