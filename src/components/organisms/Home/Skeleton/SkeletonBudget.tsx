import { Card, Skeleton } from "@nextui-org/react";
import React from "react";

const SkeletonBudget = () => {
  return (
    <Card className="xl:max-w-sm rounded-xl shadow-md p-5 w-full">
      <Skeleton className="w-2/5 rounded-lg">
        <div className="h-8 w-2/5 rounded-lg bg-default-100"></div>
      </Skeleton>
      <div className="py-5">
        <Skeleton className="w-5/5 rounded-lg">
          <div className="h-8 w-2/5 bg-default-100 rounded-lg"></div>
        </Skeleton>
      </div>

      <Skeleton className="w-2/5 rounded-lg">
        <div className="h-4 w-2/5 rounded-lg bg-default-100"></div>
      </Skeleton>
    </Card>
  );
};

export default SkeletonBudget;
