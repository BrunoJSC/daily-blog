"use client";

import { GithubIcon } from "lucide-react";
import { Button } from "../ui/button";
import { createBrowserClient } from "@supabase/ssr";
import { usePathname } from "next/navigation";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const handleLogin = () => {
  supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: location.origin + "/auth/callback",
    },
  });
};

export function LoginForm() {
  const pathname = usePathname();

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={handleLogin}
    >
      <GithubIcon />
      Login
    </Button>
  );
}
