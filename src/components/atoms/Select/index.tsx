import { Select } from "@nextui-org/react";
import React, { ReactElement, ReactNode } from "react";

interface SelectProps {
  label: string;
  error: boolean;
  children: any;
  placeholder: string;
}

export const SelectComponent = (props: any) => {
  const {
    label,
    error,
    children,
    placeholder,
    isRequiredLabel,
    ...nativeProps
  } = props;
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
      <Select placeholder="Pilih" {...nativeProps}>
        {children}
      </Select>
    </>
  );
};
