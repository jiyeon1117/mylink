"use client";

import type { AppUser, DataStore, LinkItem, Profile } from "./types";
import { usernameFromEmail } from "./types";

/**
 * 데모 저장소 — Firebase 설정값이 없을 때 사용.
 * Firestore와 같은 구조(users/{uid}/profile, users/{uid}/links)를
 * 브라우저 localStorage에 흉내 내어 저장합니다.
 */

type DB = {
  users: Record<string, { profile: Profile | null; links: LinkItem[] }>;
  usernames: Record<string, string>; // username → uid
};

const DB_KEY = "mylink:demo-db:v1";
const AUTH_KEY = "mylink:demo-auth:v1";

export const DEMO_OWNER_UID = "demo-jiyeon1117";

const DEMO_USER: AppUser = {
  uid: DEMO_OWNER_UID,
  displayName: "지연",
  email: "jiyeon1117@demo.mylink",
  photoURL: null,
};

function seed(): DB {
  const now = Date.now();
  return {
    users: {
      [DEMO_OWNER_UID]: {
        profile: {
          username: "jiyeon1117",
          displayName: "지연",
          bio: "",
        },
        links: [
          { id: "l1", title: "GitHub", url: "https://github.com/jiyeon1117", clickCount: 12, createdAt: now - 4000 },
          { id: "l2", title: "인스타그램", url: "https://www.instagram.com/", clickCount: 7, createdAt: now - 3000 },
          { id: "l3", title: "유튜브", url: "https://www.youtube.com/", clickCount: 5, createdAt: now - 2000 },
          { id: "l4", title: "블로그", url: "https://blog.naver.com/", clickCount: 3, createdAt: now - 1000 },
        ],
      },
    },
    usernames: { jiyeon1117: DEMO_OWNER_UID },
  };
}

function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function safeSet(key: string, value: string | null) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    /* 저장 불가 환경(시크릿 모드 등) — 메모리에만 유지 */
  }
}

let memoryDb: DB | null = null;

function load(): DB {
  const raw = safeGet(DB_KEY);
  if (raw) {
    try {
      memoryDb = JSON.parse(raw) as DB;
      return memoryDb;
    } catch {
      /* 손상된 데이터면 새로 시드 */
    }
  }
  if (!memoryDb) memoryDb = seed();
  safeSet(DB_KEY, JSON.stringify(memoryDb));
  return memoryDb;
}

function save(db: DB) {
  memoryDb = db;
  safeSet(DB_KEY, JSON.stringify(db));
}

const listeners = new Set<(u: AppUser | null) => void>();
let memoryAuth: string | null = null;

function currentUser(): AppUser | null {
  const uid = safeGet(AUTH_KEY) ?? memoryAuth;
  return uid === DEMO_OWNER_UID ? DEMO_USER : null;
}

function emit() {
  const u = currentUser();
  listeners.forEach((cb) => cb(u));
}

const wait = () => new Promise((r) => setTimeout(r, 120)); // 네트워크 느낌의 짧은 지연

function userBucket(db: DB, uid: string) {
  if (!db.users[uid]) db.users[uid] = { profile: null, links: [] };
  return db.users[uid];
}

export const demoStore: DataStore = {
  mode: "demo",

  subscribeAuth(cb) {
    listeners.add(cb);
    cb(currentUser());
    const onStorage = (e: StorageEvent) => {
      if (e.key === AUTH_KEY) cb(currentUser());
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(cb);
      window.removeEventListener("storage", onStorage);
    };
  },

  async signIn() {
    await wait();
    memoryAuth = DEMO_OWNER_UID;
    safeSet(AUTH_KEY, DEMO_OWNER_UID);
    emit();
  },

  async signOut() {
    memoryAuth = null;
    safeSet(AUTH_KEY, null);
    emit();
  },

  async ensureProfile(user) {
    const db = load();
    const bucket = userBucket(db, user.uid);
    if (!bucket.profile) {
      let username = usernameFromEmail(user.email);
      let n = 1;
      while (db.usernames[username] && db.usernames[username] !== user.uid) username = `${username}${n++}`;
      bucket.profile = { username, displayName: user.displayName, bio: "" };
      db.usernames[username] = user.uid;
      save(db);
    }
    return bucket.profile;
  },

  async getProfile(uid) {
    await wait();
    return load().users[uid]?.profile ?? null;
  },

  async saveProfile(uid, profile) {
    await wait();
    const db = load();
    const owner = db.usernames[profile.username];
    if (owner && owner !== uid) throw new Error("이미 사용 중인 username이에요. 다른 이름을 입력해주세요.");
    const bucket = userBucket(db, uid);
    const old = bucket.profile?.username;
    if (old && old !== profile.username) delete db.usernames[old];
    db.usernames[profile.username] = uid;
    bucket.profile = profile;
    save(db);
  },

  async getUidByUsername(username) {
    await wait();
    return load().usernames[username.toLowerCase()] ?? null;
  },

  async getLinks(uid) {
    await wait();
    return [...(load().users[uid]?.links ?? [])].sort((a, b) => a.createdAt - b.createdAt);
  },

  async addLink(uid, input) {
    await wait();
    const db = load();
    userBucket(db, uid).links.push({
      id: Math.random().toString(36).slice(2, 10),
      title: input.title,
      url: input.url,
      clickCount: 0,
      createdAt: Date.now(),
    });
    save(db);
  },

  async updateLink(uid, id, input) {
    await wait();
    const db = load();
    const link = userBucket(db, uid).links.find((l) => l.id === id);
    if (!link) throw new Error("링크를 찾을 수 없어요.");
    link.title = input.title;
    link.url = input.url;
    save(db);
  },

  async deleteLink(uid, id) {
    await wait();
    const db = load();
    const bucket = userBucket(db, uid);
    bucket.links = bucket.links.filter((l) => l.id !== id);
    save(db);
  },

  async incrementClick(uid, id) {
    const db = load();
    const link = db.users[uid]?.links.find((l) => l.id === id);
    if (!link) throw new Error("링크를 찾을 수 없어요.");
    link.clickCount += 1;
    save(db);
  },
};
