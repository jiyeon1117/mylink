"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { AppUser, DataStore } from "@/lib/types";
import { getStore } from "@/lib/store";

type AuthState = {
  user: AppUser | null;
  loading: boolean;
  store: DataStore | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState>({
  user: null,
  loading: true,
  store: null,
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState<DataStore | null>(null);
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub = () => {};
    let alive = true;
    getStore().then((s) => {
      if (!alive) return;
      setStore(s);
      unsub = s.subscribeAuth((u) => {
        setUser(u);
        setLoading(false);
      });
    });
    return () => {
      alive = false;
      unsub();
    };
  }, []);

  const signIn = useCallback(async () => {
    try {
      await store?.signIn();
    } catch (e) {
      console.error("로그인 실패", e);
      alert("로그인에 실패했어요. 잠시 후 다시 시도해주세요.");
    }
  }, [store]);

  const signOut = useCallback(async () => {
    await store?.signOut();
  }, [store]);

  return <AuthContext.Provider value={{ user, loading, store, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
