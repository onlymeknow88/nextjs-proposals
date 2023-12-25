import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Link,
  Card,
  CardBody,
  AutocompleteItem,
  SelectItem,
  Input,
  Checkbox,
} from "@nextui-org/react";
import { ArrowLeft } from "@/components/organisms/Icons/Button/arrowLeft";
import {
  AreasTypes,
  BudgetsTypes,
  CcowsTypes,
  ProposalTypes,
  UserTypes,
} from "@/services/data-types";
import {
  areaOptions,
  checkDokumen,
  skalaPrioritasSelect,
} from "@/services/proposal";
import { SelectOptionUsulan } from "./SelectOptionUsulan";
import { useRouter } from "next/router";
import { InputComponent } from "@/components/atoms/Input";
import { Select2 } from "@/components/atoms/Select2";
import { TextArea } from "@/components/atoms/TextArea";
import { SelectComponent } from "@/components/atoms/Select";
import { CKEditor } from "@/components/atoms/CKEditor";
import { ButtonReturn } from "./ButtonReturn";
import { ButtonApproved } from "./ButtonApproved";
import { ButtonRejected } from "./ButtonRejected";
import FormNoi from "./FormNoi";
import { getSelect2Budget } from "@/services/budget";
import { getSelect2Ccow } from "@/services/ccow";
import { getSelect2Area } from "@/services/area";
import NextLink from "next/link";
import { getFormNopByPropId } from "@/services/form-nop";
import FormUseInternal from "./FormUseInternal";

interface ProposalStateTypes {
  emp_name: string;
  judul: string;
  pengirim: string;
  perm_bantuan: string;
  skala_prioritas: string;
  jumlah_bantuan: string;
  ass_proposal: string;
  start_date: string;
  receive_date: string;
  prop_no: string;
  jenis_bantuan: string;
  area: string;
  budget: string;
  upload_file: any;
  has_file: any;
  ccow_id: string;
  checklist_dokumen: any;
  sts_appr_deptHead: any;
  sts_appr_divHead: any;
  sts_appr_director: any;
}

interface ProposalProps {
  proposalBase64: ProposalTypes;
  users: UserTypes;
  tokens: string;
}

