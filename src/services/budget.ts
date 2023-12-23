import callAPI from "../config/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api";

const columns = [
  { name: "No", uid: "no" },
  { name: "Budget Name", uid: "budget_name" },
  { name: "CCOW Code", uid: "ccow_code" },
  { name: "CCOW Name", uid: "ccow_name" },
  { name: "ACTIONS", uid: "actions" },
];

export { columns };

export async function getBudgetAll(
  limit: any,
  page: any,
  search: string,
  token: string
) {
  const url = `${ROOT_API}/${API_VERSION}/budget?limit=${limit}&page=${page}&search=${search}`;

  return callAPI({
    url,
    method: "GET",
    serverToken: token,
  });
}

export async function getBudgetById(id: any, token: string) {
  let params = `?id=${id}`;
  const url = `${ROOT_API}/${API_VERSION}/budget${params}`;

  return callAPI({
    url,
    method: "GET",
    serverToken: token,
  });
}

export async function storeBudget(budget: any, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/budget`;

  return callAPI({
    url,
    method: "POST",
    token: true,
    data: budget,
  });
}

export async function updateBudget(budget: any, id: string, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/budget/${id}/update`;

  return callAPI({
    url,
    method: "POST",
    data: budget,
    serverToken: token,
  });
}

export async function deleteBudget(id: string, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/budget/${id}`;

  return callAPI({
    url,
    method: "DELETE",
    serverToken: token,
  });
}

export async function getSelect2Budget(token: string, id: any)
{
  let params = `?id=${id}`;
  
  const url = `${ROOT_API}/${API_VERSION}/budget/opt-budget${params}`;

  return callAPI({
    url,
    method: "GET",
    serverToken: token,
  });
}