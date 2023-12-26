import callAPI from "../config/api";
import { ProposalTypes } from "./data-types";
import Cookies from "js-cookie";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api";

const columns = [
  { name: "Prop No", uid: "prop_no" },
  { name: "Judul Proposal", uid: "judul" },
  { name: "Jenis Bantuan", uid: "jenis_bantuan" },
  // { name: "Dokumen Proposal", uid: "dok_proposal" },
  { name: "Skala Prioritas", uid: "skala_prioritas" },
  { name: "Status", uid: "status" },
  { name: "Tanggal Pengajuan", uid: "tgl_pengajuan" },
  { name: "Nama Karyawan", uid: "created_by" },
  { name: "ACTIONS", uid: "actions" },
];

//skala prioritas for filter
const skalaPrioritasOptions = [
  // { name: "Skala Prioritas", uid: "all" },
  { name: "High", uid: "high" },
  { name: "Medium", uid: "medium" },
  { name: "Low", uid: "low" },
];

//skala prioritas for filter
const areaOptions = [
  { name: "Kab Murang Raya", uid: "1" },
  { name: "Kab Barito Utara", uid: "2" },
  { name: "Kab Barito Selatan", uid: "3" },
  { name: "Kalimantan Tengah", uid: "4" },
  { name: "Kab Mahakam Ulu", uid: "5" },
  { name: "Others", uid: "other" },
];

//status for filter
const statusOptions = [
  // { name: "Semua", uid: "all" },
  { name: "Waiting for Approval", uid: "1" },
  // { name: "In Review", uid: "2" },
  { name: "Approved", uid: "3" },
  // { name: "Return", uid: "4" },
  { name: "Rejected", uid: "5" },
];

type StatusColorMap = { [key: string]: string };

//color status for table
const statusColorMap: StatusColorMap = {
  1: "bg-blue-400 text-white",
  2: "bg-yellow-500 text-white",
  3: "bg-green-400 text-white",
  5: "bg-red-500 text-white",
  medium: "bg-yellow-500 text-white",
  high: "bg-red-500 text-white",
  low: "bg-blue-500 text-white",
};

const skalaPrioritasSelect = [
  { name: "High", uid: "high" },
  { name: "Medium", uid: "medium" },
  { name: "Low", uid: "low" },
];

const checkDokumen = [
  {name: "Surat Penunjukan Rekening", checked: false ,uid: "1"},
  {name: "Surat Penunjukan", checked: false,uid: "2" },
  {name: "Surat", checked: false,uid: "3" },
];

export {
  columns,
  skalaPrioritasOptions,
  statusOptions,
  statusColorMap,
  skalaPrioritasSelect,
  areaOptions,
  checkDokumen
};

export async function getProposal(valueParams: string, type?: string) {
  let params = "";
  if (valueParams === "all") {
    params = "";
  } else {
    if (type === "skala_prioritas") {
      params = `?skala_prioritas=${valueParams}`;
    } else if (type === "status") {
      params = `?status=${valueParams}`;
    } else if (type === 'area') {
      params = `?area=${valueParams}`;
    }
  }

  const url = `${ROOT_API}/${API_VERSION}/proposal${params}`;

  return callAPI({
    url,
    method: "GET",
    token: true,
  });
}

export async function getProposalDateRange(valueParams: any, type?: string) {
  let params = "";

  if(valueParams.start_date && valueParams.end_date){
    params = `?start_date=${valueParams.start_date}&end_date=${valueParams.end_date}`;
  }

  const url = `${ROOT_API}/${API_VERSION}/proposal${params}`;

  return callAPI({
    url,
    method: "GET",
    token: true,
  });
}


export async function getProposalAll(
  limit: any,
  page: any,
  search: string,
  token: string
) {
  const url = `${ROOT_API}/${API_VERSION}/proposal?limit=${limit}&page=${page}&search=${search}`;

  return callAPI({
    url,
    method: "GET",
    token: true
    // serverToken: token,
  });
}

export async function getProposalById(id: string, token: string) {
  let params = `?id=${id}`;

  const url = `${ROOT_API}/${API_VERSION}/proposal${params}`;

  return callAPI({
    url,
    method: "GET",
    serverToken: token,
  });
}

export async function storeProposal(proposal: FormData, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/proposal`;

  return callAPI({
    url,
    method: "POST",
    data: proposal,
    serverToken: token,
  });
}

export async function updateProposal(
  proposal: FormData,
  id: string,
  token: string
) {
  const url = `${ROOT_API}/${API_VERSION}/proposal/${id}/update`;

  return callAPI({
    url,
    method: "POST",
    data: proposal,
    serverToken: token,
  });
}

export async function deleteProposalById(id: string, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/proposal/${id}`;

  return callAPI({
    url,
    method: "DELETE",
    serverToken: token,
  });
}

export async function returnProposalById(
  proposal: any,
  id: string,
  token: string
) {
  const url = `${ROOT_API}/${API_VERSION}/proposal/return/${id}`;

  return callAPI({
    url,
    method: "POST",
    data: proposal,
    serverToken: token,
  });
}

export async function approveProposalById(
  id: string,
  user_id: string,
  type: string,
  token: string
) {
  const url = `${ROOT_API}/${API_VERSION}/proposal/approve/${id}?type=${type}&nik=${user_id}`;

  return callAPI({
    url,
    method: "POST",
    serverToken: token,
  });
}

export async function uploadCkeditorById(image: FormData) {
  const url = `${ROOT_API}/${API_VERSION}/uploadCkeditor`;

  return callAPI({
    url,
    method: "POST",
    data: image,
    token: true,
  });
}

export async function deleteFileById(id: string) {
  const url = `${ROOT_API}/${API_VERSION}/proposal/deleteFile/${id}`;

  return callAPI({
    url,
    method: "DELETE",
    token: true,
  });
}

export async function UploadFile(image: FormData) {

  const url = `${ROOT_API}/${API_VERSION}/proposal/uploadFile`;

  return callAPI({
    url,
    method: "POST",
    data: image,
    token: true,
  });
}

export async function internalMemoPDF(data: any)
{
  const url = `${ROOT_API}/${API_VERSION}/proposal/toPDF`;

  return callAPI({
    url,
    method: "POST",
    data: data,
    token: true
  })
}

export async function downloadPDF(id:string)
{
  const url = `${ROOT_API}/${API_VERSION}/proposal/${id}/downloadPDF`;

  return callAPI({
    url,
    method: "GET",
    token: true
  })
}
