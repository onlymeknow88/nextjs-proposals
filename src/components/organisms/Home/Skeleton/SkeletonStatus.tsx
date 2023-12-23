import { Card, Skeleton } from "@nextui-org/react";
import React from "react";

const SkeletonStatus = () => {
  return (
    <Card className="xl:max-w-full rounded-xl shadow-md p-5 w-full" radius="lg">
      <Skeleton className="w-3/5 rounded-lg">
        <div className="h-8 w-2/5 rounded-lg bg-default-100"></div>
      </Skeleton>
      <div className="flex justify-center p-10">
        <Skeleton className="w-48 h-48 rounded-full">
          <div className="w-48 h-48 bg-default-100 rounded-full"></div>
        </Skeleton>
      </div>
      <div className="flex flex-row justify-between gap-4 w-full">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-4 w-2/5 rounded-lg bg-default-100"></div>
        </Skeleton>
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-4 w-2/5 rounded-lg bg-default-100"></div>
        </Skeleton>
      </div>
      <div className="flex flex-row justify-between gap-4 mt-3 w-full">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-4 w-2/5 rounded-lg bg-default-100"></div>
        </Skeleton>
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-4 w-2/5 rounded-lg bg-default-100"></div>
        </Skeleton>
      </div>
      <div className="flex flex-row justify-between gap-4 mt-3 w-full">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-4 w-2/5 rounded-lg bg-default-100"></div>
        </Skeleton>
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-4 w-2/5 rounded-lg bg-default-100"></div>
        </Skeleton>
      </div>
    </Card>
  );
};

export default SkeletonStatus;
