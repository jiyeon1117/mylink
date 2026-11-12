import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { LinkItem } from "@/lib/types";

/** 13주차: 통계 섹션 — 총 클릭수 + 링크별 클릭수(많은 순) */
export function StatsSection({ links }: { links: LinkItem[] }) {
  const total = links.reduce((sum, l) => sum + (l.clickCount || 0), 0);
  const sorted = [...links].sort((a, b) => b.clickCount - a.clickCount);
  const max = Math.max(1, ...sorted.map((l) => l.clickCount));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="size-5" /> 클릭 통계
        </CardTitle>
        <CardDescription>공개 페이지에서 방문자가 링크를 누를 때마다 +1씩 올라가요.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="rounded-xl border-[3px] border-border bg-primary px-5 py-4 text-white shadow-brutal">
          <p className="text-sm font-bold opacity-90">총 클릭수</p>
          <p className="text-4xl font-black tabular-nums sm:text-5xl">
            총 {total.toLocaleString("ko-KR")} <span className="text-2xl">클릭</span>
          </p>
        </div>

        {sorted.length === 0 ? (
          <p className="text-sm font-bold text-muted">링크를 추가하면 통계가 표시돼요.</p>
        ) : (
          <ol className="flex flex-col gap-3">
            {sorted.map((l, i) => (
              <li key={l.id} className="flex flex-col gap-1">
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="min-w-0 truncate font-extrabold">
                    {i + 1}. {l.title}
                  </span>
                  <span className="shrink-0 font-black tabular-nums">{l.clickCount.toLocaleString("ko-KR")} 클릭</span>
                </div>
                <div className="h-4 overflow-hidden rounded-full border-2 border-border bg-surface">
                  <div
                    className="h-full bg-mint transition-[width] duration-500"
                    style={{ width: `${(l.clickCount / max) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  );
}
