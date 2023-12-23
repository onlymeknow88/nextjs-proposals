import { Input } from "@nextui-org/react";
import React from "react";
// import  MyInput from "./CustomStyleInpsut";

interface InputProps {
  label: string;
  error: boolean;
}

export const InputComponent = (props: any) => {
  const { label, error,isRequiredLabel, ...nativeProps } = props;
  return (
    <>
      <label
        className={`${
          error === true ? "text-red-500" : ""
        } text-sm md:w-[25rem] lg:w-[25rem] font-medium`}
      >
        {label}
        {isRequiredLabel === "true" && (<span className="text-red-500">*</span>)}
        
      </label>
      <Input {...nativeProps} />
    </>
  );
};
