"use client";

import Link from "next/link";
import { LoginForm } from "./LoginForm";
import { useUser } from "@/lib/store/user";
import { Profile } from "./Profile";

export function Navbar() {
  const user = useUser((state) => state.user);

  console.log(user);

  return (
    <nav className="flex items-center justify-between">
      <div className="group">
        <Link className="text-2xl font-bold" href="/">
          DailyBlog
        </Link>
        <div className="h-1 w-0 bg-green-500 transition-all group-hover:w-full"></div>
      </div>

      {user?.id ? <Profile /> : <LoginForm />}
    </nav>
  );
}
