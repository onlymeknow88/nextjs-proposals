import { AutocompleteItem, Button, Card, CardBody } from "@nextui-org/react";
import router from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import { ArrowLeft } from "@/components/organisms/Icons/Button/arrowLeft";
import { InputComponent } from "@/components/atoms/Input";
import { ButtonSubmit } from "@/components/molecules/ButtonSubmit";
import { PurpayTypes, UserTypes } from "@/services/data-types";
import { updatePurpay } from "@/services/purpay";

interface PurpayProps {
  tokens: string;
  purpayBase64: PurpayTypes;
  users: UserTypes;
}

interface PurpayStateTypes {
  purpay_name: string;
}

const FormPurpay = (props: PurpayProps) => {
  const { tokens, purpayBase64, users } = props;

  const purpays = JSON.parse(atob(purpayBase64.toString()));

  const initialState = {
    purpay_name: "",
  };

  const [purpay, setPurpay] = useState<PurpayStateTypes>({
    purpay_name: purpays.purpay_name,
  });

  const [validation, setValidation] = useState<PurpayStateTypes>(initialState);
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    const res = await updatePurpay(purpay, purpays.purpay_id, tokens);
    switch (res.error) {
      case true:
        setValidation(res.data);
        setError(true);
        break;
      case false:
        router.push("/purpay");
        setError(false);
        break;
    }
  };

  return (
    <>
      {" "}
      <div className="flex justify-between gap-3 items-end">
        <Button
          className="text-lg h-[40px] lg:h-[34px] lg:text-sm bg-default-200 md:h-[34px] md:text-sm"
          size="sm"
          as={NextLink}
          href="/purpay"
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
                <InputComponent
                  isRequiredLabel="true"
                  isInvalid={error ? true : false}
                  errorMessage={
                    error && validation.purpay_name
                      ? validation.purpay_name
                      : ""
                  }
                  label="Purpay Name"
                  size="sm"
                  variant="bordered"
                  value={purpay.purpay_name}
                  isRequired
                  onChange={(event: any) => {
                    setError(false);
                    return setPurpay({
                      ...purpay,
                      purpay_name: event.target.value,
                    });
                  }}
                  classNames={{
                    inputWrapper: "border-1 border-gray-400 h-[38px]",
                  }}
                />
              </div>
              <div className="flex justify-start flex-col md:flex-row lg:flex-row gap-3">
                <ButtonSubmit onSubmit={handleSubmit} />
                <Button
                  size="md"
                  radius="sm"
                  className="bg-default-100 lg:text-sm text-lg h-[50px] lg:h-[34px] md:h-[34px] md:text-sm"
                  onClick={() => {
                    setError(false);
                    setPurpay(initialState);
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

export default FormPurpay;
