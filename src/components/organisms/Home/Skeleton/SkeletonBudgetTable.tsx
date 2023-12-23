import { Card, Skeleton } from "@nextui-org/react";
import React from "react";

const SkeletonTableBudget = () => {
  return (
    <>
      <Card
        className="xl:max-w-full rounded-xl shadow-md p-5 w-full h-full"
        radius="lg"
      >
        <div className="flex justify-between items-end">
          <Skeleton className="w-1/5 rounded-lg">
            <div className="h-8 w-2/5 rounded-lg bg-default-100"></div>
          </Skeleton>
          <Skeleton className="w-20 h-[12px] rounded-lg">
            <div className=" w-2/5 rounded-lg bg-default-100"></div>
          </Skeleton>
        </div>
        <div className="py-10">
          <Skeleton className="rounded-md">
            <div className="h-5 bg-default-100"></div>
          </Skeleton>
          <div className="mt-4 flex flex-row gap-5">
            <Skeleton className="w-44 rounded-md">
              <div className="h-5 bg-default-100"></div>
            </Skeleton>
            <Skeleton className="w-44 rounded-md">
              <div className="h-5 bg-default-100"></div>
            </Skeleton>
            <Skeleton className="w-44 rounded-md">
              <div className="h-5 bg-default-100"></div>
            </Skeleton>
            <Skeleton className="w-44 rounded-md">
              <div className="h-5 bg-default-100"></div>
            </Skeleton>
            <Skeleton className="w-44 rounded-md">
              <div className="h-5 bg-default-100"></div>
            </Skeleton>
            <Skeleton className="w-44 rounded-md">
              <div className="h-5 bg-default-100"></div>
            </Skeleton>
            <Skeleton className="w-44 rounded-md">
              <div className="h-5 bg-default-100"></div>
            </Skeleton>
          </div>
          <div className="mt-4 flex flex-row gap-5">
            <Skeleton className="w-44 rounded-md">
              <div className="h-5 bg-default-100"></div>
            </Skeleton>
            <Skeleton className="w-44 rounded-md">
              <div className="h-5 bg-default-100"></div>
            </Skeleton>
            <Skeleton className="w-44 rounded-md">
              <div className="h-5 bg-default-100"></div>
            </Skeleton>
            <Skeleton className="w-44 rounded-md">
              <div className="h-5 bg-default-100"></div>
            </Skeleton>
            <Skeleton className="w-44 rounded-md">
              <div className="h-5 bg-default-100"></div>
            </Skeleton>
            <Skeleton className="w-44 rounded-md">
              <div className="h-5 bg-default-100"></div>
            </Skeleton>
            <Skeleton className="w-44 rounded-md">
              <div className="h-5 bg-default-100"></div>
            </Skeleton>
          </div>
          <div className="mt-4 flex flex-row gap-5">
            <Skeleton className="w-44 rounded-md">
              <div className="h-5 bg-default-100"></div>
            </Skeleton>
            <Skeleton className="w-44 rounded-md">
              <div className="h-5 bg-default-100"></div>
            </Skeleton>
            <Skeleton className="w-44 rounded-md">
              <div className="h-5 bg-default-100"></div>
            </Skeleton>
            <Skeleton className="w-44 rounded-md">
              <div className="h-5 bg-default-100"></div>
            </Skeleton>
            <Skeleton className="w-44 rounded-md">
              <div className="h-5 bg-default-100"></div>
            </Skeleton>
            <Skeleton className="w-44 rounded-md">
              <div className="h-5 bg-default-100"></div>
            </Skeleton>
            <Skeleton className="w-44 rounded-md">
              <div className="h-5 bg-default-100"></div>
            </Skeleton>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <Skeleton className="w-1/5 rounded-lg">
            <div className="h-8 w-2/5 rounded-lg bg-default-100"></div>
          </Skeleton>
          <Skeleton className="w-20 h-[12px] rounded-lg">
            <div className=" w-2/5 rounded-lg bg-default-100"></div>
          </Skeleton>
        </div>
      </Card>
    </>
  );
};

export default SkeletonTableBudget;
