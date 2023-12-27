import { Card, CardBody } from "@nextui-org/react";
import { type } from "os";
import React from "react";

type CardSkalaPrioritasProps = {
  title: string;
  data: any;
};

const CardSkalaPrioritas = (Props: CardSkalaPrioritasProps) => {
  const { data, title } = Props;
  return (
    <Card className={`xl:max-w-sm w-full lg:h-[9.4rem] h-[9.8rem]
    ${data.name === "High" ? "bg-gradient-to-l from-pink-500 to-rose-600" : ""}
    ${data.name === "Medium" ? "bg-gradient-to-l from-amber-500 to-amber-600" : ""}
    ${data.name === "Low" ? "bg-gradient-to-l from-blue-500 to-blue-600" : ""}
     rounded-xl shadow-md px-3`}>
      <CardBody className="py-5 lg:py-5">
        <div className="flex">
          <div className="flex flex-col">
            <span className={`text-white text-lg lg:text-[1rem]`}>{title}</span>
          </div>
        </div>
        <div className="flex py-3 lg:py-3 items-center">
          <span className={`text-white text-4xl lg:text-3xl font-semibold`}>{data.value}</span>
        </div>
        <div className="flex items-center">
          <div>
            <div>
              <span className={`text-md lg:text-xs text-white`}>{data.name}</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardSkalaPrioritas;
