"use client";

import * as z from "zod";
import axios from "axios";
import { Heading } from "@/components/heading";
import { Video } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Empty from "@/components/empty";
import { Loader } from "@/components/loader";
import { useProModal } from "@/hooks/use-pro-modal";

const VideoPage = () => {
  const router = useRouter();
  const [video, setVideo] = useState<string>();
  const proModal = useProModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);

      const response = await axios.post("/api/video", {
        prompt: values.prompt,
      });

      setVideo(response.data[0]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="dark:bg-stone-900">
      <Heading
        title="Video Generation"
        description="Turn your prompt into video."
        icon={Video}
        iconColor="text-rose-500"
        bgColor="bg-rose-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-white rounded-lg border w-full p-4 px3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 dark:bg-stone-950 dark:border-zinc-800"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="outline-none focus-visible:ring-0 focus-visible:ring-transparent pl-4 dark:bg-stone-900 dark:border-zinc-800"
                        placeholder="Generate a video of a dancing fish..."
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full bg-rose-500 hover:bg-rose-600 dark:bg-rose-500 dark:hover:bg-rose-600 text-white"
                disabled={isLoading}
              >
                Send
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {!video && !isLoading && (
            <div className="flex flex-col gap-y-1">
              <Empty label="No video generated." img="empty-video" />
            </div>
          )}
          {video && (
            <video
              controls
              className="w-full mt-8 aspect-video rounded-lg border bg-black"
            >
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
