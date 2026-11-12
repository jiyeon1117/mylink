import type { NextConfig } from "next";

// GitHub Pages(https://jiyeon1117.github.io/mylink/)에 정적 파일로 배포하기 위한 설정
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/mylink";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
