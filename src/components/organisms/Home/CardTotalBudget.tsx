import { Card, CardBody } from "@nextui-org/react";
import { type } from "os";
import React from "react";
import { formatRupiah } from "@/helpers/util";

type CardTotalBudgetProps = {
  title: string;
  data: any;
};

const CardTotalBudget = (Props: CardTotalBudgetProps) => {
  const { data, title } = Props;
  // console.log(budget)
  return (
    <Card className="xl:max-w-sm rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5 justify-between">
          {/* <div className="flex "> */}
            <span>{title}</span>
          {/* </div> */}
            {/* <span className="text-[1.2rem] font-medium text-blue-500">2024</span> */}
        </div>
        <div className="flex gap-2.5 py-6 items-center">
          <span className=" text-2xl font-semibold text-red-500">{formatRupiah(data.total_budget || 0)}</span>
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

export default CardTotalBudget;
