// 6주차: 링크 더미 데이터 (데이터와 화면 분리 — 이 파일만 바꾸면 화면도 바뀜)
export type DummyLink = {
  id: string;
  title: string;
  url: string;
  description: string;
  emoji: string;
};

export const dummyLinks: DummyLink[] = [
  {
    id: "instagram",
    title: "인스타그램",
    url: "https://www.instagram.com/",
    description: "일상 사진과 소식",
    emoji: "📸",
  },
  {
    id: "youtube",
    title: "유튜브",
    url: "https://www.youtube.com/",
    description: "개발 공부 영상 모음",
    emoji: "▶️",
  },
  {
    id: "blog",
    title: "블로그",
    url: "https://blog.naver.com/",
    description: "공부 기록과 회고",
    emoji: "✍️",
  },
];
