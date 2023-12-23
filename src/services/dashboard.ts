import callAPI from "../config/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api";

export async function getDashboard(token:string, search: string) {

    let params = `?search=${search}`;

    const url = `${ROOT_API}/${API_VERSION}/dashboard${params}`;
  
    return callAPI({
      url,
      method: "GET",
      serverToken: token
    });
  }