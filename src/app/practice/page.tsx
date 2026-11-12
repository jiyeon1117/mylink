import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Laptop, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { practiceWeeks } from "@/data/practice";

export const metadata: Metadata = { title: "학습기록 · 마이링크" };

export default function PracticePage() {
  const codeCount = practiceWeeks.flatMap((w) => w.items).filter((i) => i.kind === "code").length;
  const total = practiceWeeks.flatMap((w) => w.items).length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-bold text-muted">아이디어를 현실로 - 바이브 코딩</p>
        <h1 className="text-3xl font-black">주차별 &lsquo;직접 해보기&rsquo; 기록</h1>
        <p className="mt-2 text-sm">
          강의 교안의 실습 체크리스트 {total}개 중 {codeCount}개는 이 사이트 코드에 반영됐고, 나머지는 개인 PC·콘솔에서 하는
          환경 설정이에요.
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-xs font-bold">
          <span className="flex items-center gap-1 rounded-full border-2 border-border bg-mint px-3 py-1">
            <CheckCircle2 className="size-4" /> 코드에 반영
          </span>
          <span className="flex items-center gap-1 rounded-full border-2 border-border bg-surface px-3 py-1">
            <Laptop className="size-4" /> 환경 설정 (PC·콘솔)
          </span>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {practiceWeeks.map((w) => (
          <Card key={w.week} className="flex flex-col">
            <CardHeader>
              <span className="w-fit rounded-full border-2 border-border bg-pink px-3 text-xs font-black">{w.week}주차</span>
              <CardTitle className="mt-1">{w.title}</CardTitle>
              <CardDescription>결과물: {w.result}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <ul className="flex flex-col gap-2">
                {w.items.map((item) => (
                  <li key={item.text} className="flex gap-2 text-sm">
                    {item.kind === "code" ? (
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-700" aria-label="코드에 반영" />
                    ) : (
                      <Laptop className="mt-0.5 size-4 shrink-0" aria-label="환경 설정" />
                    )}
                    <span className="min-w-0">
                      <span className="font-bold">{item.text}</span>
                      {item.where && <span className="block text-xs text-muted">{item.where}</span>}
                    </span>
                  </li>
                ))}
              </ul>
              {w.href && (
                <Link
                  href={w.href}
                  className="mt-auto flex w-fit items-center gap-1 text-sm font-black text-primary underline underline-offset-2"
                >
                  결과 보기 <ArrowRight className="size-4" />
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
