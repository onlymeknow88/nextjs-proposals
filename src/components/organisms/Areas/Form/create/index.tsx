import { InputComponent } from "@/components/atoms/Input";
import { ArrowLeft } from "@/components/organisms/Icons/Button/arrowLeft";
import { storeArea } from "@/services/area";
import { Button, Card, CardBody } from "@nextui-org/react";
import router from "next/router";
import React, { useState } from "react";
import NextLink from "next/link";
import { ButtonSubmit } from "@/components/molecules/ButtonSubmit";

interface AreaProps {
  tokens: string;
}

interface AreaStateTypes {
  area_name: string;
}

const FormArea = (props: AreaProps) => {
  const { tokens } = props;

  const initialState = {
    area_name: "",
  };

  const [area, setArea] = useState<AreaStateTypes>(initialState);

  const [validation, setValidation] = useState<AreaStateTypes>(initialState);
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    const res = await storeArea(area, tokens);
    switch (res.error) {
      case true:
        setValidation(res.data);
        setError(true);
        break;
      case false:
        router.push("/area");
        setError(false);
        break;
    }
  };

  return (
    <>
      <div className="flex justify-between gap-3 items-end">
        <Button
          className="text-lg h-[40px] lg:h-[34px] lg:text-sm bg-default-200"
          size="sm"
          href={"/area"}
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
              <div className="flex flex-col lg:w-[550px] md:flex-row gap-4">
                <InputComponent
                  isRequiredLabel="true"
                  isInvalid={error ? true : false}
                  errorMessage={
                    error && validation.area_name ? validation.area_name : ""
                  }
                  label="Area Name"
                  size="sm"
                  variant="bordered"
                  value={area.area_name}
                  isRequired
                  onChange={(event: any) => {
                    setError(false);
                    return setArea({
                      ...area,
                      area_name: event.target.value,
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
                    setArea(initialState);
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

export default FormArea;
