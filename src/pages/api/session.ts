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

        const tokens = btoa(JSON.stringify(token));
        const users = btoa(JSON.stringify(user));
        const refresh_tokens = btoa(JSON.stringify(refresh_token));

        const ex = {
           tokens,users,refresh_tokens
        }

        const x = JSON.stringify(ex);

        // Cookies.set('x', x);

        res.status(200).json({ x });


    } else {
        res.status(405).end();
    }
}
