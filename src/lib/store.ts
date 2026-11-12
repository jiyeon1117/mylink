"use client";

import type { DataStore } from "./types";
import { isFirebaseConfigured } from "./firebase-config";

let storePromise: Promise<DataStore> | null = null;

/** Firebase 설정이 있으면 Firestore, 없으면 데모(localStorage) 저장소를 사용 */
export function getStore(): Promise<DataStore> {
  if (!storePromise) {
    storePromise = isFirebaseConfigured
      ? import("./firebase-store").then((m) => m.firebaseStore)
      : import("./demo-store").then((m) => m.demoStore);
  }
  return storePromise;
}

export const storeMode: DataStore["mode"] = isFirebaseConfigured ? "firebase" : "demo";
