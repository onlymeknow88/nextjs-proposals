import { Select, SelectItem, Input, SelectSection } from "@nextui-org/react";
import React, { useEffect } from "react";
import { formatRupiah } from "@/helpers/util";

export const SelectOptionUsulan = ({
  onInputValue,
  valueDana,
  valueJenisBantuan,
  error,
  validation,
}:any) => {
  const [selectOption, setSelectedOption] = React.useState({
    key: "",
    value: "",
  });

  useEffect(() => {
    if (valueJenisBantuan === "dana" || valueJenisBantuan === "material") {
      setSelectedOption({ key: "dana", value: "Nominal Angka" });
    } 
  }, [valueJenisBantuan]);
  return (
    <>
      <div className={`flex flex-col lg:w-[550px] md:flex-row gap-4 ${valueJenisBantuan === 'dana' || valueJenisBantuan === 'material' ? "" : "lg:hidden hidden"}`}>
        <label
          className={`${
            error === true ? "text-danger-500" : ""
          } text-sm md:w-[25rem] lg:w-[25rem] font-medium`}
        >
          Jumlah bantuan yang <br />
          diusulkan <span className="text-danger-500">*</span>
        </label>
            <Input
              isInvalid={error ? true : false}
              errorMessage={
                validation.jumlah_dana ? validation.jumlah_dana : ""
              }
              label="Nominal Angka"
              labelPlacement="inside"
              placeholder="Rp. 0"
              variant="underlined"
              isRequired
              value={formatRupiah(valueDana)}
              onChange={(event) => {
                const numericValue =
                  parseFloat(event.target.value.replace(/[^\d]/g, '')) || 0;
                // Assuming you have a function to handle input changes, such as onInputValue
                onInputValue({ key:'dana',value: numericValue });
              }}
              className="flex"
            />
        </div>
    </>
  );
};
