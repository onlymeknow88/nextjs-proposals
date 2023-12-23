import callAPI from "../config/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api";

const columns = [
  { name: "No", uid: "no" },
  { name: "GL Account", uid: "gl_account" },
  { name: "Cost Center", uid: "cost_center" },
  { name: "Amount", uid: "amount" },
  { name: "Sisa Amount", uid: "sisa_amount" },
  { name: "Year", uid: "year" },
  { name: "ACTIONS", uid: "actions" },
];

//skala prioritas for filter
const yearOptions = [
  { name: "2021", uid: "2021" },
  { name: "2022", uid: "2022" },
  { name: "2023", uid: "2023" },
  { name: "2024", uid: "2024" },
];

export { columns, yearOptions };

export async function getAmountAll(
  limit: any,
  page: any,
  search: string,
  token: string
) {
  const url = `${ROOT_API}/${API_VERSION}/amount?limit=${limit}&page=${page}&search=${search}`;

  return callAPI({
    url,
    method: "GET",
    serverToken: token,
  });
}

export async function getAmountById(id: any, token: string) {
  let params = `?id=${id}`;
  const url = `${ROOT_API}/${API_VERSION}/amount${params}`;

  return callAPI({
    url,
    method: "GET",
    serverToken: token,
  });
}

export async function storeAmount(amount: any, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/amount`;

  return callAPI({
    url,
    method: "POST",
    token: true,
    data: amount,
  });
}

export async function updateAmount(amount: any, id: string, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/amount/${id}/update`;

  return callAPI({
    url,
    method: "POST",
    data: amount,
    serverToken: token,
  });
}

export async function deleteAmount(id: string, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/amount/${id}`;

  return callAPI({
    url,
    method: "DELETE",
    serverToken: token,
  });
}

export async function getSelect2Amount(token: string,id: string) {
  let params = `?id=${id}`;
  const url = `${ROOT_API}/${API_VERSION}/amount/opt-amount${params}`;

  return callAPI({
    url,
    method: "GET",
    serverToken: token,
  });
}