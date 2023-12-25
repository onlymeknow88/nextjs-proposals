import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Link,
  Card,
  CardBody,
  Input,
  SelectItem,
  AutocompleteItem,
  Checkbox,
} from "@nextui-org/react";
import { ArrowLeft } from "@/components/organisms/Icons/Button/arrowLeft";
import {
  BudgetsTypes,
  CcowsTypes,
  ProposalTypes,
  UserTypes,
} from "@/services/data-types";
import {
  UploadFile,
  areaOptions,
  checkDokumen,
  deleteFileById,
  skalaPrioritasSelect,
  updateProposal,
} from "@/services/proposal";
import { SelectOptionUsulan } from "./SelectOptionUsulan";
import { useRouter } from "next/router";
import { InputComponent } from "@/components/atoms/Input";
import { Select2 } from "@/components/atoms/Select2";
import { TextArea } from "@/components/atoms/TextArea";
import { SelectComponent } from "@/components/atoms/Select";
import { CKEditor } from "@/components/atoms/CKEditor";
import InputImage from "@/components/atoms/InputImage";
import { DatepickerComponent } from "@/components/atoms/Datepicker";
import { Closed } from "@/components/organisms/Icons/Button/close";
import FolderOpen from "@/components/organisms/Icons/Button/folder-open";
import NextLink from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getSelect2Ccow } from "@/services/ccow";
import { getSelect2Budget } from "@/services/budget";
import { ButtonSubmit } from "@/components/molecules/ButtonSubmit";

interface ProposalStateTypes {
  emp_name: string;
  ccow_id: string;
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
  checklist_dokumen: any;
}

interface ProposalProps {
  proposalBase64: ProposalTypes;
  users: UserTypes;
  tokens: string;
}

