import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
// import  MyInput from "./CustomStyleInpsut";

interface InputProps {
  label: string;
  error: boolean;
}

export const DatepickerComponent = (props: any) => {
  const { label, error, onValue, data, isRequiredLabel, ...nativeProps } =
    props;
  const [value, setValue] = useState({
    startDate: data,
    endDate: data,
  });

  //@ts-ignore
  const handleValueChange = (newValue) => {
    // console.log("newValue:", newValue);
    onValue(newValue);
    setValue(newValue);
  };

  return (
    <>
      <label
        className={`${
          error === true ? "text-red-500" : ""
        } text-sm md:w-[25rem] lg:w-[25rem] font-medium`}
        htmlFor="false"
      >
        {label}
        {isRequiredLabel === "true" && <span className="text-red-500">*</span>}
      </label>
      <Datepicker
        useRange={false}
        inputClassName={`relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full border-default-500 border-1 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 rounded-xl tracking-wide font-light text-sm placeholder-gray-400 bg-white focus:ring disabled:opacity-60 disabled:cursor-not-allowed focus:border-default-500 focus:ring-white`}
        toggleClassName={`absolute right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-75 disabled:cursor-not-allowed`}
        {...nativeProps}
        // @ts-ignore
        value={value}
        onChange={handleValueChange}
        primaryColor={"green"}
      />
    </>
  );
};
