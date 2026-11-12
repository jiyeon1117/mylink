import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "마이링크 MyLink",
  description: "바이브 코딩으로 만든 링크트리 클론 — 나의 모든 링크를 한 페이지에",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fff3b0",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="bg-dots min-h-dvh antialiased">
        <AuthProvider>
          <SiteHeader />
          <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">{children}</main>
          <footer className="mx-auto max-w-5xl px-4 pb-10 text-center text-xs font-bold text-muted">
            © 2026 jiyeon1117 · 아이디어를 현실로 - 바이브 코딩 · 마이링크 프로젝트
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
