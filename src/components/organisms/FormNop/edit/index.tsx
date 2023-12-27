import { getSelect2Amount } from "@/services/amount";
import {
  FormNopTypes,
  GLAccTypes,
  PurpayTypes,
  UserTypes,
} from "@/services/data-types";
import { updateFormNop } from "@/services/form-nop";
import { getSelect2GlAcc } from "@/services/gl-acc";
import { getSelect2Purpay } from "@/services/purpay";
import React, { useCallback, useEffect, useState } from "react";
import { ArrowLeft } from "../../Icons/Button/arrowLeft";
import NextLink from "next/link";
import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import Datepicker from "react-tailwindcss-datepicker";
import { formatRupiah, formatWithoutRupiah } from "@/helpers/util";
import { ButtonSubmit } from "@/components/molecules/ButtonSubmit";
import { useRouter } from "next/router";

interface FormNopProps {
  formNopsBase64: FormNopTypes;
  users: UserTypes;
  tokens: string;
}

interface FormNoiStateTypes {
  nop_id: string;
  nop_name: string;
  purpay_id: string;
  acc_name: string;
  provider: string;
  bank_name: string;
  amount: string;
  account_no: string;
  due_date: string;
  email: string;
  other_info: string;
  desc: string;
  explanation: string;
  amount_id: string;
  prop_id: string;
  get_amount: any;
}

