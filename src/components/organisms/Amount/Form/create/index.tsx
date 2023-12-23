import { storeAmount, yearOptions } from "@/services/amount";
import { getSelect2GlAcc } from "@/services/gl-acc";
import { AutocompleteItem, Button, Card, CardBody, SelectItem } from "@nextui-org/react";
import router from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import { ArrowLeft } from "@/components/organisms/Icons/Button/arrowLeft";
import { InputComponent } from "@/components/atoms/Input";
import { ButtonSubmit } from "@/components/molecules/ButtonSubmit";
import { Select2 } from "@/components/atoms/Select2";
import { GLAccTypes } from "@/services/data-types";
import { formatRupiah } from "@/helpers/util";
import { SelectComponent } from "@/components/atoms/Select";
interface AmountProps {
  tokens: string;
}

interface AmountStateTypes {
  gl_acc_id: string;
  amount: string;
  year: string;
}

const FormAmount = (props: AmountProps) => {
  const { tokens } = props;

  const initialState = {
    gl_acc_id: "",
    amount: "",
    year: "",
  };

  const [amount, setAmount] = useState<AmountStateTypes>(initialState);

  const [validation, setValidation] = useState<AmountStateTypes>(initialState);
  const [error, setError] = useState(false);

  const [optGlAcc, setOptGlAcc] = useState<any>([]);

  const fetchSelect2GlAcc = useCallback(async () => {
    const res = await getSelect2GlAcc(tokens);
    const data = await res.data.result;
    setOptGlAcc(data);
  }, [tokens]);

  const handleSubmit = async () => {
    const res = await storeAmount(amount, tokens);
    switch (res.error) {
      case true:
        setValidation(res.data);
        setError(true);
        break;
      case false:
        router.push("/amount");
        setError(false);
        break;
    }
  };

  useEffect(() => {
    fetchSelect2GlAcc();
  }, [fetchSelect2GlAcc]);

  return (
    <>
      <div className="flex justify-between gap-3 items-end">
        <Button
          className="text-lg h-[40px] lg:h-[34px] lg:text-sm bg-default-200"
          size="sm"
          href={"/amount"}
          as={NextLink}
          startContent={<ArrowLeft className="h-6 stroke-default-500" />}
        >
          Back
        </Button>
      </div>

      <div className="max-w-[90rem]">
        <form action="">
          <Card shadow="sm" className="max-w-[90rem] lg:w-full">
            <CardBody className="p-4 md:p-6 lg:p-8 gap-4">
              <div className="flex flex-col lg:w-[550px] md:flex-row gap-4 items-center">
                <Select2
                  isInvalid={error ? true : false}
                  errorMessage={
                    error && validation.gl_acc_id ? validation.gl_acc_id : ""
                  }
                  label="GL Account"
                  variant="bordered"
                  size="sm"
                  placeholder="Pilih"
                  defaultItems={optGlAcc}
                  // selectedKey={`${budget.ccow_id}`}
                  onSelectionChange={(event: any) => {
                    setError(false);
                    return setAmount({
                      ...amount,
                      gl_acc_id: event,
                    });
                  }}
                  inputProps={{
                    classNames: {
                      inputWrapper: "border-1 border-gray-400 h-[38px]",
                    },
                  }}
                >
                  {(item: GLAccTypes) => (
                    <AutocompleteItem
                      key={item.gl_acc_id}
                      value={item.gl_acc_id}
                    >
                      {item.gl_account}
                    </AutocompleteItem>
                  )}
                </Select2>
              </div>
              <div className="flex flex-col lg:w-[550px] md:flex-row gap-4 items-center">
                <InputComponent
                  isInvalid={error ? true : false}
                  errorMessage={
                    error && validation.amount ? validation.amount : ""
                  }
                  label="Amount"
                  size="sm"
                  labelPlacement="inside"
                  variant="underlined"
                  //   value={amount.amount}
                  isRequiredLabel="true"
                  isRequired
                  value={formatRupiah(amount.amount)}
                  onChange={(event: any) => {
                    const numericValue =
                      parseFloat(event.target.value.replace(/[^\d]/g, "")) || 0;
                    return setAmount({
                      ...amount,
                      amount: numericValue.toString(),
                    });
                  }}
                  classNasmes={{
                    inputWrapper: "border-1 border-gray-400 h-[38px]",
                  }}
                />
              </div>

              <div className="flex flex-col lg:w-[550px] md:flex-row gap-4 items-center">
                <SelectComponent
                  label="Year"
                  isInvalid={error ? true : false}
                  errorMessage={error && validation.year ? validation.year : ""}
                  // placeholder="Pilih"
                  variant="bordered"
                  isRequired
                  radius="sm"
                  onChange={(event: any) => {
                    setError(false);
                    return setAmount({
                      ...amount,
                      year: event.target.value,
                    });
                  }}
                  classNames={{
                    trigger: "border-1 border-gray-400 h-[38px]",
                    value: "text-default-700",
                  }}
                >
                   {yearOptions.map((item) => (
                    <SelectItem key={item.uid} value={item.uid}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectComponent>
              </div>
              <div className="flex justify-start flex-col lg:flex-row md:flex-row gap-3">
                <ButtonSubmit onSubmit={handleSubmit} />
                <Button
                  size="md"
                  radius="sm"
                  className="bg-default-100 lg:text-sm text-lg h-[50px] lg:h-[34px] md:h-[34px] md:text-sm"
                  onClick={() => {
                    setError(false);
                    setAmount(initialState);
                    setValidation(initialState);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardBody>
          </Card>
        </form>
      </div>
    </>
  );
};

export default FormAmount;
