import { deleteCookie, getCookies } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method === 'GET') {
        const cookies =  getCookies({ req, res });
        const token = cookies.access_token || '';
        const user = cookies.user || '';
        const refresh_token = cookies.refresh_token || '';




    } else {
        res.status(405).end();
    }
}
