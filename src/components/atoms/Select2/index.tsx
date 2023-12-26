import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import React, { ReactElement, ReactNode } from "react";

interface Select2Props {
  label: string;
  error: boolean;
  children: any;
}

export const Select2 = (props: any) => {
  const { label, error, children, ...nativeProps } = props;
  return (
    <>
      <span
        className={`${
          error === true ? "text-danger-500" : ""
        } text-sm md:w-[25rem] lg:w-[25rem] font-medium`}
      >
        {label}
        <span className="text-danger-500">*</span>
      </span>
      <Autocomplete {...nativeProps}>{children}</Autocomplete>
    </>
  );
};
