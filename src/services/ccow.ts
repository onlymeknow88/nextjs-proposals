import callAPI from "../config/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api";

const columns = [
  { name: "No", uid: "no" },
  { name: "Ccow Code", uid: "ccow_code" },
  { name: "Ccow Name", uid: "ccow_name" },
  { name: "Cost Center", uid: "cost_center" },
  { name: "ACTIONS", uid: "actions" },
];

export { columns };

export async function getCcowAll(
  limit: any,
  page: any,
  search: string,
  token: string
) {
  const url = `${ROOT_API}/${API_VERSION}/ccow?limit=${limit}&page=${page}&search=${search}`;

  return callAPI({
    url,
    method: "GET",
    token: true,
  });
}

export async function getCcowById(id: any, token: string) {
  let params = `?id=${id}`;
  const url = `${ROOT_API}/${API_VERSION}/ccow${params}`;

  return callAPI({
    url,
    method: "GET",
    serverToken: token,
  });
}

export async function storeCcow(ccow: any, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/ccow`;

  return callAPI({
    url,
    method: "POST",
    token: true,
    data: ccow,
  });
}

export async function updateCcow(ccow: any, id: string, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/ccow/${id}/update`;

  return callAPI({
    url,
    method: "POST",
    data: ccow,
    serverToken: token,
  });
}

export async function deleteCcow(id: string, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/ccow/${id}`;

  return callAPI({
    url,
    method: "DELETE",
    serverToken: token,
  });
}


export async function getSelect2Ccow(token: string)
{
  const url = `${ROOT_API}/${API_VERSION}/ccow/opt-ccow`;

  return callAPI({
    url,
    method: "GET",
    serverToken: token,
  });
}