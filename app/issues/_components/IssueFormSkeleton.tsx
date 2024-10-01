import { Box } from "@radix-ui/themes";
import { Skeleton } from "@/components";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height={50} />
      <Skeleton height="50rem" />
    </Box>
  );
};

export default IssueFormSkeleton;
