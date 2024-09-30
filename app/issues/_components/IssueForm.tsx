"use client";

import { ErrorMessage, Spinner } from "@/components";
import { createIssueSchema } from "@/types/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof createIssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();

  const [error, setError] = useState<string>("");
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      const response = await axios.post("/api/issues", data);
      if (response.status === 201) {
        router.push("/");
        setSubmitting(false);
      }
    } catch (error: any) {
      setSubmitting(false);
      setError("Something went wrong.");
    }
  });

  return (
    <div className="max-w-xl p-3">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit} className="w-[100%] border p-3 mt-3">
        <div className="w-full">
          <p className="text-blue-800 font-medium text-sm py-2">Title</p>
          <TextField.Root
            {...register("title")}
            placeholder="Create new Issue."
            defaultValue={issue?.title}
          ></TextField.Root>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </div>
        <div className="w-full mb-4">
          <p className="text-blue-800 font-medium text-sm py-2">Description</p>
          <Controller
            defaultValue={issue?.description}
            control={control}
            name="description"
            render={({ field }) => (
              <SimpleMDE
                // className="w-[50%]"
                placeholder="Description"
                {...field}
              />
            )}
          />

          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>
        <Button
          disabled={isSubmitting}
          variant="solid"
          className="cursor-pointer"
        >
          {isSubmitting ? <Spinner /> : "Submit new Issue"}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
