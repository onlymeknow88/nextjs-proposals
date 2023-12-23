import { Card, CardBody } from "@nextui-org/react";
import { type } from "os";
import React from "react";
import { formatRupiah } from "@/helpers/util";

type CardSisaBudgetProps = {
  title: string;
  data: any;
};

const CardSisaBudget = (Props: Partial<CardSisaBudgetProps>) => {
  const { data, title } = Props;
  // console.log(budget)
  return (
    <Card className="xl:max-w-sm rounded-xl shadow-md px-3 w-full bg-default-300">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <div className="flex flex-col">
            <span>{title}</span>
          </div>
        </div>
        <div className="flex gap-2.5 py-6 items-center">
          <span className=" text-2xl font-semibold text-red-500">{formatRupiah(data.sisa_budget || 0)}</span>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <div>
              <span className="text-xs ">{data.nama_budget}</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardSisaBudget;
