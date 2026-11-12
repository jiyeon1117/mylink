"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Save, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { USERNAME_RULE, type Profile } from "@/lib/types";

/** 12주차: 프로필 수정 (username / displayName / bio) + username 중복 체크 */
export function ProfileEditor({
  profile,
  onSave,
}: {
  profile: Profile | null;
  onSave: (p: Profile) => Promise<void>;
}) {
  const [form, setForm] = useState<Profile>({ username: "", displayName: "", bio: "" });
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) setForm(profile);
  }, [profile]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setNotice("");
    const next: Profile = {
      username: form.username.trim().toLowerCase(),
      displayName: form.displayName.trim(),
      bio: form.bio.trim(),
    };
    if (!USERNAME_RULE.test(next.username)) {
      return setError("username은 영문 소문자·숫자·._- 로 3~20자여야 해요.");
    }
    if (!next.displayName) return setError("표시 이름을 입력해주세요");
    setError("");
    setSaving(true);
    try {
      await onSave(next);
      setNotice("프로필이 저장됐어요!");
    } catch (err) {
      setError((err as Error).message || "저장에 실패했어요.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserRound className="size-5" /> 프로필 수정
        </CardTitle>
        <CardDescription>
          공유 주소:{" "}
          {profile ? (
            <Link href={`/${profile.username}/`} className="font-bold text-primary underline underline-offset-2">
              /{profile.username}
            </Link>
          ) : (
            "…"
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2" noValidate>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="p-username">username (공유 URL)</Label>
            <Input
              id="p-username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              autoCapitalize="none"
              spellCheck={false}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="p-name">displayName (표시 이름)</Label>
            <Input
              id="p-name"
              value={form.displayName}
              maxLength={30}
              onChange={(e) => setForm({ ...form, displayName: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label htmlFor="p-bio">bio (소개글)</Label>
            <Textarea
              id="p-bio"
              value={form.bio}
              maxLength={120}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder="나를 한 줄로 소개해보세요"
            />
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-h-5 text-sm font-bold" aria-live="polite">
              {error && <span className="text-danger">{error}</span>}
              {notice && <span className="text-emerald-700">{notice}</span>}
            </div>
            <Button type="submit" disabled={saving || !profile}>
              <Save /> {saving ? "저장 중…" : "프로필 저장"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
