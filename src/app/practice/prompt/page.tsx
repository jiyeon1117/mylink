import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "4주차 프롬프트 비교 · 마이링크" };

const badPrompt = `프로필 페이지 예쁘게 해줘.
이미지도 추가하고 반응형으로.`;

const goodPrompt = `page.tsx의 프로필 섹션을 네오브루탈리즘 스타일로 스타일링해줘.
- 배경색: 밝은 노란색 (#FFF3B0)
- 카드: 굵은 검은 테두리 3px + 굵은 그림자 (4px 4px 0 #111)
- 둥근 모서리 16px, 프로필 이미지는 원형 96px
- 반응형: 모바일 360px 1열 / 태블릿 768px 2열 / 데스크탑 1024px 최대 너비 960px`;

export default function PromptPractice() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-bold text-muted">4주차 실습</p>
        <h1 className="text-3xl font-black">나쁜 프롬프트 vs 좋은 프롬프트</h1>
        <p className="mt-2 text-sm">같은 프로필 카드를 두 프롬프트로 만들어 비교했어요. 브라우저 창 크기를 바꿔보며 확인해보세요.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 실습 1: 나쁜 프롬프트 결과 */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-black">실습 1 · 나쁜 프롬프트</h2>
          <pre className="whitespace-pre-wrap rounded-xl border-[3px] border-border bg-surface p-4 text-sm">{badPrompt}</pre>
          <div className="overflow-hidden border border-gray-300 bg-white p-4" style={{ fontFamily: "serif" }}>
            <div className="flex items-center gap-3">
              <div className="h-16 w-28 shrink-0 bg-gray-300 text-center text-xs leading-[64px] text-gray-500">이미지</div>
              <div className="min-w-0">
                <p className="text-lg" style={{ color: "#e11d48" }}>
                  지연
                </p>
                <p className="text-xs text-gray-500">안녕하세요 반갑습니다 제 프로필입니다</p>
              </div>
            </div>
            <p className="mt-3 text-center" style={{ background: "linear-gradient(90deg,#f0f,#0ff)", color: "#fff" }}>
              ✨ 예쁜 프로필 ✨
            </p>
          </div>
          <ul className="list-disc pl-5 text-sm">
            <li>
              <strong>&ldquo;예쁘게&rdquo;</strong> — 기준이 없어서 색·글꼴이 제각각
            </li>
            <li>
              <strong>&ldquo;이미지도&rdquo;</strong> — 크기·위치가 없어 찌그러진 사각형
            </li>
            <li>
              <strong>&ldquo;반응형&rdquo;</strong> — breakpoint가 없어 화면별 배치가 그대로
            </li>
          </ul>
        </section>

        {/* 실습 2: 좋은 프롬프트 결과 */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-black">실습 2 · 좋은 프롬프트</h2>
          <pre className="whitespace-pre-wrap rounded-xl border-[3px] border-border bg-surface p-4 text-sm">{goodPrompt}</pre>
          <div className="rounded-2xl border-[3px] border-border bg-background p-4">
            <Card>
              <CardContent className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
                <div className="grid size-24 shrink-0 place-items-center rounded-full border-[3px] border-border bg-sky text-4xl shadow-brutal">
                  👩‍💻
                </div>
                <div>
                  <p className="text-xl font-black">지연</p>
                  <p className="text-sm font-bold text-primary">@jiyeon1117</p>
                  <p className="mt-1 text-sm">바이브 코딩으로 만든 나만의 링크 모음</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <ul className="list-disc pl-5 text-sm">
            <li>
              <strong>구체적</strong> — 색상 코드, 테두리 3px, 그림자 값 명시
            </li>
            <li>
              <strong>결과물</strong> — 원형 96px 이미지, 둥근 모서리 16px
            </li>
            <li>
              <strong>제약조건</strong> — 360 / 768 / 1024px breakpoint를 한 번에 지정
            </li>
          </ul>
        </section>
      </div>

      {/* 실습 3: 반응형 비교 */}
      <Card>
        <CardHeader>
          <CardTitle>실습 3 · 반응형 비교</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-[3px] border-border">
                <th className="py-2 pr-3">화면</th>
                <th className="py-2 pr-3">나쁜 프롬프트</th>
                <th className="py-2">좋은 프롬프트</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["모바일 (360)", "이미지와 글이 좁게 붙어 답답함", "세로 1열로 깔끔하게 들어감"],
                ["태블릿 (768)", "배치 변화 없음", "이미지 옆에 글이 오는 2단"],
                ["데스크탑 (1024)", "기준 없이 늘어남", "최대 너비 안에서 정돈됨"],
              ].map(([screen, bad, good]) => (
                <tr key={screen} className="border-b-2 border-border/20">
                  <td className="py-2 pr-3 font-bold">{screen}</td>
                  <td className="py-2 pr-3">{bad}</td>
                  <td className="py-2 font-bold text-emerald-700">✓ {good}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 rounded-xl border-[3px] border-border bg-mint p-3 text-sm font-bold">
            결론: &ldquo;예쁘게&rdquo; 대신 &ldquo;그림자, 둥근 모서리 16px&rdquo;처럼 구체적으로 요청하면 결과가 한 번에 좋아져요.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
