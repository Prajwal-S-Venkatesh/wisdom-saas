"use client";

import * as z from "zod";
import axios from "axios";
import { Heading } from "@/components/heading";
import { useForm } from "react-hook-form";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Empty from "@/components/empty";
import { Loader } from "@/components/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Download, Image as Img } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";

const ImagePage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const proModal = useProModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      const response = await axios.post("/api/image", values);

      const urls = response.data.map((image: { url: string }) => image.url);
      setImages(urls);
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
        title="Image Generation"
        description="Turn your prompts into images."
        icon={Img}
        iconColor="text-violet-500 dark:text-violet-600"
        bgColor="bg-violet-500/10 dark:bg-violet-600/10"
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
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="outline-none focus-visible:ring-0 focus-visible:ring-transparent pl-4 dark:bg-stone-900 dark:border-zinc-800"
                        placeholder="A picture of a polar bear in dessert"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="amount"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      onValueChange={field.onChange}
                      disabled={isLoading}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl className="m-0 pl-2 dark:bg-stone-900 dark:border-zinc-800">
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                name="resolution"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      onValueChange={field.onChange}
                      disabled={isLoading}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl className="m-0 pl-2 dark:bg-stone-900 dark:border-zinc-800">
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full bg-violet-500 hover:bg-violet-600 text-white dark:bg-violet-600 dark:hover:bg-violet-700"
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
          {images.length === 0 && !isLoading && (
            <div className="flex flex-col gap-y-1">
              <Empty label="No images generated." img="empty-image" />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
            {images.map((image, index) => (
              <Card
                key={index}
                className="rounded-lg overflow-hidden shadow-sm"
              >
                <div className="relative aspect-square mb-4 user-select-none pointer-events-none">
                  <Image src={image} fill alt="Image" />
                </div>
                <CardFooter>
                  <Button
                    onClick={() => window?.open(image)}
                    variant="secondary"
                    className="w-full"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
