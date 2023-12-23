import { getSelect2Ccow } from "@/services/ccow";
import { storeGLAcc, updateGLAcc } from "@/services/gl-acc";
import { AutocompleteItem, Button, Card, CardBody } from "@nextui-org/react";
import router from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import { ArrowLeft } from "@/components/organisms/Icons/Button/arrowLeft";
import { Select2 } from "@/components/atoms/Select2";
import { CcowsTypes, GLAccTypes, UserTypes } from "@/services/data-types";
import { InputComponent } from "@/components/atoms/Input";
import { ButtonSubmit } from "@/components/molecules/ButtonSubmit";

interface GlAccProps {
  tokens: string;
  glAccBase64: GLAccTypes;
  users: UserTypes;
}

interface GlAccStateTypes {
  gl_account: string;
  ccow_id: string;
}

const FormGLAccount = (props: GlAccProps) => {
  const { tokens, glAccBase64, users } = props;

  const glAccs = JSON.parse(atob(glAccBase64.toString()));

  const initialState = {
    gl_account: "",
    ccow_id: "",
  };

  const [glAcc, setGlAcc] = useState<GlAccStateTypes>({
    gl_account: glAccs.gl_account,
    ccow_id: glAccs.ccow.ccow_id,
  });

  const [validation, setValidation] = useState<GlAccStateTypes>(initialState);
  const [error, setError] = useState(false);

  const [optCcow, setOptCcow] = useState<any>([]);

  const fetchSelect2Ccow = useCallback(async () => {
    const res = await getSelect2Ccow(tokens);
    const data = await res.data.result;
    setOptCcow(data);
  }, [tokens]);

  const handleSubmit = async () => {
    const res = await updateGLAcc(glAcc,glAccs.gl_acc_id, tokens);
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
          className="text-lg h-[40px] lg:h-[34px] lg:text-sm bg-default-200"
          size="sm"
          as={NextLink}
          href="/gl-account"
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
                  selectedKey={`${glAccs.ccow.ccow_id}`}
                  onSelectionChange={(event: any) => {
                    setError(false);
                    return setGlAcc({
                      ...glAcc,
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
                  errorMessage={error && validation.gl_account ? validation.gl_account : ""}
                  label="Budget Name"
                  size="sm"
                  variant="bordered"
                  value={glAcc.gl_account}
                  isRequired
                  onChange={(event: any) => {
                    setError(false);
                    return setGlAcc({
                      ...glAcc,
                      gl_account: event.target.value,
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
                    setGlAcc(initialState);
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

export default FormGLAccount;
