import { InputComponent } from "@/components/atoms/Input";
import { ArrowLeft } from "@/components/organisms/Icons/Button/arrowLeft";
import { updateCcow } from "@/services/ccow";
import { Button, Card, CardBody } from "@nextui-org/react";
import router from "next/router";
import React, { useState } from "react";
import NextLink from "next/link";
import { ButtonSubmit } from "@/components/molecules/ButtonSubmit";
import { CcowsTypes, UserTypes } from "@/services/data-types";

interface CcowProps {
  ccowBase64: CcowsTypes;
  users: UserTypes;
  tokens: string;
}

interface CcowStateTypes {
  ccow_name: string;
  ccow_code: string;
  cost_center: string;
}

const FormCcow = (props: CcowProps) => {
  const { tokens, ccowBase64 } = props;
  const ccows = JSON.parse(atob(ccowBase64.toString()));

  const initialState = {
    ccow_name: "",
    ccow_code: "",
    cost_center: "",
  };

  const [ccow, setCcow] = useState<CcowStateTypes>({
    ccow_name: ccows.ccow_name,
    ccow_code: ccows.ccow_code,
    cost_center: ccows.cost_center,
  });

  const [validation, setValidation] = useState<CcowStateTypes>(initialState);
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    const res = await updateCcow(ccow, ccows.ccow_id, tokens);
    switch (res.error) {
      case true:
        setValidation(res.data);
        setError(true);
        break;
      case false:
        router.push("/ccow");
        setError(false);
        break;
    }
  };
  return (
    <>
      <div className="flex justify-between gap-3 items-end">
        <Button
          className="text-lg h-[40px] lg:h-[34px] lg:text-sm bg-default-200 md:h-[34px] md:text-sm"
          size="sm"
          as={NextLink}
          href="/ccow"
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
                <InputComponent
                  isRequiredLabel="true"
                  isInvalid={error ? true : false}
                  errorMessage={
                    error && validation.ccow_code ? validation.ccow_code : ""
                  }
                  label="Ccow Code"
                  size="sm"
                  variant="bordered"
                  value={ccow.ccow_code}
                  isRequired
                  onChange={(event: any) => {
                    setError(false);
                    return setCcow({
                      ...ccow,
                      ccow_code: event.target.value,
                    });
                  }}
                  classNames={{
                    inputWrapper: "border-1 border-gray-400 h-[38px]",
                  }}
                />
              </div>
              <div className="flex flex-col lg:w-[550px] md:flex-row gap-4">
                <InputComponent
                  isRequiredLabel="true"
                  isInvalid={error ? true : false}
                  errorMessage={
                    error && validation.ccow_name ? validation.ccow_name : ""
                  }
                  label="Ccow Name"
                  size="sm"
                  variant="bordered"
                  value={ccow.ccow_name}
                  isRequired
                  onChange={(event: any) => {
                    setError(false);
                    return setCcow({
                      ...ccow,
                      ccow_name: event.target.value,
                    });
                  }}
                  classNames={{
                    inputWrapper: "border-1 border-gray-400 h-[38px]",
                  }}
                />
              </div>
              <div className="flex flex-col lg:w-[550px] md:flex-row gap-4">
                <InputComponent
                  isRequiredLabel="true"
                  isInvalid={error ? true : false}
                  errorMessage={
                    error && validation.cost_center
                      ? validation.cost_center
                      : ""
                  }
                  label="Cost Center"
                  size="sm"
                  variant="bordered"
                  value={ccow.cost_center}
                  isRequired
                  onChange={(event: any) => {
                    setError(false);
                    return setCcow({
                      ...ccow,
                      cost_center: event.target.value,
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
                    setCcow(initialState);
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

export default FormCcow;
