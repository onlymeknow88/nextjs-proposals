import callAPI from "../config/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api";

const columns = [
  { name: "No", uid: "no" },
  { name: "GL Account", uid: "gl_account" },
  { name: "CCOW Code", uid: "ccow_code" },
  { name: "Cost Center", uid: "cost_center" },
  { name: "ACTIONS", uid: "actions" },
];

export { columns };

export async function getGLAccAll(
  limit: any,
  page: any,
  search: string,
  token: string
) {
  const url = `${ROOT_API}/${API_VERSION}/gl-acc?limit=${limit}&page=${page}&search=${search}`;

  return callAPI({
    url,
    method: "GET",
    serverToken: token,
  });
}

export async function getGLAccById(id: any, token: string) {
  let params = `?id=${id}`;
  const url = `${ROOT_API}/${API_VERSION}/gl-acc${params}`;

  return callAPI({
    url,
    method: "GET",
    serverToken: token,
  });
}

export async function storeGLAcc(glAcc: any, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/gl-acc`;

  return callAPI({
    url,
    method: "POST",
    token: true,
    data: glAcc,
  });
}

export async function updateGLAcc(glAcc: any, id: string, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/gl-acc/${id}/update`;

  return callAPI({
    url,
    method: "POST",
    data: glAcc,
    serverToken: token,
  });
}

export async function deleteGLAcc(id: string, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/gl-acc/${id}`;

  return callAPI({
    url,
    method: "DELETE",
    serverToken: token,
  });
}

export async function getSelect2GlAcc(token: string)
{
  const url = `${ROOT_API}/${API_VERSION}/gl-acc/opt-gl-acc`;

  return callAPI({
    url,
    method: "GET",
    serverToken: token,
  });
}