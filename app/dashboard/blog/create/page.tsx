"use client";

import { useRouter } from "next/navigation";
import { BlogForm } from "../components/BlogForm";
import { toast } from "@/components/ui/use-toast";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { BlogFormSchemaType } from "../schema";
import { defaultCreateBlog } from "@/lib/data";
import { createBlog } from "@/lib/actions/blog";

export default function CreateForm() {
  const router = useRouter();
  const onHandleSubmit = async (data: BlogFormSchemaType) => {
    const result = JSON.parse(await createBlog(data));

    const { error } = result as PostgrestSingleResponse<null>;
    if (error?.message) {
      toast({
        title: "Fail to create a post 😢",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        ),
      });
    } else {
      toast({
        title: "Successfully create a post 🎉",
        description: data.title,
      });
      router.push("/dashboard");
    }
  };
  return (
    <>
      <BlogForm
        onHandleSubmit={onHandleSubmit}
        defaultBlog={defaultCreateBlog}
      />
    </>
  );
}
