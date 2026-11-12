"use client";

import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import type { DataStore, LinkItem, Profile } from "./types";
import { usernameFromEmail } from "./types";
import { firebaseConfig } from "./firebase-config";

/**
 * Firebase 저장소 (9~13주차)
 * - Firestore 경로: users/{uid}/links/{linkId}, users/{uid}/profile/main
 * - username 중복 체크용: usernames/{username} → { uid }
 */

const app = getApps()[0] ?? initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const linksCol = (uid: string) => collection(db, "users", uid, "links");
const profileDoc = (uid: string) => doc(db, "users", uid, "profile", "main");
const usernameDoc = (name: string) => doc(db, "usernames", name);

export const firebaseStore: DataStore = {
  mode: "firebase",

  subscribeAuth(cb) {
    // 11주차: onAuthStateChanged로 로그인 상태 감지
    return onAuthStateChanged(auth, (u) =>
      cb(u ? { uid: u.uid, displayName: u.displayName ?? "사용자", email: u.email ?? "", photoURL: u.photoURL } : null),
    );
  },

  async signIn() {
    await signInWithPopup(auth, new GoogleAuthProvider());
  },

  async signOut() {
    await signOut(auth);
  },

  async ensureProfile(user) {
    const snap = await getDoc(profileDoc(user.uid));
    if (snap.exists()) return snap.data() as Profile;
    // 12주차: username은 이메일 앞부분, displayName은 구글 이름으로 자동 생성
    const base = usernameFromEmail(user.email);
    for (let i = 0; i < 20; i++) {
      const username = i === 0 ? base : `${base}${i}`;
      const profile: Profile = { username, displayName: user.displayName, bio: "" };
      try {
        await runTransaction(db, async (tx) => {
          const taken = await tx.get(usernameDoc(username));
          if (taken.exists() && taken.data().uid !== user.uid) throw new Error("taken");
          tx.set(usernameDoc(username), { uid: user.uid });
          tx.set(profileDoc(user.uid), profile);
        });
        return profile;
      } catch (e) {
        if ((e as Error).message !== "taken") throw e;
      }
    }
    throw new Error("username을 자동으로 만들지 못했어요.");
  },

  async getProfile(uid) {
    const snap = await getDoc(profileDoc(uid));
    return snap.exists() ? (snap.data() as Profile) : null;
  },

  async saveProfile(uid, profile) {
    // 12주차: 저장 전에 username 중복 체크
    await runTransaction(db, async (tx) => {
      const current = await tx.get(profileDoc(uid));
      const taken = await tx.get(usernameDoc(profile.username));
      if (taken.exists() && taken.data().uid !== uid) {
        throw new Error("이미 사용 중인 username이에요. 다른 이름을 입력해주세요.");
      }
      const old = current.exists() ? (current.data() as Profile).username : null;
      if (old && old !== profile.username) tx.delete(usernameDoc(old));
      tx.set(usernameDoc(profile.username), { uid });
      tx.set(profileDoc(uid), profile);
    });
  },

  async getUidByUsername(username) {
    const snap = await getDoc(usernameDoc(username.toLowerCase()));
    return snap.exists() ? (snap.data().uid as string) : null;
  },

  async getLinks(uid) {
    const snap = await getDocs(query(linksCol(uid), orderBy("createdAt", "asc")));
    return snap.docs.map((d) => {
      const data = d.data();
      const created = data.createdAt instanceof Timestamp ? data.createdAt.toMillis() : Date.now();
      return {
        id: d.id,
        title: data.title ?? "",
        url: data.url ?? "",
        clickCount: data.clickCount ?? 0,
        createdAt: created,
      } satisfies LinkItem;
    });
  },

  async addLink(uid, input) {
    // 9주차 Create: addDoc
    await addDoc(linksCol(uid), { ...input, clickCount: 0, createdAt: serverTimestamp() });
  },

  async updateLink(uid, id, input) {
    // 10주차 Update: updateDoc
    await updateDoc(doc(linksCol(uid), id), { ...input });
  },

  async deleteLink(uid, id) {
    // 10주차 Delete: deleteDoc
    await deleteDoc(doc(linksCol(uid), id));
  },

  async incrementClick(uid, id) {
    // 13주차: increment()로 서버에서 +1 → 동시 클릭에도 손실 없음
    await updateDoc(doc(linksCol(uid), id), { clickCount: increment(1) });
  },
};