const FormNop = (props: FormNopProps) => {
  const { tokens, formNopsBase64 } = props;
  const formNops = JSON.parse(atob(formNopsBase64.toString()));

  const initialState = {
    nop_id: formNops.nop_id,
    nop_name: formNops.nop_name,
    purpay_id: formNops.purpay_id,
    acc_name: formNops.acc_name,
    provider: formNops.provider,
    bank_name: formNops.bank_name,
    amount: formNops.amount,
    account_no: formNops.account_no,
    due_date: formNops.due_date,
    email: formNops.email,
    other_info: formNops.other_info,
    desc: formNops.desc,
    explanation: formNops.explanation,
    amount_id: formNops.amount_id,
    prop_id: formNops.prop_id,
    get_amount: {
        gl_acc_id : formNops.get_amount.gl_acc_id,
    },
  };

  const [formNoi, setFormNoi] = useState<FormNoiStateTypes>(initialState);

  const [validation, setValidation] = useState<FormNoiStateTypes>(initialState);
  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  //date range
  const [date, setDate] = useState({
    startDate: formNoi.due_date,
    endDate: formNoi.due_date,
  });

  //@ts-ignore
  const handleDate = (newDate) => {
    setDate(newDate);

    setFormNoi({
      ...formNoi,
      due_date: newDate.startDate,
    });
  };

  const [optGlAcc, setOptGlAcc] = useState<any>([]);

  const fetchSelect2GlAcc = useCallback(async () => {
    setIsLoading(true);
    const res = await getSelect2GlAcc(tokens);
    const data = await res.data.result;
    setOptGlAcc(data);
    setIsLoading(false);
  }, [tokens]);

  const [purpay, setPurpay] = useState<any>([]);

  const fetchSelect2Purpay = useCallback(async () => {
    setIsLoading(true);
    const res = await getSelect2Purpay(tokens);
    const data = await res.data.result;
    setPurpay(data);
    setIsLoading(false);
  }, [tokens]);

  const [amount, setAmount] = useState<any>([]);

  const fetchSelect2Amount = useCallback(async () => {
    setIsLoading(true);
    const res = await getSelect2Amount(tokens, "");
    const data = await res.data.result;
    setAmount(data);
    setIsLoading(false);
  }, [tokens]);

  const handleAmountChange = useCallback(
    async (event: any) => {
      setIsLoading(true);
      if (!event) {
        const res = await getSelect2GlAcc(tokens);
        const data = await res.data.result;
        setOptGlAcc(data);

        // setAmount([]);
        return setFormNoi({
          ...formNoi,
          amount_id: "",
          get_amount: {
            gl_acc_id: "",
          },
        });
      }


      const res = await getSelect2Amount(tokens, event);
      const data = await res.data.result;
      setAmount(data);

      setFormNoi({
        ...formNoi,
        get_amount: {
            gl_acc_id: event,
        },
      });
      setIsLoading(false);
    },
    [formNoi, tokens]
  );

  const router = useRouter();

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("nop_name", formNoi.nop_name);
    data.append("purpay_id", formNoi.purpay_id);
    data.append("acc_name", formNoi.acc_name);
    data.append("provider", formNoi.provider);
    data.append("bank_name", formNoi.bank_name);
    data.append("amount", formNoi.amount);
    data.append("amount_id", formNoi.amount_id);
    data.append("account_no", formNoi.account_no);
    data.append("due_date", formNoi.due_date);
    data.append("email", formNoi.email);
    data.append("other_info", formNoi.other_info);
    data.append("desc", formNoi.desc);
    data.append("explanation", formNoi.explanation);
    data.append("prop_id", formNoi.prop_id);

    const res = await updateFormNop(data, formNoi.nop_id, tokens);

    switch (res.error) {
      case true:
        setValidation(res.data);
        setError(true);
        break;
      case false:
        router.push("/form-nop");
        setError(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    fetchSelect2GlAcc();
    fetchSelect2Purpay();
    fetchSelect2Amount();
  }, [fetchSelect2Purpay, fetchSelect2GlAcc, fetchSelect2Amount]);

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

      <div className="max-w-[90rem] mb-10">
        <form action="">
          <Card shadow="sm" className="max-w-[90rem] lg:w-full">
            <CardBody className="p-4 md:p-6 lg:p-8 gap-4">
              <div className="flex flex-col md:flex-row gap-4 lg:items-center">
                <Input
                  isInvalid={error ? true : false}
                  errorMessage={
                    error && validation.nop_name ? validation.nop_name : ""
                  }
                  label="Non Order Payment Name"
                  labelPlacement="outside"
                  size="sm"
                  variant="bordered"
                  value={formNoi.nop_name}
                  placeholder=" "
                  isRequired
                  onChange={(event: any) => {
                    // setError(false);
                    return setFormNoi({
                      ...formNoi,
                      nop_name: event.target.value,
                    });
                  }}
                  classNames={{
                    inputWrapper: "border-1 border-gray-400 h-[40px]",
                    label: "z-0 text-[10px] lg:py-1 py-2",
                  }}
                />
              </div>
              <div className="flex flex-col justify-start lg:flex-row gap-5">
                <div className="grid lg:grid-cols-2 gap-4 w-full">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col md:flex-row lg:items-center">
                      <Select
                        isInvalid={error ? true : false}
                        errorMessage={
                          error && validation.purpay_id
                            ? validation.purpay_id
                            : ""
                        }
                        radius="sm"
                        label="Purpose of Payment"
                        labelPlacement="outside"
                        placeholder="Pilih"
                        selectedKeys={[`${formNoi.purpay_id}`]}
                        variant="bordered"
                        onChange={(event: any) => {
                          setError(false);
                          return setFormNoi({
                            ...formNoi,
                            purpay_id: event.target.value,
                          });
                        }}
                        isRequired
                        classNames={{
                          trigger: "border-1 border-gray-400 h-[40px]",
                          value: "text-default-700",
                          label: "z-0 text-[10px] lg:py-1 py-2",
                        }}
                      >
                        {purpay.map((item: PurpayTypes) => (
                          <SelectItem
                            key={item.purpay_id}
                            value={item.purpay_id}
                          >
                            {item.purpay_name}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                    <div className="flex flex-col  md:flex-row gap-4 lg:items-center">
                      <Input
                        isInvalid={error ? true : false}
                        errorMessage={
                          error && validation.amount ? validation.amount : ""
                        }
                        isDisabled
                        label="Amount"
                        size="sm"
                        variant="underlined"
                        labelPlacement="outside"
                        value={formatRupiah(formNoi.amount.toString())}
                        isRequired
                        classNames={{
                          inputWrapper: "h-[40px]",
                          label: "z-0 text-[10px] lg:py-1 py-2",
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 w-full">
                    <div className="flex flex-col md:flex-row gap-4 lg:items-center">
                      <Select
                        // isInvalid={error ? true : false}
                        // errorMessage={
                        //   error && validation.budget
                        //     ? validation.budget
                        //     : ""
                        // }
                        radius="sm"
                        label="GL Account"
                        labelPlacement="outside"
                        placeholder="Pilih"
                        variant="bordered"
                        selectedKeys={[`${formNoi.get_amount.gl_acc_id}`]}
                        onChange={(event: any) => {
                          handleAmountChange(event.target.value);
                        }}
                        isRequired
                        classNames={{
                          trigger: "border-1 border-gray-400 h-[40px]",
                          value: "text-default-700",
                          label: "z-0 text-[10px] lg:py-1 py-2",
                        }}
                      >
                        {optGlAcc.map((item: GLAccTypes) => (
                          <SelectItem
                            key={item.gl_acc_id}
                            value={item.gl_acc_id}
                          >
                            {item.gl_account}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 lg:items-center">
                      <Select
                        isInvalid={error ? true : false}
                        errorMessage={
                          error && validation.amount_id
                            ? validation.amount_id
                            : ""
                        }
                        radius="sm"
                        label="Budget"
                        labelPlacement="outside"
                        placeholder="Pilih"
                        variant="bordered"
                        selectedKeys={[`${formNoi.amount_id}`]}
                        onChange={(event: any) => {
                          return setFormNoi({
                            ...formNoi,
                            amount_id: event.target.value,
                          });
                        }}
                        isRequired
                        classNames={{
                          trigger: "border-1 border-gray-400 h-[40px]",
                          value: "text-default-700",
                          label: "z-0 text-[10px] lg:py-1 py-2",
                        }}
                      >
                        {amount.map((item: any) => (
                          <SelectItem
                            key={item.amount_id}
                            value={item.amount_id}
                          >
                            {`IDR ${formatWithoutRupiah(item.amount)} / ${
                              item.gl_acc.CcowName
                            } / ${item.year}`}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 w-full">
                    <div className="flex flex-col gap-2 md:flex-col">
                      <label
                        className={`${
                          error === true ? "text-danger-500" : ""
                        } z-0 text-[11px] lg:py-1 py-2`}
                      >
                        Due Date
                        <span className="text-danger-500">*</span>
                      </label>
                      <Datepicker
                        useRange={false}
                        inputClassName={`relative transition-all duration-300 py-3 pl-4 pr-14 w-full ${
                          error === true
                            ? "border-danger-400"
                            : "border-default-400"
                        } border-1 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white focus:ring disabled:opacity-60 disabled:cursor-not-allowed focus:border-default-500 focus:ring-white`}
                        toggleClassName={`absolute right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-75 disabled:cursor-not-allowed`}
                        // @ts-ignore
                        value={date}
                        asSingle={true}
                        onChange={handleDate}
                        primaryColor={"green"}
                        popoverDirection="down"
                      />
                      <span className="text-danger-500 text-[10px]">
                        {error && validation.due_date
                          ? validation.due_date
                          : ""}
                      </span>
                    </div>
                    <div className="flex flex-col  md:flex-row gap-4 lg:items-center lg:mt-6">
                      <Input
                        isInvalid={error ? true : false}
                        errorMessage={
                          error && validation.bank_name
                            ? validation.bank_name
                            : ""
                        }
                        label="Bank Name"
                        labelPlacement="outside"
                        size="sm"
                        placeholder=" "
                        variant="bordered"
                        value={formNoi.bank_name}
                        isRequired
                        onChange={(event: any) => {
                          return setFormNoi({
                            ...formNoi,
                            bank_name: event.target.value,
                          });
                        }}
                        classNames={{
                          inputWrapper: "border-1 border-gray-400 h-[40px]",
                          label: "z-0 text-[10px] lg:py-1 py-2",
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 w-full">
                    <div className="flex flex-col  md:flex-row gap-4 lg:items-center mt-2.5">
                      <Input
                        isInvalid={error ? true : false}
                        errorMessage={
                          error && validation.acc_name
                            ? validation.acc_name
                            : ""
                        }
                        label="Account Name"
                        size="sm"
                        labelPlacement="outside"
                        value={formNoi.acc_name}
                        variant="bordered"
                        placeholder=" "
                        description="mohon dipastikan namanya sesuai dengan buku tabungan / rekening penerima. Penerima pribadi harap melampirkan ID/KTP dan PNS"
                        isRequired
                        onChange={(event: any) => {
                          setError(false);
                          return setFormNoi({
                            ...formNoi,
                            acc_name: event.target.value,
                          });
                        }}
                        classNames={{
                          inputWrapper: "border-1 border-gray-400 h-[40px]",
                          label: "z-0 text-[10px] lg:py-1 py-2",
                        }}
                      />
                    </div>
                    <div className="flex flex-col  md:flex-row gap-4 lg:items-center">
                      <Input
                        isInvalid={error ? true : false}
                        errorMessage={
                          error && validation.account_no
                            ? validation.account_no
                            : ""
                        }
                        label="Account No"
                        labelPlacement="outside"
                        size="sm"
                        variant="bordered"
                        placeholder="0000-0000-0000"
                        value={formNoi.account_no}
                        isRequired
                        onChange={(event: any) => {
                          setError(false);
                          return setFormNoi({
                            ...formNoi,
                            account_no: event.target.value,
                          });
                        }}
                        classNames={{
                          inputWrapper: "border-1 border-gray-400 h-[40px]",
                          label: "z-0 text-[10px] lg:py-1 py-2",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col items-start lg:flex-row justify-between gap-4">
                <div className="flex flex-col md:flex-row w-full gap-4 lg:items-center">
                  <Input
                    isInvalid={error ? true : false}
                    errorMessage={
                      error && validation.email ? validation.email : ""
                    }
                    label="Email Address"
                    labelPlacement="outside"
                    size="sm"
                    variant="bordered"
                    placeholder=" "
                    value={formNoi.email}
                    isRequired
                    description="(Please input 1 email to receive payment notification)"
                    onChange={(event: any) => {
                      setError(false);
                      return setFormNoi({
                        ...formNoi,
                        email: event.target.value,
                      });
                    }}
                    classNames={{
                      inputWrapper: "border-1 border-gray-400 h-[40px]",
                      label: "z-0 text-[10px] lg:py-1 py-2",
                    }}
                  />
                </div>
                <div className="flex flex-col md:flex-row w-full gap-4 lg:items-center">
                  <Textarea
                    isInvalid={error ? true : false}
                    errorMessage={
                      error && validation.provider ? validation.provider : ""
                    }
                    label="Beneficiary / Provider"
                    labelPlacement="outside"
                    size="sm"
                    variant="bordered"
                    value={formNoi.provider}
                    isRequired
                    onChange={(event: any) => {
                      setError(false);
                      return setFormNoi({
                        ...formNoi,
                        provider: event.target.value,
                      });
                    }}
                    classNames={{
                      inputWrapper: "border-1 border-gray-400",
                      input: "w-[100%] resize-y min-h-[40px]",
                      label: "z-0 text-[10px] lg:py-1 py-2",
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 lg:items-center">
                <Textarea
                  isInvalid={error ? true : false}
                  errorMessage={
                    error && validation.other_info ? validation.other_info : ""
                  }
                  label="Other Info (if any)"
                  labelPlacement="outside"
                  size="sm"
                  variant="bordered"
                  value={formNoi.other_info}
                  isRequired
                  onChange={(event: any) => {
                    setError(false);
                    return setFormNoi({
                      ...formNoi,
                      other_info: event.target.value,
                    });
                  }}
                  classNames={{
                    inputWrapper: "border-1 border-gray-400",
                    input: "w-[100%] resize-y min-h-[40px]",
                    label: "z-0 text-[10px] lg:py-1 py-2",
                  }}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4 lg:items-center">
                <Textarea
                  isInvalid={error ? true : false}
                  errorMessage={error && validation.desc ? validation.desc : ""}
                  label="Description"
                  labelPlacement="outside"
                  size="sm"
                  variant="bordered"
                    value={formNoi.desc}
                  isRequired
                  onChange={(event: any) => {
                    setError(false);
                    return setFormNoi({
                      ...formNoi,
                      desc: event.target.value,
                    });
                  }}
                  classNames={{
                    inputWrapper: "border-1 border-gray-400",
                    input: "w-[100%] resize-y min-h-[40px]",
                    label: "z-0 text-[10px] lg:py-1 py-2",
                  }}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4 lg:items-center">
                <Textarea
                  isInvalid={error ? true : false}
                  errorMessage={
                    error && validation.explanation
                      ? validation.explanation
                      : ""
                  }
                  label="Explanation/ justification"
                  labelPlacement="outside"
                  size="sm"
                  variant="bordered"
                    value={formNoi.explanation}
                  isRequired
                  onChange={(event: any) => {
                    setError(false);
                    return setFormNoi({
                      ...formNoi,
                      explanation: event.target.value,
                    });
                  }}
                  classNames={{
                    inputWrapper: "border-1 border-gray-400",
                    input: "w-[100%] resize-y min-h-[40px]",
                    label: "z-0 text-[10px] lg:py-1 py-2",
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
                    setFormNoi(initialState);
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

export default FormNop;
