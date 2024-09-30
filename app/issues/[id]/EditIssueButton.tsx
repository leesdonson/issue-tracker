import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditIssueButton = ({ issue }: { issue: any }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/issues/${issue.id}/edit`}>Edit issue</Link>
    </Button>
  );
};

export default EditIssueButton;
