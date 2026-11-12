import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LinkList } from "@/components/link-list";
import { dummyLinks } from "@/data/links";

// 2주차: 프로필 페이지 → 4주차: 네오브루탈리즘 스타일링 → 6주차: 링크 목록 UI
export default function Home() {
  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-start">
      <section aria-labelledby="profile-title">
        <Card className="overflow-hidden">
          <div className="h-24 border-b-[3px] border-border bg-pink" />
          <CardContent className="-mt-14 flex flex-col items-center text-center">
            <div className="grid size-24 place-items-center rounded-full border-[3px] border-border bg-sky text-4xl shadow-brutal">
              👩‍💻
            </div>
            <h1 id="profile-title" className="mt-4 text-2xl font-black sm:text-3xl">
              지연 <span className="text-primary">@jiyeon1117</span>
            </h1>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {["Next.js", "Firebase", "Gemini CLI", "Antigravity"].map((t) => (
                <span key={t} className="rounded-full border-2 border-border bg-background px-3 py-0.5 text-xs font-bold">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild>
                <Link href="/jiyeon1117/">
                  내 공개 페이지 보기 <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/mypage/">링크 관리하기</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section aria-labelledby="links-title" className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5" />
          <h2 id="links-title" className="text-xl font-black">
            추천 링크
          </h2>
          <span className="rounded-full border-2 border-border bg-mint px-2 text-xs font-bold">더미 데이터</span>
        </div>
        <LinkList links={dummyLinks} />
      </section>
    </div>
  );
}
