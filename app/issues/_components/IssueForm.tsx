"use client";

import { ErrorMessage, Spinner } from "@/components";
import { createIssueSchema } from "@/types/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

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
      if (issue) {
        const response = await axios.patch(`/api/issues/${issue.id}`, data);
        if (response.status === 200) {
          router.push("/issues/list");
          router.refresh();
          setSubmitting(false);
        }
      } else {
        const response = await axios.post("/api/issues", data);
        if (response.status === 201) {
          router.push("/issues/list");
          router.refresh();
          setSubmitting(false);
        }
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
        {issue ? (
          <Button
            disabled={isSubmitting}
            variant="solid"
            className="cursor-pointer"
          >
            Update Issue {isSubmitting && <Spinner />}
          </Button>
        ) : (
          <Button
            disabled={isSubmitting}
            variant="solid"
            className="cursor-pointer"
          >
            Create Issue {isSubmitting && <Spinner />}
          </Button>
        )}
      </form>
    </div>
  );
};

export default IssueForm;
