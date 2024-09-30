import { Box } from "@radix-ui/themes";
import { Skeleton } from "@/components";
const LoadingNew = () => {
  return (
    <Box>
      <Skeleton height={50} />
      <Skeleton height={120} />
    </Box>
  );
};

export default LoadingNew;
