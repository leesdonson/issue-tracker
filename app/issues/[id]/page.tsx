import { IssueStatusBadge } from "@/components";
import prisma from "@/prisma/client";
import { Card, Heading } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    notFound();
  }

  await delay(2000);

  return (
    <div className="p-4">
      <Heading>{issue.title}</Heading>
      <div className="flex items-center justify-flex-start gap-3 py-2">
        <p className="text-xs font-thin py-2">
          {issue.createdAt.toDateString()}
        </p>
        <IssueStatusBadge status={issue.status} />
      </div>
      <Card className="py-2 prose">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailsPage;
