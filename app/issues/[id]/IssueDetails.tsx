import { IssueStatusBadge } from "@/components";
import { Issue } from "@prisma/client";
import { Card, Heading } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <div className="w-full border border-surface p-4">
      <Heading>{issue.title}</Heading>
      <div className="flex items-center justify-flex-start gap-3 py-2">
        <p className="text-xs font-thin py-2">
          {issue.createdAt.toDateString()}
        </p>
        <IssueStatusBadge status={issue.status} />
      </div>
      <Card className="py-2 prose max-w-full">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetails;
