"use client";
import React from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/components";

const DeleteIssueButton = ({ issueID }: { issueID: number }) => {
  const router = useRouter();

  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const handleDelete = async (issueID: number) => {
    try {
      setDeleting(true);
      const response = await axios.delete(`/api/issues/${issueID}`);
      if (response.status === 200) {
        console.log("Clicked");
        router.push("/issues/list");
        router.refresh();
      }
    } catch (error) {
      setDeleting(false);
      setError(true);
      console.log(error);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button disabled={isDeleting} color="red">
            <TrashIcon />
            Delete issue {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Are you sure?</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone.
          </AlertDialog.Description>
          <Flex mt="4" gap="5">
            <AlertDialog.Action>
              <Button color="red" onClick={() => handleDelete(issueID)}>
                Delete
              </Button>
            </AlertDialog.Action>
            <AlertDialog.Cancel>
              <Button color="gray">Cancel</Button>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue cannot be deleted.
          </AlertDialog.Description>
          <Button
            onClick={() => setError(false)}
            color="gray"
            variant="soft"
            mt="2"
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
