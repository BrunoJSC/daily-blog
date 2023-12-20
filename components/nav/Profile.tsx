import { useUser } from "@/lib/store/user";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { Button } from "../ui/button";
import { LayoutDashboardIcon, LucideUnlock } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";
import { LockOpen1Icon } from "@radix-ui/react-icons";
import ManageBill from "../stripe/ManageBill";

export function Profile() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };
  const isAdmin = user?.role === "admin";
  const isSub = user?.stripe_customer_id;

  return (
    <Popover>
      <PopoverTrigger>
        <Image
          src={user?.image_url!}
          alt={user?.display_name!}
          width={50}
          height={50}
          className="rounded-full ring-2 ring-green-500"
        />
      </PopoverTrigger>
      <PopoverContent className="space-y-3 divide-y p-2" side="bottom">
        <div className="px-4">
          <p className="text-sm">{user?.display_name}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
        {!isAdmin && isSub && (
          <ManageBill customerId={user?.stripe_customer_id!} />
        )}

        {isAdmin && (
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="flex w-full items-center justify-between"
            >
              Dashboard <LayoutDashboardIcon />
            </Button>
          </Link>
        )}

        <Button
          variant="ghost"
          className="flex w-full items-center justify-between"
          onClick={handleLogout}
        >
          Log out <LockOpen1Icon />
        </Button>
      </PopoverContent>
    </Popover>
  );
}
