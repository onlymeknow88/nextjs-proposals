import callAPI from "../config/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api";

const columns = [
  { name: "No", uid: "no" },
  { name: "Proposal No", uid: "prop_no" },
  { name: "Nop Name", uid: "nop_name" },
  { name: "Due Date", uid: "due_date" },
  { name: "Amount", uid: "amount" },
  { name: "Cost Center or Project", uid: "cost_center" },
  { name: "PrintPDF", uid: "print_pdf" },
  { name: "ACTIONS", uid: "actions" },
];


export { columns };

export async function getFormNopAll(
  limit: any,
  page: any,
  search: string,
  token: string
) {
  const url = `${ROOT_API}/${API_VERSION}/form-nop?limit=${limit}&page=${page}&search=${search}`;

  return callAPI({
    url,
    method: "GET",
    serverToken: token,
  });
}

export async function getFormNopById(id: any, token: string) {
  let params = `?id=${id}`;
  const url = `${ROOT_API}/${API_VERSION}/form-nop${params}`;

  return callAPI({
    url,
    method: "GET",
    serverToken: token,
  });
}

export async function storeFormNop(formNop: any, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/form-nop`;

  return callAPI({
    url,
    method: "POST",
    token: true,
    data: formNop,
  });
}

export async function updateFormNop(formNop: any, id: string, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/form-nop/${id}/update`;

  return callAPI({
    url,
    method: "POST",
    data: formNop,
    serverToken: token,
  });
}

export async function deleteFormNop(id: string, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/form-nop/${id}`;

  return callAPI({
    url,
    method: "DELETE",
    serverToken: token,
  });
}

export async function getSelect2FormNop(token: string,id: string) {
  let params = `?id=${id}`;
  const url = `${ROOT_API}/${API_VERSION}/form-nop/opt-form-nop${params}`;

  return callAPI({
    url,
    method: "GET",
    serverToken: token,
  });
}

export async function downloadFormNop(id: string) {
  let params = `?id=${id}`;
  const url = `${ROOT_API}/${API_VERSION}/form-nop/pdf${params}`;

  return callAPI({
    url,
    method: "GET",
    token: true
  });
}