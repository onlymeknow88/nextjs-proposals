import { CKEditor } from "@/components/atoms/CKEditor";
import { internalMemoPDF } from "@/services/proposal";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import React, { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import axios from "axios";
import { getFormNopByPropId } from "@/services/form-nop";
import Datepicker from "react-tailwindcss-datepicker";
import { ButtonSubmit } from "@/components/molecules/ButtonSubmit";

interface FormUseInternalTypes {
  ass_proposal: string;
  from: string;
  to: string;
  date: string;
  judul: string;
}

const FormUseInternal = (props: any) => {
  const { proposals, tokens } = props;
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const initialState = {
    ass_proposal: "",
    from: "",
    to: "",
    date: "",
    judul: "",
  };

  const [validation, setValidation] =
    useState<FormUseInternalTypes>(initialState);
  const [error, setError] = useState(false);

  const [internalMemo, setInternalMemo] =
    useState<FormUseInternalTypes>(initialState);

  //date range
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  //@ts-ignore
  const handleDate = (newValue) => {
    setValue(newValue);

    setInternalMemo({
      ...internalMemo,
      date: newValue.startDate,
    });
  };

  const handleClick = useCallback(async () => {
    try {
      const data = {
        ass_proposal: internalMemo.ass_proposal || proposals.ass_proposal,
        to: internalMemo.to,
        from: internalMemo.from,
        date: internalMemo.date,
        judul: internalMemo.judul,
      };

      const res = await internalMemoPDF(data);
      const base64EncodedPdf = res.data.pdf;
      const filename = res.data.filename;

      const pdfBlob = new Blob([Buffer.from(base64EncodedPdf, "base64")], {
        type: "application/pdf",
      });

      // Create a link to trigger the download
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(pdfBlob);
      downloadLink.target = "_blank"; // Open the link in a new tab
      downloadLink.download = filename; // Use the filename from the response

      // download
      downloadLink.click();

      onClose();
    } catch (error) {
      console.error("Error handling PDF download:", error);
    }
  }, [internalMemo, proposals, onClose]);

  const [isPosition, setIsPosition] = useState(false);

  return (
    <>
      <Button
        onPress={onOpen}
        variant="solid"
        size="sm"
        color="success"
        className={`text-lg h-[40px] lg:h-[34px] lg:text-sm text-white md:h-[34px] md:text-sm `}
      >
        Form Internal Memo
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
                Internal Memo
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
                <div className="flex flex-col  md:flex-row gap-4 lg:items-center">
                  <Input
                    //   isInvalid={error ? true : false}
                    //   errorMessage={
                    //     error && validation.amount ? validation.amount : ""
                    //   }
                    label="To"
                    placeholder=" "
                    size="sm"
                    variant="bordered"
                    labelPlacement="outside"
                    isRequired
                    onChange={(event: any) => {
                      // setError(false);
                      return setInternalMemo({
                        ...internalMemo,
                        to: event.target.value,
                      });
                    }}
                    classNames={{
                      inputWrapper: "border-1 border-gray-400 h-[40px]",
                      label: "z-0 text-sm lg:text-[10px]",
                    }}
                  />
                </div>
                <div className="flex flex-col  md:flex-row gap-4 lg:items-center">
                  <Input
                    //   isInvalid={error ? true : false}
                    //   errorMessage={
                    //     error && validation.amount ? validation.amount : ""
                    //   }
                    label="From"
                    placeholder=" "
                    size="sm"
                    variant="bordered"
                    labelPlacement="outside"
                    isRequired
                    onChange={(event: any) => {
                      // setError(false);
                      return setInternalMemo({
                        ...internalMemo,
                        from: event.target.value,
                      });
                    }}
                    classNames={{
                      inputWrapper: "border-1 border-gray-400 h-[40px]",
                      label: "z-0 text-sm lg:text-[10px]",
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2 md:flex-col">
                  <label
                    className={`${
                      error === true ? "text-danger-500" : ""
                    } lg:text-[10px] text-sm`}
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
                    value={value}
                    asSingle={true}
                    onChange={handleDate}
                    primaryColor={"green"}
                    popoverDirection="down"
                  />
                  {/* <span className="text-danger-500 text-[10px]">{ error && validation.due_date
                              ? validation.due_date
                              : ""}</span> */}
                </div>
                <div className="flex flex-col md:flex-row w-full gap-4 lg:items-center">
                  <Textarea
                    //   isInvalid={error ? true : false}
                    //   errorMessage={
                    //     error && validation.provider ? validation.provider : ""
                    //   }
                    label="Perihal"
                    labelPlacement="outside"
                    size="sm"
                    variant="bordered"
                    isRequired
                    onChange={(event: any) => {
                      // setError(false);
                      return setInternalMemo({
                        ...internalMemo,
                        judul: event.target.value,
                      });
                    }}
                    classNames={{
                      inputWrapper: "border-1 border-gray-400",
                      input: "w-[100%] resize-y min-h-[40px]",
                      label: "z-0 text-sm lg:text-[10px]",
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <CKEditor
                    label="Body"
                    name="body internal memo"
                    value={proposals.ass_proposal}
                    // @ts-ignore
                    onChange={(event) => {
                      return setInternalMemo({
                        ...internalMemo,
                        ass_proposal: event,
                      });
                    }}
                  >
                    {error && (
                      <span className="text-tiny text-danger-500">
                        {validation.ass_proposal}
                      </span>
                    )}
                  </CKEditor>
                </div>
              </ModalBody>
              <ModalFooter className="flex lg:flex-row flex-col justify-start md:flex-row">
                <ButtonSubmit onSubmit={handleClick} />
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

export default FormUseInternal;
