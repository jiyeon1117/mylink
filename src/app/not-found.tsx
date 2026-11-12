"use client";

import { useEffect, useState } from "react";
import { NotFoundView, PublicProfile } from "@/components/public-profile";
import { BASE_PATH } from "@/lib/utils";

// GitHub Pages는 없는 주소를 404.html로 보여줍니다.
// 주소가 /mylink/{username} 형태면 개인 페이지를, 아니면 404 화면을 보여줘요.
export default function NotFound() {
  const [username, setUsername] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    let path = window.location.pathname;
    if (BASE_PATH && path.startsWith(BASE_PATH)) path = path.slice(BASE_PATH.length);
    const parts = path.split("/").filter(Boolean);
    setUsername(parts.length === 1 && /^[a-z0-9._-]{3,20}$/i.test(parts[0]) ? decodeURIComponent(parts[0]) : null);
  }, []);

  if (username === undefined) return null;
  if (username === null) return <NotFoundView />;
  return <PublicProfile username={username} />;
}
