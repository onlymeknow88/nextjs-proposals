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
    other_info: "",
    desc: "",
    explanation: "",
  };

  const [formNoi, setFormNoi] = useState<FormNoiStateTypes>(initialState);

  // const [formNoi, setFormNoi] = useState([
  //   { glAccount: "", desc: "", amount: 0, costOrProjectID: "" },
  // ]);

  // const handleAddInput = useCallback(() => {
  //   setFormNoi([
  //     ...formNoi,
  //     { glAccount: "", desc: "", amount: 0, costOrProjectID: "" },
  //   ]);
  // }, [formNoi]);

  // const handleAmountChange = (index: number, value: any) => {
  //   const numericValue = parseFloat(value.replace(/[^\d]/g, "")) || 0;
  //   const newFormNoi = [...formNoi];
  //   newFormNoi[index].amount = numericValue;
  //   setFormNoi(newFormNoi);
  // };

  // const handleDeleteInput = (index: any) => {
  //   const newArray = [...formNoi];
  //   newArray.splice(index, 1);
  //   setFormNoi(newArray);
  // };

  // const getTotalAmount = useCallback(() => {
  //   let total = 0;
  //   formNoi.forEach((item) => {
  //     total += item.amount;
  //   });

  //   return formatWithoutRupiah(total);
  // }, [formNoi]);

  //date range
  const [value, setValue] = useState();

  //@ts-ignore
  const handleDate = (newValue) => {
    setValue(newValue);
  };

  const [optGlAcc, setOptGlAcc] = useState<any>([]);

  const fetchSelect2GlAcc = useCallback(async () => {
    const res = await getSelect2GlAcc(tokens);
    const data = await res.data.result;
    setOptGlAcc(data);
  }, [tokens]);

  const [purpay, setPurpay] = useState<any>([]);

  const fetchSelect2Purpay = useCallback(async () => {
    const res = await getSelect2Purpay(tokens);
    const data = await res.data.result;
    setPurpay(data);
  }, [tokens]);

  const [amount, setAmount] = useState<any>([]);

  // const fetchSelect2Amount = useCallback(async () => {
  //   const res = await getSelect2Amount(tokens);
  //   const data = await res.data.result;
  //   setAmount(data);
  // }, [tokens]);

  const handleAmountChange = useCallback(
    async (event: any) => {
      if (!event) {
        return setAmount([]);
      }
      const res = await getSelect2Amount(tokens, event);
      const data = await res.data.result;
      console.log(res.data.result);
      setAmount(data);
    },
    [tokens]
  );

  const bottomContent = useMemo(() => {
    return (
      <div className="w-full flex flex-col gap-4">
        {/* <Button
          size="md"
          radius="sm"
          variant="solid"
          color="secondary"
          className="text-white lg:text-sm text-lg h-[50px] lg:h-[34px] w-full lg:w-[10rem]"
          onClick={() => handleAddInput()}
        >
          Add Column
        </Button> */}
        <div className="flex flex-col lg:flex-col gap-2 justify-start">
          <span className="text-lg">Explanation / justification:</span>
          <TextArea
            size="sm"
            variant="bordered"
            // value={proposals.perm_bantuan}
            isRequired
            onChange={(event: any) => {
              // setError(false);
              // return setProposal({
              //   ...proposal,
              //   nama: event.target.value,
              // });
            }}
            classNames={{
              inputWrapper: "border-1 border-gray-400 w-full",
              input: "w-[100%] resize-y min-h-[40px]",
            }}
          />
        </div>
        {/* <div className="flex flex-row bg-black text-white p-4 rounded-lg lg:rounded-xl">
          <div className="flex flex-row w-full gap-5">
            <span className="text-md w-[10rem] lg:w-[40rem] text-right">Total</span>
            <span className="text-md w-[4rem] lg:w-[15rem] text-right">IDR</span>
            <span className="text-md w-full Lg:w-[20rem]">
              {getTotalAmount()}
            </span>
          </div>
        </div> */}
      </div>
    );
  }, []);

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
                {/* <div className="">
                  <Button
                    // size="lg"
                    onClick={onClose}
                    className="rounded-full bg-transparent"
                    isIconOnly
                  >
                    <Closed />
                  </Button>
                </div> */}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col justify-start lg:flex-row gap-5">
                  <div className="grid lg:grid-cols-2 gap-4 w-full">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex flex-col md:flex-row lg:items-center">
                        <Select
                          // isInvalid={error ? true : false}
                          // errorMessage={
                          //   error && validation.budget
                          //     ? validation.budget
                          //     : ""
                          // }
                          radius="sm"
                          label="Purpose of Payment"
                          labelPlacement="outside"
                          placeholder="Pilih"
                          variant="bordered"
                          onChange={(event: any) => {}}
                          isRequired
                          classNames={{
                            trigger: "border-1 border-gray-400 h-[40px]",
                            value: "text-default-700",
                            label: "z-0 text-[10px]",
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
                          // isInvalid={error ? true : false}
                          // errorMessage={error && validation.nama ? validation.nama : ""}
                          isDisabled
                          label="Amount"
                          size="sm"
                          variant="underlined"
                          labelPlacement="outside"
                          value={formatRupiah(
                            proposals.jumlah_bantuan.toString()
                          )}
                          isRequired
                          // onChange={(event: any) => {
                          //   const numericValue =
                          //     parseFloat(
                          //       event.target.value.replace(/[^\d]/g, "")
                          //     ) || 0;

                          //   // setAmount(numericValue);

                          //   // setError(false);
                          //   // return setProposal({
                          //   //   ...proposal,
                          //   //   nama: event.target.value,
                          //   // });
                          // }}
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
                          // isInvalid={error ? true : false}
                          // errorMessage={
                          //   error && validation.budget
                          //     ? validation.budget
                          //     : ""
                          // }
                          radius="sm"
                          label="Budget"
                          labelPlacement="outside"
                          placeholder="Pilih"
                          // defaultItems={amount}
                          variant="bordered"
                          // selectedKey={`${formNoi.amount}`}
                          onSelectionChange={(event: any) => {
                            console.log(event);
                            return setFormNoi({
                              ...formNoi,
                              amount: event,
                            });
                          }}
                          isRequired
                          classNames={{
                            trigger: "border-1 border-gray-400 h-[40px]",
                            value: "text-default-700",
                            label: "z-0 text-[10px] text-gray-50",
                          }}
                        >
                          {amount.map((item: any) => (
                            <SelectItem key={item.amount_id} value={item.amount_id}>
                              {`IDR ${formatWithoutRupiah(item.amount)} / ${
                                item.glacc.CcowName
                              } / ${item.year}`}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 w-full">
                      <div className="flex flex-col gap-2 md:flex-col">
                        <label
                          className="text-[10px]"
                          // className={`${
                          //   error === true ? "text-red-500" : ""
                          // } text-sm md:w-[25rem] lg:w-[25rem] font-medium`}
                        >
                          Due Date
                          <span className="text-red-500">*</span>
                        </label>
                        <Datepicker
                          useRange={false}
                          inputClassName={`relative transition-all duration-300 py-3 pl-4 pr-14 w-full border-default-400 border-1 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white focus:ring disabled:opacity-60 disabled:cursor-not-allowed focus:border-default-500 focus:ring-white`}
                          toggleClassName={`absolute right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-75 disabled:cursor-not-allowed`}
                          // @ts-ignore
                          value={value}
                          asSingle={true}
                          onChange={handleDate}
                          primaryColor={"green"}
                          popoverDirection="down"
                        />
                      </div>
                      <div className="flex flex-col  md:flex-row gap-4 lg:items-center">
                        <Input
                          // isInvalid={error ? true : false}
                          // errorMessage={error && validation.nama ? validation.nama : ""}
                          label="Bank Name"
                          labelPlacement="outside"
                          size="sm"
                          placeholder=" "
                          variant="bordered"
                          // value={proposal.nama}
                          isRequired
                          onChange={(event: any) => {
                            // setError(false);
                            // return setProposal({
                            //   ...proposal,
                            //   nama: event.target.value,
                            // });
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
                          // isInvalid={error ? true : false}
                          // errorMessage={error && validation.nama ? validation.nama : ""}
                          label="Account Name"
                          size="sm"
                          labelPlacement="outside"
                          variant="bordered"
                          placeholder=" "
                          value={proposals.pengirim}
                          isRequired
                          onChange={(event: any) => {
                            // setError(false);
                            // return setProposal({
                            //   ...proposal,
                            //   nama: event.target.value,
                            // });
                          }}
                          classNames={{
                            inputWrapper: "border-1 border-gray-400 h-[40px]",
                            label: "z-0",
                          }}
                        />
                      </div>
                      <div className="flex flex-col  md:flex-row gap-4 lg:items-center">
                        <Input
                          // isInvalid={error ? true : false}
                          // errorMessage={error && validation.nama ? validation.nama : ""}
                          label="Account No"
                          labelPlacement="outside"
                          size="sm"
                          variant="bordered"
                          placeholder="0000-0000-0000"
                          // value={proposal.nama}
                          isRequired
                          onChange={(event: any) => {
                            // setError(false);
                            // return setProposal({
                            //   ...proposal,
                            //   nama: event.target.value,
                            // });
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
                      // isInvalid={error ? true : false}
                      // errorMessage={error && validation.nama ? validation.nama : ""}
                      label="Email Address"
                      labelPlacement="outside"
                      size="sm"
                      variant="bordered"
                      placeholder=" "
                      // value={proposal.nama}
                      isRequired
                      description="(Please input 1 email to receive payment notification)"
                      onChange={(event: any) => {
                        // setError(false);
                        // return setProposal({
                        //   ...proposal,
                        //   nama: event.target.value,
                        // });
                      }}
                      classNames={{
                        inputWrapper: "border-1 border-gray-400 h-[40px]",
                        label: "z-0",
                      }}
                    />
                  </div>
                  <div className="flex flex-col md:flex-row w-full gap-4 lg:items-center">
                    <Textarea
                      // isInvalid={error ? true : false}
                      // errorMessage={error && validation.nama ? validation.nama : ""}
                      label="Beneficiary / Provider"
                      labelPlacement="outside"
                      size="sm"
                      variant="bordered"
                      // value={proposal.nama}
                      isRequired
                      onChange={(event: any) => {
                        // setError(false);
                        // return setProposal({
                        //   ...proposal,
                        //   nama: event.target.value,
                        // });
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
                    label="Other Info (if any)"
                    labelPlacement="outside"
                    size="sm"
                    variant="bordered"
                    value={proposals.perm_bantuan}
                    isRequired
                    onChange={(event: any) => {
                      // setError(false);
                      // return setProposal({
                      //   ...proposal,
                      //   nama: event.target.value,
                      // });
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
                    label="Explanation/ justification"
                    labelPlacement="outside"
                    size="sm"
                    variant="bordered"
                    // value={proposals.perm_bantuan}
                    isRequired
                    onChange={(event: any) => {
                      // setError(false);
                      // return setProposal({
                      //   ...proposal,
                      //   nama: event.target.value,
                      // });
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
                <Button
                  color="primary"
                  radius="sm"
                  className="lg:text-sm text-lg h-[50px] lg:h-[34px] md:h-[34px] md:text-sm"
                >
                  Create Form NOP
                </Button>
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
