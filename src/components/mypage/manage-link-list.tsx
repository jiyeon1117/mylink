"use client";

import { useState } from "react";
import { Check, ExternalLink, Pencil, Trash2, X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { isValidUrl, normalizeUrl } from "@/lib/utils";
import type { LinkInput, LinkItem } from "@/lib/types";

type Props = {
  links: LinkItem[];
  loading: boolean;
  onUpdate: (id: string, input: LinkInput) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

/** 10주차: 링크 목록 + 인라인 편집(Update) + 삭제 확인 모달(Delete) */
export function ManageLinkList({ links, loading, onUpdate, onDelete }: Props) {
  const [deleting, setDeleting] = useState<LinkItem | null>(null);
  const [busy, setBusy] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>내 링크 목록</CardTitle>
        <CardDescription>
          {links.length}개의 링크 · 연필 버튼으로 수정, 휴지통 버튼으로 삭제해요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex flex-col gap-3">
            {[0, 1].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded-xl border-[3px] border-border/20 bg-black/5" />
            ))}
          </div>
        ) : links.length === 0 ? (
          <p className="rounded-xl border-[3px] border-dashed border-border p-6 text-center text-sm font-bold text-muted">
            아직 링크가 없어요. 위 폼에서 첫 링크를 추가해보세요!
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <LinkRow key={link.id} link={link} onUpdate={onUpdate} onAskDelete={() => setDeleting(link)} />
            ))}
          </ul>
        )}
      </CardContent>

      <Dialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <DialogContent>
          <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-3">
              <p>
                <strong>&quot;{deleting?.title}&quot;</strong> 링크가 삭제됩니다
              </p>
              <p className="flex items-center gap-2 rounded-lg border-2 border-danger bg-red-50 px-3 py-2 font-bold text-danger">
                <AlertTriangle className="size-4 shrink-0" /> 이 작업은 되돌릴 수 없습니다
              </p>
            </div>
          </DialogDescription>
          <div className="mt-6 flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant="outline">취소</Button>
            </DialogClose>
            <Button
              variant="destructive"
              disabled={busy}
              onClick={async () => {
                if (!deleting) return;
                setBusy(true);
                try {
                  await onDelete(deleting.id);
                  setDeleting(null);
                } finally {
                  setBusy(false);
                }
              }}
            >
              {busy ? "삭제하는 중…" : "삭제하기"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

function LinkRow({
  link,
  onUpdate,
  onAskDelete,
}: {
  link: LinkItem;
  onUpdate: Props["onUpdate"];
  onAskDelete: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(link.title);
  const [url, setUrl] = useState(link.url);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function startEdit() {
    setTitle(link.title); // 기존 값을 입력 칸에 미리 채우기
    setUrl(link.url);
    setError("");
    setEditing(true);
  }

  function cancel() {
    setTitle(link.title); // 취소 시 원래 값으로 복구
    setUrl(link.url);
    setError("");
    setEditing(false);
  }

  async function save() {
    const t = title.trim();
    const u = normalizeUrl(url);
    if (!t) return setError("제목을 입력해주세요");
    if (!u) return setError("주소를 입력해주세요");
    if (!isValidUrl(u) || !u.includes(".")) return setError("올바른 주소를 입력해주세요");
    setSaving(true);
    try {
      await onUpdate(link.id, { title: t, url: u });
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  if (editing) {
    return (
      <li className="flex flex-col gap-2 rounded-xl border-[3px] border-border bg-background p-3">
        <Input aria-label="제목" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={40} />
        <Input aria-label="주소" value={url} onChange={(e) => setUrl(e.target.value)} inputMode="url" />
        {error && (
          <p role="alert" className="text-sm font-bold text-danger">
            {error}
          </p>
        )}
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="outline" onClick={cancel}>
            <X /> 취소
          </Button>
          <Button size="sm" onClick={save} disabled={saving}>
            <Check /> {saving ? "저장 중…" : "저장"}
          </Button>
        </div>
      </li>
    );
  }

  return (
    <li className="flex items-center gap-3 rounded-xl border-[3px] border-border bg-surface p-3">
      <div className="min-w-0 flex-1">
        <p className="truncate font-extrabold">{link.title}</p>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 truncate text-sm text-muted underline-offset-2 hover:underline"
        >
          <span className="truncate">{link.url}</span>
          <ExternalLink className="size-3 shrink-0" />
        </a>
      </div>
      <Button size="icon" variant="outline" aria-label={`${link.title} 수정`} onClick={startEdit}>
        <Pencil />
      </Button>
      <Button size="icon" variant="pink" aria-label={`${link.title} 삭제`} onClick={onAskDelete}>
        <Trash2 />
      </Button>
    </li>
  );
}
