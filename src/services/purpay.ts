import callAPI from "../config/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api";

const columns = [
  { name: "No", uid: "no" },
  { name: "Purpay Name", uid: "purpay_name" },
  { name: "ACTIONS", uid: "actions" },
];

export { columns };

export async function getPurpayAll(
  limit: any,
  page: any,
  search: string,
  token: string
) {
  const url = `${ROOT_API}/${API_VERSION}/purpay?limit=${limit}&page=${page}&search=${search}`;

  return callAPI({
    url,
    method: "GET",
    token: true,
  });
}

export async function getPurpayById(id: any, token: string) {
  let params = `?id=${id}`;
  const url = `${ROOT_API}/${API_VERSION}/purpay${params}`;

  return callAPI({
    url,
    method: "GET",
    serverToken: token,
  });
}

export async function storePurpay(purpay: any, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/purpay`;

  return callAPI({
    url,
    method: "POST",
    token: true,
    data: purpay,
  });
}

export async function updatePurpay(purpay: any, id: string, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/purpay/${id}/update`;

  return callAPI({
    url,
    method: "POST",
    data: purpay,
    serverToken: token,
  });
}

export async function deletePurpay(id: string, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/purpay/${id}`;

  return callAPI({
    url,
    method: "DELETE",
    serverToken: token,
  });
}


export async function getSelect2Purpay(token: string)
{
  const url = `${ROOT_API}/${API_VERSION}/purpay/opt-purpay`;

  return callAPI({
    url,
    method: "GET",
    serverToken: token,
  });
}