import type { NextApiRequest, NextApiResponse } from 'next';
import callAPI from "../config/api";
import { LoginTypes } from "./data-types";
import Cookies from "js-cookie";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api";

const BACKEND_URL = process.env.NEXT_BACKEND_HOMEPAGE_URL;

export async function setSignUp(data: FormData) {
  const url = `${ROOT_API}/${API_VERSION}/auth/signup`;

  return callAPI({
    url,
    method: "POST",
    data,
  });
}

export async function setLogin(data: LoginTypes) {
  const url = `${ROOT_API}/${API_VERSION}/login`;

  return callAPI({
    url,
    method: "POST",
    data,
  });
}

export async function getUserLogin() {
  const url = `${ROOT_API}/${API_VERSION}/user-auth`;

  return callAPI({
    url,
    method: "GET",
    token: true,
  });
}

export async function setAutoLogin(nik: string) {
  const url = `${ROOT_API}/${API_VERSION}/auto-login`;

  return callAPI({
    url,
    method: "POST",
    data: {
      nik: nik,
    },
  });
}

export async function setLogout(token: string) {
  const url =`${ROOT_API}/${API_VERSION}/logout`;

  return callAPI({
    url,
    method: "POST",
    serverToken: token,
  });
}
