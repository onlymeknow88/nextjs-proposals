import { Textarea } from "@nextui-org/react";
import React from "react";

interface TextAreaProps {
  label: string;
  error: boolean;
}

export const TextArea = (props: any) => {
  const { label, error, isRequiredLabel, ...nativeProps } = props;
  return (
    <>
      <span
        className={`${
          error === true ? "text-red-500" : ""
        } text-sm md:w-[25rem] lg:w-[25rem] font-medium`}
      >
        {label}
        {isRequiredLabel === "true" && <span className="text-red-500">*</span>}
      </span>
      <Textarea {...nativeProps} />
    </>
  );
};
