export type LinkItem = {
  id: string;
  title: string;
  url: string;
  clickCount: number;
  createdAt: number;
};

export type Profile = {
  username: string; // 공유 URL용 (/username)
  displayName: string; // 표시 이름
  bio: string; // 소개글
};

export type AppUser = {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string | null;
};

export type LinkInput = { title: string; url: string };

/** 데이터 저장소 공통 인터페이스 — Firebase / 데모(localStorage) 두 가지 구현 */
export interface DataStore {
  mode: "firebase" | "demo";
  subscribeAuth(cb: (user: AppUser | null) => void): () => void;
  signIn(): Promise<void>;
  signOut(): Promise<void>;
  ensureProfile(user: AppUser): Promise<Profile>;
  getProfile(uid: string): Promise<Profile | null>;
  saveProfile(uid: string, profile: Profile): Promise<void>;
  getUidByUsername(username: string): Promise<string | null>;
  getLinks(uid: string): Promise<LinkItem[]>;
  addLink(uid: string, input: LinkInput): Promise<void>;
  updateLink(uid: string, id: string, input: LinkInput): Promise<void>;
  deleteLink(uid: string, id: string): Promise<void>;
  incrementClick(uid: string, id: string): Promise<void>;
}

export const USERNAME_RULE = /^[a-z0-9._-]{3,20}$/;

export function usernameFromEmail(email: string) {
  const base = (email.split("@")[0] || "user").toLowerCase().replace(/[^a-z0-9._-]/g, "");
  return (base.length >= 3 ? base : `${base}user`).slice(0, 20);
}
