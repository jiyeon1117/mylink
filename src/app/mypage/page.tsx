"use client";

import { useCallback, useEffect, useState } from "react";
import { LogIn, RefreshCw } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AddLinkForm } from "@/components/mypage/add-link-form";
import { ManageLinkList } from "@/components/mypage/manage-link-list";
import { ProfileEditor } from "@/components/mypage/profile-editor";
import { StatsSection } from "@/components/mypage/stats-section";
import type { LinkInput, LinkItem, Profile } from "@/lib/types";
import { storeMode } from "@/lib/store";

/**
 * 7주차: /mypage (상단 제목 / 중간 폼 / 하단 목록)
 * 9주차: Firestore 저장·불러오기, 10주차: 수정·삭제
 * 11주차: 로그인 필수, 12주차: 프로필 수정, 13주차: 통계 섹션
 */
export default function MyPage() {
  const { user, loading, store, signIn } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [linksLoading, setLinksLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    if (!store || !user) return;
    setLinksLoading(true);
    try {
      setLinks(await store.getLinks(user.uid)); // Read
      setError("");
    } catch (e) {
      console.error(e);
      setError("링크를 불러오지 못했어요.");
    } finally {
      setLinksLoading(false);
    }
  }, [store, user]);

  useEffect(() => {
    if (!store || !user) return;
    store.ensureProfile(user).then(setProfile).catch((e) => {
      console.error(e);
      setError("프로필을 불러오지 못했어요.");
    });
    refresh();
  }, [store, user, refresh]);

  if (loading) {
    return <div className="h-64 animate-pulse rounded-2xl border-[3px] border-border/20 bg-black/5" />;
  }

  if (!user || !store) {
    return (
      <Card className="mx-auto max-w-md text-center">
        <CardContent className="flex flex-col items-center gap-4 py-10">
          <span className="text-5xl">🔐</span>
          <h1 className="text-2xl font-black">로그인이 필요해요</h1>
          <p className="text-sm">링크를 추가·수정·삭제하려면 로그인해주세요. 공개 페이지 조회는 누구나 가능해요.</p>
          <Button onClick={signIn} size="lg">
            <LogIn /> {storeMode === "firebase" ? "Google로 로그인" : "데모 로그인"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  const uid = user.uid;

  const handleAdd = async (input: LinkInput) => {
    await store.addLink(uid, input); // Create
    await refresh();
  };
  const handleUpdate = async (id: string, input: LinkInput) => {
    await store.updateLink(uid, id, input); // Update
    await refresh();
  };
  const handleDelete = async (id: string) => {
    await store.deleteLink(uid, id); // Delete
    await refresh();
  };
  const handleProfile = async (p: Profile) => {
    await store.saveProfile(uid, p);
    setProfile(p);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-muted">마이페이지</p>
          <h1 className="text-3xl font-black">내 링크 관리</h1>
        </div>
        <Button variant="outline" size="sm" onClick={refresh}>
          <RefreshCw /> 새로고침
        </Button>
      </div>

      {error && (
        <p role="alert" className="rounded-xl border-[3px] border-danger bg-red-50 px-4 py-3 font-bold text-danger">
          {error}
        </p>
      )}

      <ProfileEditor profile={profile} onSave={handleProfile} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <AddLinkForm onAdd={handleAdd} />
        <ManageLinkList links={links} loading={linksLoading} onUpdate={handleUpdate} onDelete={handleDelete} />
      </div>

      <StatsSection links={links} />
    </div>
  );
}
