import { Card } from "@radix-ui/themes";
import { Skeleton } from "@/components";

const LoadingDetails = () => {
  return (
    <div className="p-4 max-w-xl">
      <Skeleton height={50} width="100%" />
      <div className="flex items-center justify-flex-start gap-3 py-2">
        <Skeleton height={20} width={"5rem"} />
        <Skeleton height={20} width={"5rem"} />
      </div>
      <Card className="py-2 prose">
        <Skeleton height={50} width="100%" count={3} />
      </Card>
    </div>
  );
};

export default LoadingDetails;
