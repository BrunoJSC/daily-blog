"use client";

import { useUser } from "@/lib/store/user";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect } from "react";

export function SessisonProvider() {
  const setUser = useUser((state) => state.setUser);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const readUserSession = async () => {
    const { data } = await supabase.auth.getSession();
    setUser(data.session?.user);
  };
  useEffect(() => {
    readUserSession();

    // eslint-disable-next-line
  }, []);

  return <></>;
}
