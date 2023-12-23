import React, { useState } from "react";
import { Button, Link } from "@nextui-org/react";

interface InputImageProps {
  label: string;
  error: boolean;
  children: React.ReactNode;
}

export const InputImage = (props: InputImageProps) => {
  const { label, error, children, ...nativeProps } = props;

  return (
    <>
      <span
        className={`${
          error === true ? "text-red-500" : ""
        } text-sm md:w-[23.5rem] lg:w-[23.5rem] font-medium`}
      >
        {label}
        <span className="text-red-500">*</span>
      </span>
      {children}
    </>
  );
};
export default InputImage;
