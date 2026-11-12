"use client";

import Link from "next/link";
import { LogIn, LogOut, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import { storeMode } from "@/lib/store";

// 11주차: 헤더에 로그인/로그아웃 UI
export function SiteHeader() {
  const { user, loading, signIn, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-border bg-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2 text-lg font-black">
          <span className="grid size-8 place-items-center rounded-lg border-[3px] border-border bg-primary text-white">
            <Link2 className="size-4" />
          </span>
          <span className="hidden min-[400px]:inline">마이링크</span>
        </Link>

        <nav className="flex min-w-0 items-center gap-0.5 whitespace-nowrap text-[13px] font-bold sm:gap-3 sm:text-sm">
          <Link href="/mypage/" className="rounded-lg px-1.5 py-1 hover:bg-black/5 sm:px-2">
            마이페이지
          </Link>
          <Link href="/prompt/" className="rounded-lg px-1.5 py-1 hover:bg-black/5 sm:px-2">
            프롬프트 비교
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {loading ? (
            <span className="h-9 w-24 animate-pulse rounded-xl bg-black/10" />
          ) : user ? (
            <>
              <span className="hidden text-sm font-bold sm:inline">{user.displayName}님</span>
              <Button size="sm" variant="outline" onClick={signOut} aria-label="로그아웃">
                <LogOut /> <span className="hidden min-[420px]:inline">로그아웃</span>
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={signIn}>
              <LogIn />
              <span className="hidden min-[420px]:inline">{storeMode === "firebase" ? "Google로 로그인" : "데모 로그인"}</span>
              <span className="min-[420px]:hidden">로그인</span>
            </Button>
          )}
        </div>
      </div>
      {storeMode === "demo" && (
        <p className="border-t-2 border-border bg-mint px-4 py-1 text-center text-xs font-bold">
          데모 모드: Firebase 연결 전이라 데이터가 이 브라우저(localStorage)에 저장돼요
        </p>
      )}
    </header>
  );
}
