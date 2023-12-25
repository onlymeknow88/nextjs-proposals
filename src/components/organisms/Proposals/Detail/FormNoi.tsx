import { DatepickerComponent } from "@/components/atoms/Datepicker";
import { InputComponent } from "@/components/atoms/Input";
import { TextArea } from "@/components/atoms/TextArea";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Plus from "@/components/organisms/Icons/Button/plus";
import { formatRupiah, formatWithoutRupiah } from "@/helpers/util";
import { Closed } from "../../Icons/Button/close";
import Datepicker from "react-tailwindcss-datepicker";
import { SelectComponent } from "@/components/atoms/Select";
import { getSelect2GlAcc } from "@/services/gl-acc";
import { AmountTypes, GLAccTypes, PurpayTypes } from "@/services/data-types";
import { getSelect2Purpay } from "@/services/purpay";
import { getSelect2Amount } from "@/services/amount";
import { storeFormNop } from "@/services/form-nop";
import { ButtonSubmit } from "@/components/molecules/ButtonSubmit";

interface FormNoiStateTypes {
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
}

const FormNoi = (props: any) => {
  const { proposals, tokens } = props;
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const initialState = {
    nop_name: "",
    purpay_id: "",
    acc_name: "",
    provider: "",
    bank_name: "",
    amount: "",
    account_no: "",
    due_date: "",
    email: "",
    other_info: proposals.perm_bantuan,
    desc: "",
    explanation: "",
    amount_id: "",
  };

  const [formNoi, setFormNoi] = useState<FormNoiStateTypes>(initialState);

  const [validation, setValidation] = useState<FormNoiStateTypes>(initialState);
  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  //date range
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  //@ts-ignore
  const handleDate = (newValue) => {
    setValue(newValue);

    setFormNoi({
      ...formNoi,
      due_date: newValue.startDate,
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

  const handleAmountChange = useCallback(
    async (event: any) => {
      setIsLoading(true);
      if (!event) {
        return setAmount([]);
      }
      const res = await getSelect2Amount(tokens, event);
      const data = await res.data.result;
      setAmount(data);

      setFormNoi({
        ...formNoi,
        amount: amount.amount_id,
      });

      setIsLoading(false);
    },
    [tokens, formNoi, amount]
  );

  const handleSubmit = useCallback(async () => {
    const data = new FormData();
    data.append("nop_name", formNoi.nop_name);
    data.append("purpay_id", formNoi.purpay_id);
    data.append("acc_name", formNoi.acc_name);
    data.append("provider", formNoi.provider);
    data.append("bank_name", formNoi.bank_name);
    data.append("amount", proposals.jumlah_bantuan);
    data.append("amount_id", formNoi.amount_id);
    data.append("account_no", formNoi.account_no);
    data.append("due_date", formNoi.due_date);
    data.append("email", formNoi.email);
    data.append("other_info", formNoi.other_info);
    data.append("desc", formNoi.desc);
    data.append("explanation", formNoi.explanation);
    data.append("nope_name", formNoi.nop_name);

    const res = await storeFormNop(data, tokens);

    switch (res.error) {
      case true:
        setValidation(res.data);
        setError(true);
        break;
      case false:
        setError(false);
        onClose();
        break;
      default:
        break;
    }
  }, [formNoi, proposals, tokens, onClose]);

  useEffect(() => {
    fetchSelect2GlAcc();
    fetchSelect2Purpay();
    // fetchSelect2Amount();
  }, [fetchSelect2Purpay, fetchSelect2GlAcc]);

  return (
    <>
      <Button
        onPress={onOpen}
        variant="solid"
        size="sm"
        color="success"
        className="text-lg h-[40px] lg:h-[34px] lg:text-sm text-white md:h-[34px] md:text-sm"
      >
        Form NOI
      </Button>
      <Modal
        size="5xl"
        scrollBehavior="outside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        backdrop="blur"
        placement="bottom-center"
        // hideCloseButton
        classNames={{
          closeButton: "text-2xl",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-between items-center">
                FORM NOI
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col md:flex-row gap-4 lg:items-center">
                  <Input
                  isInvalid={error ? true : false}
                  errorMessage={
                    error && validation.nop_name
                      ? validation.nop_name
                      : ""
                  }
                    label="Non Order Payment Name"
                    labelPlacement="outside"
                    size="sm"
                    variant="bordered"
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
                      label: "z-0",
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
                          variant="bordered"
                          onChange={(event: any) => {
                            return setFormNoi({
                              ...formNoi,
                              purpay_id: event.target.value,
                            });
                          }}
                          isRequired
                          classNames={{
                            trigger: "border-1 border-gray-400 h-[40px]",
                            value: "text-default-700",
                            label: "z-0 text-[10px] py-2",
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
                          value={formatRupiah(
                            proposals.jumlah_bantuan.toString()
                          )}
                          isRequired
                          classNames={{
                            inputWrapper: "h-[40px]",
                            label: "z-0 text-[10px] !text-black",
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
                          onChange={(event: any) => {
                            handleAmountChange(event.target.value);
                          }}
                          isRequired
                          classNames={{
                            trigger: "border-1 border-gray-400 h-[40px]",
                            value: "text-default-700",
                            label: "z-0 text-[10px]",
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
                            label: "z-0 text-[10px] py-2",
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
                          } text-[10px]`}
                        >
                          Due Date
                          <span className="text-red-500">*</span>
                        </label>
                        <Datepicker
                          useRange={false}
                          inputClassName={`relative transition-all duration-300 py-3 pl-4 pr-14 w-full ${error === true ? "border-danger-400" : "border-default-400"} border-1 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white focus:ring disabled:opacity-60 disabled:cursor-not-allowed focus:border-default-500 focus:ring-white`}
                          toggleClassName={`absolute right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-75 disabled:cursor-not-allowed`}
                          // @ts-ignore
                          value={value}
                          asSingle={true}
                          onChange={handleDate}
                          primaryColor={"green"}
                          popoverDirection="down"
                        />
                        <span className="text-danger-500 text-[10px]">{ error && validation.due_date
                              ? validation.due_date
                              : ""}</span>
                      </div>
                      <div className="flex flex-col  md:flex-row gap-4 lg:items-center">
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
                          // value={proposal.nama}
                          isRequired
                          onChange={(event: any) => {
                            return setFormNoi({
                              ...formNoi,
                              bank_name: event.target.value,
                            });
                          }}
                          classNames={{
                            inputWrapper: "border-1 border-gray-400 h-[40px]",
                            label: "z-0",
                          }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 w-full">
                      <div className="flex flex-col  md:flex-row gap-4 lg:items-center">
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
                          variant="bordered"
                          placeholder=" "
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
                            label: "z-0",
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
                          // value={proposal.nama}
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
                            label: "z-0",
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
                      // value={proposal.nama}
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
                        label: "z-0",
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
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 lg:items-center">
                  <Textarea
                    isInvalid={error ? true : false}
                    errorMessage={
                      error && validation.other_info
                        ? validation.other_info
                        : ""
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
                      label: "z-0",
                    }}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-4 lg:items-center">
                  <Textarea
                    isInvalid={error ? true : false}
                    errorMessage={
                      error && validation.desc ? validation.desc : ""
                    }
                    label="Description"
                    labelPlacement="outside"
                    size="sm"
                    variant="bordered"
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
                      label: "z-0",
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
                    // value={proposals.perm_bantuan}
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
                      label: "z-0",
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter className="flex lg:flex-row flex-col justify-start md:flex-row">
                <ButtonSubmit onSubmit={handleSubmit} />
                <Button
                  color="default"
                  variant="light"
                  onPress={onClose}
                  radius="sm"
                  className="lg:text-sm text-lg h-[50px] lg:h-[34px] md:h-[34px] md:text-sm bg-default-100"
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default FormNoi;
