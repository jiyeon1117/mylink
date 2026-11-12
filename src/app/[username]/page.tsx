import { PublicProfile } from "@/components/public-profile";

// 12주차: /[username] 동적 라우팅
// GitHub Pages는 정적 호스팅이라 대표 계정만 미리 생성하고,
// 나머지 username은 404.html(not-found.tsx)에서 같은 화면으로 처리합니다.
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ username: "jiyeon1117" }];
}

export default async function UserPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  return <PublicProfile username={decodeURIComponent(username)} />;
}