export const FormProposal = (props: ProposalProps) => {
  const initialState = {
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
  };
  const { proposalBase64, users, tokens } = props;
  const proposals = JSON.parse(atob(proposalBase64.toString()));

  const [proposal, setProposal] = useState<ProposalStateTypes>({
    emp_name: proposals.emp_name,
    ccow_id: proposals.budget.ccow_id,
    judul: proposals.judul,
    pengirim: proposals.pengirim,
    perm_bantuan: proposals.perm_bantuan,
    skala_prioritas: proposals.skala_prioritas,
    area: proposals.area_id,
    budget: proposals.budget_id,
    jenis_bantuan: proposals.jenis_bantuan,
    jumlah_bantuan: proposals.jumlah_bantuan,
    ass_proposal: proposals.ass_proposal,
    start_date: proposals.start_date,
    receive_date: proposals.receive_date,
    prop_no: proposals.prop_no,
    upload_file: [],
    has_file: proposals.has_file,
    checklist_dokumen: proposals.checklist_dokumen,
  });

  const router = useRouter();

  const [validation, setValidation] =
    useState<ProposalStateTypes>(initialState);
  const [error, setError] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);

  //sweetalert toast
  const MySwal = withReactContent(Swal);

  const handleInputValueJmlDana = (ctx: any) => {
    if (ctx.key === "dana") {
      setProposal({
        ...proposal,
        jumlah_bantuan: ctx.value, // Update the field you want in the data state
      });
    } else if (ctx.key === "material") {
      setProposal({
        ...proposal,
        jumlah_bantuan: ctx.value, // Update the field you want in the data state
      });
    }
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

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("emp_name", proposal.emp_name);
    // data.append("ccow_id", proposal.ccow_id);
    data.append("start_date", proposal.start_date);
    data.append("judul", proposal.judul);
    data.append("pengirim", proposal.pengirim);
    data.append("perm_bantuan", proposal.perm_bantuan);
    data.append("area_id", proposal.area);
    data.append("skala_prioritas", proposal.skala_prioritas);
    data.append("budget_id", proposal.budget);
    data.append("jenis_bantuan", proposal.jenis_bantuan);
    data.append("jumlah_bantuan", proposal.jumlah_bantuan);
    data.append("ass_proposal", proposal.ass_proposal);

    data.append("checklist_dokumen", proposal.checklist_dokumen);

    for (let i = 0; i < proposal.upload_file.length; i++) {
      data.append("upload_file[]", proposal.upload_file[i]);
    }

    const res = await updateProposal(data, proposals.prop_id, tokens);

    switch (res.error) {
      case true:
        setValidation(res.data);
        setError(true);
        break;
      case false:
        // console.log(res.data)
        router.push("/proposal");
        setError(false);
        break;
      default:
        break;
    }
  };
  const [isloading, setLoading] = useState(false);
  //upload file
  const [message, setMessage] = useState("");
  const handleFile = useCallback(
    async (e: any) => {
      setLoading(true);
      const imagesArray = [];
      let isValid: string; // Keep the type as string

      for (let i = 0; i < e.target.files.length; i++) {
        isValid = fileValidate(e.target.files[i]) ? "true" : "false"; // Convert boolean to string
        imagesArray.push(e.target.files[i]);
      }

      const formData = new FormData();

      // Append each file to the FormData object
      imagesArray.forEach((file, index) => {
        formData.append(`upload_file_${index}`, file);
      });

      // Append each file to the FormData object
      proposal.has_file.forEach((file: any, index: any) => {
        formData.append(`has_file_${index}`, file.id);
      });

      const response = await UploadFile(formData);
      if (response.error) {
        MySwal.fire({
          toast: true,
          icon: "error",
          title: "File Failed to Upload",
          animation: true,
          position: "top-right",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        setMessage(response.message);
        setFileError(true);
        setLoading(false);
      } else {
        MySwal.fire({
          toast: true,
          icon: "success",
          title: "File Uploaded",
          animation: true,
          position: "top-right",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        setFileError(false);
      }

      setProposal({
        ...proposal,
        upload_file: imagesArray,
      });

      setLoading(false);
    },
    [proposal, MySwal]
  );

  //validate file
  const fileValidate = (file: any) => {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    if (validTypes.indexOf(file.type) === -1) {
      // return false;
      setMessage("File type not allowed");
    }
    return true;
  };

  //remove File
  const removeFile = (i: any) => {
    setMessage("");
    setProposal({
      ...proposal,
      upload_file: proposal.upload_file.filter((x: any) => x.name !== i),
    });
  };
  const removeFileUpdate = useCallback(
    async (i: any) => {
      setMessage("");

      const res = await deleteFileById(i);

      setProposal({
        ...proposal,
        has_file: proposal.has_file.filter((x: any) => x.id !== i),
      });
    },
    [proposal]
  );

  const [optCcow, setOptCcow] = useState<any>([]);

  const fetchSelect2Ccow = useCallback(async () => {
    setLoading(true);
    const res = await getSelect2Ccow(tokens);
    const data = await res.data.result;
    setOptCcow(data);
    setLoading(false);
  }, [tokens]);

  const [optBudget, setOptBudget] = useState<any>([]);

  const fetchSelect2Budget = useCallback(async () => {
    setLoading(true);
    const res = await getSelect2Budget(tokens, "");
    const data = await res.data.result;
    setOptBudget(data);
    setLoading(false);
  }, [tokens]);

  const handleCcowSelect = async (event: any) => {
    setLoading(true);
    if (!event) {
      const res = await getSelect2Ccow(tokens);
      const data = await res.data.result;
      setOptCcow(data);

      return setOptBudget([]);
    }

    const res = await getSelect2Budget(tokens, event);
    //   console.log(res);
    const data = await res.data.result;
    setOptBudget(data);
    setLoading(false);
  };

  useEffect(() => {
    setEditorLoaded(true);
    fetchSelect2Ccow();
    fetchSelect2Budget();
  }, [fetchSelect2Ccow, fetchSelect2Budget]);

  const handleDate = async (ctx: any) => {
    setProposal({
      ...proposal,
      start_date: proposal.start_date,
    });
  };

  return (
    <>
      {" "}
      <div className="flex justify-between gap-3 items-end">
        <Button
          className="text-lg h-[40px] lg:h-[34px] lg:text-sm bg-default-200 md:h-[34px] md:text-sm"
          size="sm"
          as={NextLink}
          radius="sm"
          startContent={<ArrowLeft className="h-6 stroke-default-500" />}
          href="/proposal"
        >
          Back
        </Button>
      </div>
      <div className="max-w-[90rem]">
        <form action="">
          <Card shadow="sm" className="max-w-[90rem] lg:w-full">
            <CardBody className="p-4 md:p-6 lg:p-8 gap-4">
              <div className="flex flex-col lg:w-[550px] md:flex-row gap-4">
                <DatepickerComponent
                  isRequiredLabel="true"
                  asSingle={true}
                  disabled={true}
                  label="Tanggal Pengajuan"
                  data={proposal.start_date}
                  onValue={handleDate}
                />
              </div>
              <div className="flex flex-col lg:w-[550px] md:flex-row gap-4">
                <Select2
                  isInvalid={error ? true : false}
                  errorMessage={
                    error && validation.ccow_id ? validation.ccow_id : ""
                  }
                  label="CCOW"
                  isRequiredLabel="true"
                  variant="bordered"
                  size="sm"
                  placeholder="Pilih"
                  defaultItems={optCcow}
                  selectedKey={`${proposal.ccow_id}`}
                  onSelectionChange={(event: any) => {
                    setError(false);
                    handleCcowSelect(event);
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
                  variant="bordered"
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
                  variant="bordered"
                  isRequired
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
                  {areaOptions.map((item) => (
                    <SelectItem key={item.uid} value={item.uid}>
                      {item.name}
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
                  isInvalid={error ? true : false}
                  errorMessage={
                    error && validation.emp_name ? validation.emp_name : ""
                  }
                  label="Nama Karyawan"
                  size="sm"
                  variant="bordered"
                  value={proposal.emp_name}
                  isRequired
                  onChange={(event: any) => {
                    setError(false);
                    return setProposal({
                      ...proposal,
                      emp_name: event.target.value,
                    });
                  }}
                  classNames={{
                    inputWrapper: "border-1 border-gray-400 h-[38px]",
                  }}
                />
              </div>
              <div className="flex lg:w-[550px] flex-col md:flex-row  gap-4">
                <TextArea
                  isRequiredLabel="true"
                  label="Judul Proposal"
                  isInvalid={error ? true : false}
                  errorMessage={
                    error && validation.judul ? validation.judul : ""
                  }
                  value={proposal.judul}
                  onChange={(event: any) => {
                    setError(false);
                    return setProposal({
                      ...proposal,
                      judul: event.target.value,
                    });
                  }}
                  variant="bordered"
                  maxRows={2}
                  disableAnimation
                  disableAutosize
                  classNames={{
                    inputWrapper: "border-1 border-gray-400",
                    input: "w-[100%] resize-y min-h-[40px]",
                  }}
                />
              </div>
              <div className="flex flex-col lg:w-[550px] md:flex-row gap-4">
                <InputComponent
                  isRequiredLabel="true"
                  label="Pengirim Proposal"
                  isInvalid={error ? true : false}
                  errorMessage={
                    error && validation.pengirim ? validation.pengirim : ""
                  }
                  variant="bordered"
                  isRequired
                  size="sm"
                  onChange={(event: any) => {
                    setError(false);
                    return setProposal({
                      ...proposal,
                      pengirim: event.target.value,
                    });
                  }}
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
                  // placeholder="Pilih"
                  variant="bordered"
                  radius="sm"
                  isRequired
                  selectedKeys={[`${proposal.skala_prioritas}`]}
                  onChange={(event: any) => {
                    setError(false);
                    return setProposal({
                      ...proposal,
                      skala_prioritas: event.target.value,
                    });
                  }}
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
                  isRequiredLabel="true"
                  label="Deksripsi Permohonan"
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
                  variant="bordered"
                  maxRows={2}
                  disableAnimation
                  disableAutosize
                  classNames={{
                    inputWrapper: "border-1 border-gray-400",
                    input: "w-[100%] resize-y min-h-[40px]",
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
                  variant="bordered"
                  radius="sm"
                  isRequired
                  selectedKeys={[`${proposal.jenis_bantuan}`]}
                  onChange={(event: any) => {
                    return setProposal({
                      ...proposal,
                      jenis_bantuan: event.target.value,
                    });
                  }}
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
                  label="Assesment Proposal"
                  name="assesment"
                  onChange={(event: any) => {
                    return setProposal({
                      ...proposal,
                      ass_proposal: event,
                    });
                  }}
                  value={proposal.ass_proposal}
                >
                  {error && (
                    <span className="text-tiny text-red-500">
                      {validation.ass_proposal}
                    </span>
                  )}
                </CKEditor>
              </div>
              <div className="lg:w-full">
                <div className="flex flex-col lg:w-[600px] md:flex-row gap-4">
                  <InputImage error={fileError} label="Upload File">
                    <div className="w-[100%] bg-transparent rounded-md">
                      <div className="h-20 w-full relative border-2 items-center rounded-md cursor-pointer border-gray-400 border-dotted">
                        <input
                          onChange={handleFile}
                          type="file"
                          className="h-full w-full bg-green-200 opacity-0 z-10 absolute"
                          multiple
                          name="file"
                        />
                        <div className="h-full w-full bg-default-100 absolute z-1 flex justify-center items-center top-0">
                          <div className="flex flex-col items-center">
                            <FolderOpen />
                            <span className="text-sm ">{`Choose file`}</span>
                          </div>
                        </div>
                      </div>
                      {fileError && (
                        <span className="text-tiny text-red-500">
                          {message}
                        </span>
                      )}
                    </div>
                  </InputImage>
                </div>
                <div className="flex flex-wrap lg:max-w-[35rem] gap-2 mt-2 lg:ml-[15.8rem]">
                  {proposal.upload_file.map((file: any, key: any) => {
                    return (
                      <div
                        key={key}
                        className="flex w-full justify-between items-center border-b-1 border-default-300 pb-2"
                      >
                        <Link href="/" className="text-sm">
                          {file.name}
                        </Link>
                        <Button
                          onClick={() => {
                            removeFile(file.name);
                          }}
                          isIconOnly
                          variant="bordered"
                          className="bg-transparent border-1 border-red-500 p-2 ml-2"
                          size="sm"
                        >
                          <Closed className="fill-red-500" />
                        </Button>
                      </div>
                    );
                  })}
                  {proposal.has_file.map((file: any, key: any) => {
                    return (
                      <div
                        key={key}
                        className="flex w-full justify-between items-center border-b-1 border-default-300 pb-2"
                      >
                        <Link href="/" className="text-sm">
                          {file.name}
                        </Link>
                        <Button
                          onClick={() => {
                            removeFileUpdate(file.id);
                          }}
                          isIconOnly
                          variant="bordered"
                          className="bg-transparent border-1 border-red-500 p-2 ml-2"
                          size="sm"
                        >
                          <Closed className="fill-red-500" />
                        </Button>
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
              <div className="flex justify-start flex-col lg:flex-row md:flex-row gap-3">
                <ButtonSubmit onSubmit={handleSubmit} />
                <Button
                  size="md"
                  className="bg-default-100 lg:text-sm text-lg h-[50px] lg:h-[34px] md:h-[34px] md:text-sm"
                  onClick={() => {
                    setError(false);
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
