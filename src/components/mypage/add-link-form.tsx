"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { isValidUrl, normalizeUrl } from "@/lib/utils";
import type { LinkInput } from "@/lib/types";

/**
 * 7주차: 링크 추가 폼 (제목 입력 칸, 주소 입력 칸, 추가 버튼)
 * 동작 순서: 1. 제목/주소 가져오기 → 2. 검증 → 3. 목록에 추가 → 입력 칸 비우기
 */
export function AddLinkForm({ onAdd }: { onAdd: (input: LinkInput) => Promise<void> }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState<{ field: "title" | "url"; message: string } | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const t = title.trim();
    const raw = url.trim();

    // 검증: 빈 칸 체크 → 주소 형식 체크
    if (!t) return setError({ field: "title", message: "제목을 입력해주세요" });
    if (!raw) return setError({ field: "url", message: "주소를 입력해주세요" });
    const normalized = normalizeUrl(raw);
    if (!isValidUrl(normalized) || !normalized.includes(".")) {
      return setError({ field: "url", message: "올바른 주소를 입력해주세요" });
    }

    setError(null);
    setSaving(true);
    try {
      await onAdd({ title: t, url: normalized });
      setTitle(""); // 입력 칸 자동으로 비우기
      setUrl("");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>링크 추가</CardTitle>
        <CardDescription>제목과 주소를 입력하고 추가 버튼을 눌러주세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="link-title">제목</Label>
            <Input
              id="link-title"
              placeholder="예: 인스타그램"
              value={title}
              maxLength={40}
              onChange={(e) => setTitle(e.target.value)}
              aria-invalid={error?.field === "title"}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="link-url">주소</Label>
            <Input
              id="link-url"
              placeholder="예: https://instagram.com/my_id"
              inputMode="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              aria-invalid={error?.field === "url"}
            />
          </div>
          {error && (
            <p role="alert" className="rounded-lg border-2 border-danger bg-red-50 px-3 py-2 text-sm font-bold text-danger">
              {error.message}
            </p>
          )}
          <Button type="submit" disabled={saving} className="w-full">
            <Plus /> {saving ? "추가하는 중…" : "추가"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
