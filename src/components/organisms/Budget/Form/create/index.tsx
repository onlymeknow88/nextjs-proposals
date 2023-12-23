import React, { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import { AutocompleteItem, Button, Card, CardBody } from "@nextui-org/react";
import { ArrowLeft } from "@/components/organisms/Icons/Button/arrowLeft";
import { Select2 } from "@/components/atoms/Select2";
import { storeBudget } from "@/services/budget";
import router from "next/router";
import { getSelect2Ccow } from "@/services/ccow";
import { CcowsTypes } from "@/services/data-types";
import { InputComponent } from "@/components/atoms/Input";
import { ButtonSubmit } from "@/components/molecules/ButtonSubmit";

interface BudgetProps {
  tokens: string;
}

interface BudgetStateTypes {
  budget_name: string;
  ccow_id: string;
}

const FormBudget = (props: BudgetProps) => {
  const { tokens } = props;

  const initialState = {
    budget_name: "",
    ccow_id: "",
  };

  const [budget, setBudget] = useState<BudgetStateTypes>(initialState);

  const [validation, setValidation] = useState<BudgetStateTypes>(initialState);
  const [error, setError] = useState(false);

  const [optCcow, setOptCcow] = useState<any>([]);

  const fetchSelect2Ccow = useCallback(async () => {
    const res = await getSelect2Ccow(tokens);
    const data = await res.data.result;
    setOptCcow(data);
  }, [tokens]);

  const handleSubmit = async () => {
    const res = await storeBudget(budget, tokens);
    switch (res.error) {
      case true:
        setValidation(res.data);
        setError(true);
        break;
      case false:
        router.push("/budget");
        setError(false);
        break;
    }
  };

  useEffect(() => {
    fetchSelect2Ccow();
  }, [fetchSelect2Ccow]);

  return (
    <>
      {" "}
      <div className="flex justify-between gap-3 items-end">
        <Button
          className="text-lg h-[40px] lg:h-[34px] lg:text-sm bg-default-200 md:h-[34px] md:text-sm"
          size="sm"
          as={NextLink}
          href="/budget"
          radius="sm"
          startContent={<ArrowLeft className="h-6 stroke-default-500" />}
        >
          Back
        </Button>
      </div>
      <div className="max-w-[90rem]">
        <form action="">
          <Card shadow="sm" className="max-w-[90rem] lg:w-full">
            <CardBody className="p-4 md:p-6 lg:p-8 gap-4">
              <div className="flex flex-col lg:w-[550px] md:flex-row gap-4">
                <Select2
                  isInvalid={error ? true : false}
                  errorMessage={
                    error && validation.ccow_id ? validation.ccow_id : ""
                  }
                  label="CCOW"
                  variant="bordered"
                  size="sm"
                  placeholder="Pilih"
                  defaultItems={optCcow}
                  // selectedKey={`${budget.ccow_id}`}
                  onSelectionChange={(event: any) => {
                    setError(false);
                    return setBudget({
                      ...budget,
                      ccow_id: event,
                    });
                  }}
                  inputProps={{
                    classNames: {
                      inputWrapper: "border-1 border-gray-400 h-[38px]",
                    },
                  }}
                >
                  {(item: CcowsTypes) => (
                    <AutocompleteItem key={item.ccow_id} value={item.ccow_id}>
                      {item.ccow_name}
                    </AutocompleteItem>
                  )}
                </Select2>
              </div>
              <div className="flex flex-col lg:w-[550px] md:flex-row gap-4">
                <InputComponent
                  isRequiredLabel="true"
                  isInvalid={error ? true : false}
                  errorMessage={error && validation.budget_name ? validation.budget_name : ""}
                  label="Budget Name"
                  size="sm"
                  variant="bordered"
                  value={budget.budget_name}
                  isRequired
                  onChange={(event: any) => {
                    setError(false);
                    return setBudget({
                      ...budget,
                      budget_name: event.target.value,
                    });
                  }}
                  classNames={{
                    inputWrapper: "border-1 border-gray-400 h-[38px]",
                  }}
                />
              </div>
              <div className="flex justify-start flex-col lg:flex-row md:flex-row gap-3">
                <ButtonSubmit onSubmit={handleSubmit} />
                <Button
                  size="md"
                  radius="sm"
                  className="bg-default-100 lg:text-sm text-lg h-[50px] lg:h-[34px] md:h-[34px] md:text-sm"
                  onClick={() => {
                    setError(false);
                    setBudget(initialState);
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

export default FormBudget;
