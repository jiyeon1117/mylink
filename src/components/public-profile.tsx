"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { LinkItem, Profile } from "@/lib/types";

type State =
  | { status: "loading" }
  | { status: "notfound" }
  | { status: "ready"; uid: string; profile: Profile; links: LinkItem[] };

const PALETTE = ["bg-pink", "bg-mint", "bg-sky", "bg-surface"];

/**
 * 12주차: /[username] 개인 페이지
 * 1. URL에서 username 추출 → 2. username으로 userId 찾기 → 3. users/{userId}/links 조회
 * 4. 프로필 + 링크 리스트 표시 → 5. 없으면 404
 * 13주차: 링크 클릭 시 clickCount +1, 새 탭으로 열기
 */
export function PublicProfile({ username }: { username: string }) {
  const { store, user } = useAuth();
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    if (!store) return;
    let alive = true;
    (async () => {
      try {
        const uid = await store.getUidByUsername(username);
        if (!uid) return alive && setState({ status: "notfound" });
        const [profile, links] = await Promise.all([store.getProfile(uid), store.getLinks(uid)]);
        if (!profile) return alive && setState({ status: "notfound" });
        if (alive) setState({ status: "ready", uid, profile, links });
      } catch (e) {
        console.error("개인 페이지를 불러오지 못했어요", e);
        if (alive) setState({ status: "notfound" });
      }
    })();
    return () => {
      alive = false;
    };
  }, [store, username]);

  if (state.status === "loading") {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4">
        <div className="size-24 animate-pulse rounded-full bg-black/10" />
        <div className="h-6 w-40 animate-pulse rounded bg-black/10" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-14 w-full animate-pulse rounded-2xl bg-black/10" />
        ))}
      </div>
    );
  }

  if (state.status === "notfound") return <NotFoundView username={username} />;

  const { uid, profile, links } = state;
  const isOwner = user?.uid === uid;

  function handleClick(link: LinkItem) {
    // 서버에 +1 요청 (실패해도 링크 이동은 그대로)
    store?.incrementClick(uid, link.id).catch((e) => console.error("클릭 카운트 저장 실패", e));
  }

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-6">
      <div className="grid size-24 place-items-center rounded-full border-[3px] border-border bg-sky text-4xl font-black shadow-brutal">
        {profile.displayName.slice(0, 1)}
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-black">{profile.displayName}</h1>
        <p className="font-bold text-primary">@{profile.username}</p>
        {profile.bio && <p className="mt-3 text-sm font-medium">{profile.bio}</p>}
      </div>

      {links.length === 0 ? (
        <Card className="w-full">
          <CardContent className="text-center text-sm font-bold text-muted">아직 등록된 링크가 없어요.</CardContent>
        </Card>
      ) : (
        <ul className="flex w-full flex-col gap-3">
          {links.map((link, i) => (
            <li key={link.id}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleClick(link)}
                className={`flex min-h-14 items-center justify-between gap-3 rounded-2xl border-[3px] border-border px-5 py-3 font-extrabold shadow-brutal transition-all hover:-translate-y-0.5 hover:shadow-brutal-lg active:translate-y-0.5 active:shadow-none ${PALETTE[i % PALETTE.length]}`}
              >
                <span className="min-w-0 truncate">{link.title}</span>
                <ExternalLink className="size-4 shrink-0" />
              </a>
            </li>
          ))}
        </ul>
      )}

      {isOwner && (
        <Button asChild variant="outline" size="sm">
          <Link href="/mypage/">내 링크 관리하기 · 통계 보기</Link>
        </Button>
      )}
      <Link href="/" className="text-xs font-bold text-muted underline underline-offset-2">
        마이링크로 나만의 페이지 만들기
      </Link>
    </div>
  );
}

export function NotFoundView({ username }: { username?: string }) {
  return (
    <Card className="mx-auto max-w-md text-center">
      <CardContent className="flex flex-col items-center gap-3 py-10">
        <p className="text-6xl font-black">404</p>
        <h1 className="text-xl font-black">페이지를 찾을 수 없어요</h1>
        <p className="text-sm">
          {username ? (
            <>
              <strong>@{username}</strong> 사용자가 없거나 주소가 바뀌었어요.
            </>
          ) : (
            "주소를 다시 확인해주세요."
          )}
        </p>
        <Button asChild className="mt-2">
          <Link href="/">홈으로</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
