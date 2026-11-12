# 마이링크(MyLink) PRD

> 5주차 실습: AI(Gemini/Claude)로 초안 작성 → 검토·수정 → 마크다운 파일로 저장

## 1. 개요

| 항목 | 내용 |
| --- | --- |
| 제품명 | 마이링크 (MyLink) |
| 한 줄 소개 | 여러 SNS·블로그 링크를 한 페이지에 모아 하나의 주소로 공유하는 링크트리 클론 |
| 대상 사용자 | 인스타그램 프로필 등에 링크를 하나만 걸 수 있어 불편한 학생·크리에이터 |
| 기술 스택 | Next.js(App Router) · TypeScript · Tailwind CSS · shadcn/ui · Firebase(Firestore, Auth) |
| 배포 | GitHub Pages (정적 배포) |

## 2. 문제 정의

- SNS 프로필에는 링크를 하나만 넣을 수 있다.
- 블로그, 유튜브, 포트폴리오를 각각 알려주기 번거롭다.
- 어떤 링크를 사람들이 많이 누르는지 알 수 없다.

## 3. 목표

1. 나만의 공유 주소(`/username`) 하나로 모든 링크를 보여준다.
2. 로그인한 본인만 링크를 추가·수정·삭제할 수 있다.
3. 링크별 클릭 수를 확인할 수 있다.

## 4. 핵심 기능 (MVP)

| 우선순위 | 기능 | 설명 | 주차 |
| --- | --- | --- | --- |
| P0 | 프로필 페이지 | 이름, 소개, 이미지 | 2·4주차 |
| P0 | 링크 목록(Read) | 링크를 카드/버튼 형태로 표시 | 6주차 |
| P0 | 링크 추가(Create) | 제목·주소 입력, 빈 칸/주소 형식 검증 | 7주차 |
| P0 | 영구 저장 | Firestore에 저장, 새로고침해도 유지 | 9주차 |
| P0 | 링크 수정/삭제(Update/Delete) | 인라인 편집, 삭제 확인 모달 | 10주차 |
| P0 | 구글 로그인 | Firebase Auth, 사용자별 데이터 분리 | 11주차 |
| P1 | 개인 공개 페이지 | `/username` 동적 라우팅, 프로필 수정 | 12주차 |
| P1 | 보안 규칙 | 읽기는 누구나, 쓰기는 본인만 | 12주차 |
| P1 | 클릭 통계 | 링크별 클릭 수, 총 클릭 수 | 13주차 |
| P2 | 배포 | 외부에서 접속 가능한 URL | 14주차 |

## 5. 데이터 구조 (Firestore)

```
users/{userId}/profile/main      { username, displayName, bio }
users/{userId}/links/{linkId}    { title, url, clickCount, createdAt }
usernames/{username}             { uid }   ← username 중복 체크용
```

## 6. 화면 목록

| 경로 | 화면 | 권한 |
| --- | --- | --- |
| `/` | 홈 (프로필 + 추천 링크) | 누구나 |
| `/mypage` | 링크 관리 + 프로필 수정 + 통계 | 로그인 필수 |
| `/{username}` | 개인 공개 페이지 | 누구나 |
| `/practice` | 주차별 실습 기록 | 누구나 |

## 7. 비기능 요구사항

- 반응형: 모바일 360px / 태블릿 768px / 데스크탑 1024px
- 디자인: 네오브루탈리즘 (굵은 테두리 3px, 굵은 그림자, 밝은 노란 배경) — [design.md](./design.md)
- 보안: Firestore Security Rules로 본인 데이터만 쓰기 가능
- AI가 만든 코드는 반드시 직접 실행·검증한다 (AI 코드 보안 취약점 가능성)

## 8. 검토하며 수정한 점

- AI 초안의 "회원가입 페이지 별도 제작" → 구글 소셜 로그인으로 대체 (구현 단순화)
- AI 초안의 "프로필 이미지 업로드" → MVP에서 제외 (Storage 설정 부담), 이니셜 아바타 사용
- `users/{userId}/profile`은 Firestore에서 문서 경로가 아니므로 `profile/main` 문서로 수정
- username 중복 체크를 위해 `usernames` 컬렉션 추가
