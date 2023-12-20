"use client";

import { cn } from "@/lib/utils";
import { FileTextIcon, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink() {
  const pathname = usePathname();
  const links = [
    { href: "/dashboard", text: "dashboard", Icon: FileTextIcon },
    { href: "/dashboard/user", text: "user", Icon: User },
  ];

  return (
    <div className="flex items-center gap-5 border-b pb-2">
      {links.map((link, index) => {
        return (
          <Link
            key={index}
            href={link.href}
            className={cn(
              "transitransition-all flex items-center gap-1 hover:underline",
              { "text-green-500 underline": pathname === link.href },
            )}
          >
            <link.Icon />
            {link.text}
          </Link>
        );
      })}
    </div>
  );
}
