import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 7주차 입력 검증: 올바른 주소인지 확인 (http/https) */
export function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/** 주소 앞에 http(s)가 없으면 https:// 를 붙여 준다 */
export function normalizeUrl(value: string) {
  const v = value.trim();
  if (!v) return v;
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/mylink";
