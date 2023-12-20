import { Button } from "@/components/ui/button";
import { EyeIcon, PencilIcon } from "lucide-react";
import SwitchForm from "./SwitchForm";
import Link from "next/link";
import DeleteAlert from "./DeleteAlert";
import { IBlog } from "@/lib/types";
import { readBlogAdmin, updateBlogById } from "@/lib/actions/blog";

export async function BlogTable() {
  const { data: blogs } = await readBlogAdmin();

  return (
    <>
      <div className="bg-graident-dark overflow-y-scroll rounded-md border-[0.5px] ">
        <div className="w-[800px] md:w-full">
          <div className="grid grid-cols-5 border-b p-5 dark:text-gray-500">
            <h1 className=" col-span-2">Title</h1>
            <h1>Premium</h1>
            <h1>Publish</h1>
          </div>
          <div className="space-y-10 p-5">
            {blogs?.map((blog, index) => {
              const updatePremium = updateBlogById.bind(null, blog.id, {
                is_premium: !blog.is_premium,
              } as IBlog);

              const updatePulished = updateBlogById.bind(null, blog.id, {
                is_published: !blog.is_published,
              } as IBlog);

              return (
                <div className="grid grid-cols-5" key={index}>
                  <h1 className="font-lg col-span-2 font-medium dark:text-gray-200">
                    {blog.title}
                  </h1>
                  <SwitchForm
                    checked={blog.is_premium}
                    onSubmit={updatePremium}
                    name="premium"
                  />

                  <SwitchForm
                    checked={blog.is_published}
                    onSubmit={updatePulished}
                    name="publish"
                  />

                  <Actions id={blog.id} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

const Actions = ({ id }: { id: string }) => {
  return (
    <div className="flex items-center gap-2 md:flex-wrap">
      <Link href={`/blog/${id}`}>
        <Button className="flex items-center gap-2" variant="outline">
          <EyeIcon />
          View
        </Button>
      </Link>
      <DeleteAlert id={id} />

      <Link href={`/dashboard/blog/edit/${id}`}>
        <Button className="flex items-center gap-2" variant="outline">
          <PencilIcon />
          Edit
        </Button>
      </Link>
    </div>
  );
};