export const DetailsProposal = (props: ProposalProps) => {
  const { proposalBase64, users, tokens } = props;

  const proposals = JSON.parse(atob(proposalBase64.toString()));

  const [proposal, setProposal] = useState<ProposalStateTypes>({
    emp_name: proposals.emp_name,
    ccow_id: proposals.budget.ccow_id,
    judul: proposals.judul,
    pengirim: proposals.pengirim,
    perm_bantuan: proposals.perm_bantuan,
    skala_prioritas: proposals.skala_prioritas,
    area: proposals.area.area_id,
    budget: proposals.budget_id,
    jenis_bantuan: proposals.jenis_bantuan,
    jumlah_bantuan: proposals.jumlah_bantuan,
    ass_proposal: proposals.ass_proposal,
    start_date: proposals.start_date,
    receive_date: proposals.receive_date,
    prop_no: proposals.prop_no,
    upload_file: proposals.has_file,
    has_file: proposals.has_file,
    checklist_dokumen: proposals.checklist_dokumen,
    sts_appr_deptHead: proposals.sts_appr_deptHead,
    sts_appr_divHead: proposals.sts_appr_divHead,
    sts_appr_director: proposals.sts_appr_director,
  });

  const router = useRouter();

  const [validation, setValidation] = useState<ProposalStateTypes>({
    emp_name: "",
    ccow_id: "",
    judul: "",
    pengirim: "",
    perm_bantuan: "",
    skala_prioritas: "",
    area: "",
    budget: "",
    jenis_bantuan: "",
    jumlah_bantuan: "",
    ass_proposal: "",
    start_date: "",
    receive_date: "",
    prop_no: "",
    upload_file: [],
    has_file: [],
    checklist_dokumen: [],
    sts_appr_deptHead: "",
    sts_appr_divHead: "",
    sts_appr_director: "",
  });
  const [error, setError] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const handleInputValueJmlDana = (option: any) => {
    setProposal({
      ...proposal,
      jumlah_bantuan: option.value, // Update the field you want in the data state
    });
  };

  const checklist_dokumen = proposals.checklist_dokumen ?? [];

  const [checkedState, setCheckedState] = useState(
    checkDokumen.reduce((obj, item) => {
      //@ts-ignore
      obj[item.uid] = checklist_dokumen.includes(item.uid);
      return obj;
    }, {})
  );

  const handleCheck = (uid: any) => {
    // Toggle the checked state for the given uid
    //@ts-ignore
    const updatedCheckedState = { ...checkedState, [uid]: !checkedState[uid] };

    setCheckedState(updatedCheckedState);

    // Get the uids of the checked items
    const checkedUids = Object.entries(updatedCheckedState)
      .filter(([key, value]) => value)
      .map(([key, value]) => key);

    // Convert the array of uids to a string
    const checkItems = checkedUids.join(", ");

    console.log(checkItems);

    setProposal({
      ...proposal,
      checklist_dokumen: checkItems,
    });
  };

  const [optArea, setOptArea] = useState<any>([]);

  const fetchSelect2Area = useCallback(async () => {
    setisLoading(true);
    const res = await getSelect2Area(tokens);
    const data = await res.data.result;
    setOptArea(data);
    setisLoading(false);
  }, [tokens]);

  const [optCcow, setOptCcow] = useState([]);

  const fetchSelect2Ccow = useCallback(async () => {
    setisLoading(true);
    const res = await getSelect2Ccow(tokens);
    const data = await res.data.result;
    setOptCcow(data);
    setisLoading(false);
  }, [tokens]);

  const [optBudget, setOptBudget] = useState([]);

  const fetchSelect2Budget = useCallback(async () => {
    setisLoading(true);
    const res = await getSelect2Budget(tokens, "");
    const data = await res.data.result;
    setOptBudget(data);
    setisLoading(false);
  }, [tokens]);

  const handleCcowSelect = async (event: any) => {
    setisLoading(true);
    if (!event) {
      const res = await getSelect2Ccow(tokens);
      const data = await res.data.result;
      setOptCcow(data);

      return setOptBudget([]);
    }

    const res = await getSelect2Budget(tokens, event);
    const data = await res.data.result;
    setOptBudget(data);
    setisLoading(false);
  };

  

  useEffect(() => {
    fetchSelect2Area();
    fetchSelect2Budget();
    fetchSelect2Ccow();
  }, [fetchSelect2Ccow, fetchSelect2Budget, fetchSelect2Area]);

  return (
    <>
      {" "}
      <div className="flex flex-col lg:flex-row justify-between gap-3 lg:items-end">
        <Button
          className="text-lg h-[40px] w-[100px] lg:w-[90px] lg:h-[34px] lg:text-sm bg-default-200 md:h-[34px] md:text-sm"
          size="sm"
          href={"/proposal"}
          as={NextLink}
          startContent={<ArrowLeft className="h-6 stroke-default-500" />}
        >
          Back
        </Button>

        <div className={`flex flex-row gap-4`}>
          <FormNoi proposals={proposal} tokens={tokens} />
          <FormUseInternal proposals={proposal} />
        </div>
      </div>
      <div className="max-w-[90rem]">
        <form action="">
          <Card shadow="sm" className="max-w-[90rem] lg:w-full">
            <CardBody className="p-4 md:p-6 lg:p-8 gap-4">
              <div className="flex flex-col md:w-full lg:w-[550px] md:flex-row gap-4">
                <InputComponent
                  isRequiredLabel="true"
                  label="Tanggal Pengajuan"
                  isReadOnly
                  size="sm"
                  variant="bordered"
                  type="date"
                  value={proposal.start_date}
                  classNames={{
                    inputWrapper: "border-1 border-gray-400 h-[38px]",
                  }}
                />
              </div>
              <div className="flex flex-col md:w-full lg:w-[550px] md:flex-row gap-4">
                <Select2
                  label="CCOW"
                  variant="flat"
                  isDisabled
                  size="sm"
                  hideSelectedIcon
                  defaultItems={optCcow}
                  selectedKey={`${proposal.ccow_id}`}
                  handleSelectionChange={(event: any) => {
                    handleCcowSelect(event);
                    setError(false);
                    return setProposal({
                      ...proposal,
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
                <SelectComponent
                  label="Budget Bantuan"
                  isRequiredLabel="true"
                  isInvalid={error ? true : false}
                  errorMessage={
                    error && validation.budget ? validation.budget : ""
                  }
                  radius="sm"
                  isDisabled
                  variant="flat"
                  selectedKeys={[`${proposal.budget}`]}
                  onChange={(event: any) => {
                    return setProposal({
                      ...proposal,
                      budget: event.target.value,
                    });
                  }}
                  isRequired
                  classNames={{
                    trigger: "border-1 border-gray-400 h-[40px] lg:w-full",
                    value: "text-default-700",
                  }}
                >
                  {optBudget.map((item: BudgetsTypes) => (
                    <SelectItem key={item.budget_id} value={item.budget_id}>
                      {item.budget_name}
                    </SelectItem>
                  ))}
                  <SelectItem key="other">Other</SelectItem>
                </SelectComponent>
              </div>
              <div className="flex flex-col w-[300px] md:w-full lg:w-[550px] md:flex-row gap-4">
                <SelectComponent
                  label="Area"
                  isRequiredLabel="true"
                  isInvalid={error ? true : false}
                  errorMessage={error && validation.area ? validation.area : ""}
                  placeholder="Pilih"
                  radius="sm"
                  variant="flat"
                  isRequired
                  isDisabled
                  selectedKeys={[`${proposal.area}`]}
                  onChange={(event: any) => {
                    setError(false);
                    return setProposal({
                      ...proposal,
                      area: event.target.value,
                    });
                  }}
                  classNames={{
                    trigger: "border-1 border-gray-400 h-[38px] ",
                    value: "text-default-700",
                  }}
                >
                  {optArea.map((item: AreasTypes) => (
                    <SelectItem key={item.area_id} value={item.area_id}>
                      {item.area_name}
                    </SelectItem>
                  ))}
                </SelectComponent>
              </div>
              {proposal.area === "other" && (
                <div className="flex flex-col w-[300px] lg:w-[550px] md:flex-row gap-4">
                  <div className="w-[25rem]"></div>
                  <Input
                    variant="bordered"
                    placeholder="Area"
                    isRequired
                    size="sm"
                    onChange={(event: any) => {
                      // setError(false);
                      // return setProposal({
                      //   ...proposal,
                      //   pengirim_proposal: event.target.value,
                      // });
                    }}
                    //   value={proposal.pengirim_proposal}
                    classNames={{
                      inputWrapper: "border-1 border-gray-400 h-[38px]",
                    }}
                  />
                </div>
              )}

              <div className="flex flex-col lg:w-[550px] md:flex-row gap-4">
                <InputComponent
                  isRequiredLabel="true"
                  label="Nama Karyawan"
                  isReadOnly
                  size="sm"
                  variant="bordered"
                  value={proposal.emp_name}
                  classNames={{
                    inputWrapper: "border-1 border-gray-400 h-[38px]",
                  }}
                />
              </div>
              <div className="flex lg:w-[550px] flex-col md:flex-row  gap-4">
                <TextArea
                  label="Judul Proposal"
                  isRequiredLabel="true"
                  isInvalid={error ? true : false}
                  // errorMessage={
                  //   error && validation.judul
                  //     ? validation.judul
                  //     : ""
                  // }
                  value={proposal.judul}
                  isReadOnly
                  variant="bordered"
                  maxRows={2}
                  disableAnimation
                  disableAutosize
                  classNames={{
                    inputWrapper: "border-1 border-gray-400",
                    input: "w-[100%] resize-y min-h-[60px] lg:min-h-[40px]",
                  }}
                />
              </div>
              <div className="flex flex-col lg:w-[550px] md:flex-row gap-4">
                <InputComponent
                  label="Pengirim Proposal"
                  isRequiredLabel="true"
                  isInvalid={error ? true : false}
                  errorMessage={
                    error && validation.pengirim ? validation.pengirim : ""
                  }
                  variant="bordered"
                  isRequired
                  size="sm"
                  isReadOnly
                  value={proposal.pengirim}
                  classNames={{
                    inputWrapper: "border-1 border-gray-400 h-[38px]",
                  }}
                />
              </div>
              <div className="flex flex-col lg:w-[550px] md:flex-row gap-4">
                <SelectComponent
                  label="Skala Prioritas"
                  isRequiredLabel="true"
                  isInvalid={error ? true : false}
                  errorMessage={
                    error && validation.skala_prioritas
                      ? validation.skala_prioritas
                      : ""
                  }
                  placeholder="Pilih Skala Prioritas"
                  labelPlacement="outside-left"
                  variant="flat"
                  isDisabled
                  isRequired
                  disabledKeys={["all"]}
                  selectedKeys={[`${proposal.skala_prioritas}`]}
                  classNames={{
                    trigger: "border-1 border-gray-400 h-[38px] ",
                    value: "text-default-700",
                  }}
                >
                  {skalaPrioritasSelect.map((item) => (
                    <SelectItem key={item.uid} value={item.uid}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectComponent>
              </div>

              <div className="flex flex-col lg:w-[550px] md:flex-row gap-4">
                <TextArea
                  label="Deksripsi Permohonan"
                  isRequiredLabel="true"
                  isInvalid={error ? true : false}
                  errorMessage={
                    error && validation.perm_bantuan
                      ? validation.perm_bantuan
                      : ""
                  }
                  value={proposal.perm_bantuan}
                  onChange={(event: any) => {
                    setError(false);
                    return setProposal({
                      ...proposal,
                      perm_bantuan: event.target.value,
                    });
                  }}
                  isReadOnly
                  variant="bordered"
                  maxRows={2}
                  disableAnimation
                  disableAutosize
                  classNames={{
                    inputWrapper: "border-1 border-gray-400",
                    input: "w-[100%] resize-y min-h-[60px] lg:min-h-[40px]",
                  }}
                />
              </div>
              <div className="flex flex-col lg:w-[550px] md:flex-row gap-4">
                <SelectComponent
                  isInvalid={error ? true : false}
                  errorMessage={
                    error && validation.jenis_bantuan
                      ? validation.jenis_bantuan
                      : ""
                  }
                  label="Jenis Bantuan"
                  isRequiredLabel="true"
                  variant="flat"
                  isDisabled
                  isRequired
                  isReadOnly
                  selectedKeys={[`${proposal.jenis_bantuan}`]}
                  classNames={{
                    trigger: "border-1 border-gray-400 h-[40px] lg:w-full",
                    value: "text-default-700",
                  }}
                >
                  <SelectItem key="dana">Dana</SelectItem>
                  <SelectItem key="material">Material</SelectItem>
                </SelectComponent>
              </div>
              <SelectOptionUsulan
                onInputValue={handleInputValueJmlDana}
                valueDana={proposal.jumlah_bantuan}
                valueJenisBantuan={proposal.jenis_bantuan}
                error={error}
                validation={validation}
              />
              <div className="flex flex-col md:flex-row">
                <CKEditor
                  disabled="true"
                  label="Assesment Proposal"
                  name="assesment"
                  value={proposal.ass_proposal}
                >
                  {error && (
                    <span className="text-tiny text-red-500">
                      {validation.ass_proposal}
                    </span>
                  )}
                </CKEditor>
              </div>
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <label className="text-sm lg:w-[15rem] font-medium">
                  Dokumen File
                </label>
                <div className="flex flex-wrap gap-2">
                  {proposal.has_file.map((file: any, key: any) => {
                    return (
                      <div
                        key={key}
                        className="flex w-full justify-between items-center border-b-1 border-default-300 pb-2"
                      >
                        <Link href="/" className="text-sm">
                          {file.name}
                        </Link>
                        {/* <Button
                          onClick={() => {
                            removeFileUpdate(file.id);
                          }}
                          isIconOnly
                          variant="bordered"
                          className="bg-transparent border-1 border-red-500 p-2 ml-2"
                          size="sm"
                        >
                          <Closed className="fill-red-500" />
                        </Button> */}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col lg:w-[550px] md:w-[550px] md:flex-row gap-4">
                <label
                  className={`${
                    error === true ? "text-red-500" : ""
                  } text-sm md:w-[17rem] lg:w-[15rem] font-medium`}
                >
                  Kelengkapan Chekclist
                </label>
                <div className="flex flex-col">
                  {checkDokumen.map((item: any, index: any) => (
                      <Checkbox
                        key={index}
                        radius="sm"
                        color="primary"
                        className="mb-1"
                        classNames={{
                          label: "text-sm",
                        }}
                        value={item.uid}
                        // @ts-ignore
                        isSelected={checkedState[item.uid] || false}
                        onChange={() => handleCheck(item.uid)}
                      >
                        {item.name}
                      </Checkbox>
                  ))}
                </div>
              </div>
              <div className="flex justify-start flex-col md:flex-row lg:flex-row gap-3 mt-4">
                <ButtonApproved
                  proposals={proposals}
                  users={users}
                  tokens={tokens}
                />
                <ButtonRejected
                  proposals={proposals}
                  users={users}
                  tokens={tokens}
                />
                <ButtonReturn
                  proposals={proposals}
                  users={users}
                  tokens={tokens}
                />
              </div>
            </CardBody>
          </Card>
        </form>
      </div>
    </>
  );
};
