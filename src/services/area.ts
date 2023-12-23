import callAPI from "../config/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api";

const columns = [
  { name: "No", uid: "no" },
  { name: "Area Name", uid: "area_name" },
  { name: "ACTIONS", uid: "actions" },
];

export { columns };

export async function getAreaAll(
  limit: any,
  page: any,
  search: string,
  token: string
) {
  const url = `${ROOT_API}/${API_VERSION}/area?limit=${limit}&page=${page}&search=${search}`;

  return callAPI({
    url,
    method: "GET",
    token: true,
  });
}

export async function getAreaById(id: any, token: string) {
  let params = `?id=${id}`;
  const url = `${ROOT_API}/${API_VERSION}/area${params}`;

  return callAPI({
    url,
    method: "GET",
    serverToken: token,
  });
}

export async function storeArea(area: any, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/area`;

  return callAPI({
    url,
    method: "POST",
    token: true,
    data: area,
  });
}

export async function updateArea(area: any, id: string, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/area/${id}/update`;

  return callAPI({
    url,
    method: "POST",
    data: area,
    serverToken: token,
  });
}

export async function deleteArea(id: string, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/area/${id}`;

  return callAPI({
    url,
    method: "DELETE",
    serverToken: token,
  });
}

export async function getSelect2Area(token: string)
{
  
  const url = `${ROOT_API}/${API_VERSION}/area/opt-area`;

  return callAPI({
    url,
    method: "GET",
    serverToken: token,
  });
}
