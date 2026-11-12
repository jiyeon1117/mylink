import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { DummyLink } from "@/data/links";

// 6주차: 링크 목록 컴포넌트 (shadcn/ui Card 활용, 더미 데이터를 받아서 렌더링)
export function LinkList({ links }: { links: DummyLink[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {links.map((link) => (
        <li key={link.id}>
          <Card className="transition-transform hover:-translate-y-0.5 hover:shadow-brutal-lg">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border-[3px] border-border bg-background text-xl">
                {link.emoji}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-extrabold">{link.title}</span>
                <span className="block truncate text-sm text-muted">{link.description}</span>
              </span>
              <ExternalLink className="size-5 shrink-0" />
            </a>
          </Card>
        </li>
      ))}
    </ul>
  );
}
