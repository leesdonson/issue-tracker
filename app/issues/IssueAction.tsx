import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssueAction = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/issues/new">Create new Issue</Link>
      </Button>
    </div>
  );
};

export default IssueAction;
