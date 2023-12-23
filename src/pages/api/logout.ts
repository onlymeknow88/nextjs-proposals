import { deleteCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import Cookies from "js-cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  deleteCookie("access_token", { req, res });
  deleteCookie("refresh_token", { req, res });
  deleteCookie("user", { req, res });
  deleteCookie("redirect", { req, res });

  res.status(200).end();
}
