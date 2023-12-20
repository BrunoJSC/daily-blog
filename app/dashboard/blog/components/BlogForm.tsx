"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState, useTransition } from "react";
import {
  EyeIcon,
  PencilIcon,
  RocketIcon,
  SaveIcon,
  StarIcon,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { BlogFormSchema, BlogFormSchemaType } from "../schema";
import { IBlogDetial } from "@/lib/types";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";

export function BlogForm({
  onHandleSubmit,
  defaultBlog,
}: {
  defaultBlog: IBlogDetial;
  onHandleSubmit: (data: BlogFormSchemaType) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [isPreview, setPreivew] = useState(false);

  const form = useForm<z.infer<typeof BlogFormSchema>>({
    mode: "all",
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      title: defaultBlog?.title,
      content: defaultBlog?.blog_content.content,
      image_url: defaultBlog?.image_url,
      is_premium: defaultBlog?.is_premium,
      is_published: defaultBlog?.is_published,
    },
  });

  const onSubmit = (data: z.infer<typeof BlogFormSchema>) => {
    startTransition(() => {
      onHandleSubmit(data);
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full rounded-md border pb-5"
      >
        <div className="flex flex-wrap items-center gap-2 border-b p-5 sm:flex-row sm:justify-between">
          <div className="flex flex-wrap items-center gap-5">
            <span
              onClick={() => {
                setPreivew(
                  !isPreview && !form.getFieldState("image_url").invalid,
                );
              }}
              role="button"
              tabIndex={0}
              className="flex items-center gap-2 rounded-md border bg-zinc-800 px-3 py-2 text-sm transition-all hover:border-zinc-400"
            >
              {!isPreview ? (
                <>
                  <EyeIcon />
                  Preivew
                </>
              ) : (
                <>
                  <PencilIcon />
                  Edit
                </>
              )}
            </span>
            <FormField
              control={form.control}
              name="is_premium"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-1 rounded-md border bg-zinc-800 p-2">
                      <StarIcon />
                      <span className="text-sm">Premium</span>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_published"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-1 rounded-md border bg-zinc-800 p-2">
                      <RocketIcon />

                      <span className="text-sm">Publish</span>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <button
            type="submit"
            role="button"
            className={cn(
              "group flex items-center gap-2 rounded-md border border-green-500 bg-zinc-800 px-3  py-2 text-sm transition-all disabled:border-gray-800 disabled:bg-gray-900",
              { "animate-spin": isPending },
            )}
            disabled={!form.formState.isValid}
          >
            <SaveIcon className=" animate-bounce group-disabled:animate-none" />
            Save
          </button>
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <>
                  <div
                    className={cn(
                      "flex w-full gap-2 break-words p-2",
                      isPreview ? "divide-x-0" : "divide-x",
                    )}
                  >
                    <Input
                      placeholder="Blog title"
                      {...field}
                      autoFocus
                      className={cn(
                        "border-none text-lg font-medium leading-relaxed ring-green-500 focus:ring-1",
                        isPreview ? "w-0 p-0" : "w-full lg:w-1/2",
                      )}
                    />
                    <div
                      className={cn(
                        "lg:px-10",
                        isPreview
                          ? "mx-auto w-full lg:w-4/5 "
                          : " hidden w-1/2 lg:block ",
                      )}
                    >
                      <h1 className="text-3xl font-bold dark:text-gray-200">
                        {form.getValues().title || "Untittle blog"}
                      </h1>
                    </div>
                  </div>
                </>
              </FormControl>

              {form.getFieldState("title").invalid &&
                form.getValues().title && (
                  <div className="px-2">
                    <FormMessage />
                  </div>
                )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <div
                    className={cn(
                      "flex w-full items-center gap-2 divide-x p-2",
                      isPreview ? "divide-x-0" : "divide-x",
                    )}
                  >
                    <Input
                      placeholder="🔗 Image url"
                      {...field}
                      className={cn(
                        "border-none text-lg font-medium leading-relaxed ring-green-500 focus:ring-1 ",
                        isPreview ? "w-0 p-0" : "w-full lg:w-1/2",
                      )}
                      type="url"
                    />
                    <div
                      className={cn(
                        " relative",
                        isPreview
                          ? "mx-auto w-full px-0 lg:w-4/5 "
                          : "hidden w-1/2 px-10 lg:block",
                      )}
                    >
                      {isPreview ? (
                        <div className="relative mt-10 h-80 w-full rounded-md border">
                          <Image
                            src={form.getValues().image_url}
                            alt="preview"
                            fill
                            className=" rounded-md object-cover object-center"
                          />
                        </div>
                      ) : (
                        <p className="text-gray-400">
                          👆 click on preview to see image
                        </p>
                      )}
                    </div>
                  </div>
                </FormControl>

                <div className="px-3">
                  <FormMessage />
                </div>
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className={cn(
                    "flex w-full gap-2 p-2 ",
                    !isPreview ? "h-70vh divide-x" : "divide-x-0",
                  )}
                >
                  <Textarea
                    placeholder="Blog content"
                    {...field}
                    className={cn(
                      "h-70vh resize-none border-none text-lg font-medium leading-relaxed  ring-green-500 focus:ring-1",
                      isPreview ? "w-0 p-0" : "w-full lg:w-1/2",
                    )}
                  />
                  <div
                    className={cn(
                      "h-full overflow-scroll",
                      isPreview
                        ? "mx-auto w-full lg:w-4/5 "
                        : "hidden w-1/2 lg:block",
                    )}
                  >
                    <MarkdownPreview
                      content={form.getValues().content}
                      className="lg:px-10"
                    />
                  </div>
                </div>
              </FormControl>

              {form.getFieldState("content").invalid &&
                form.getValues().content && <FormMessage />}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
