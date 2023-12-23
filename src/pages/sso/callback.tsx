import { GetServerSideProps, NextPage } from "next";
import { setAutoLogin } from "@/services/auth";
import { setCookie, deleteCookie } from "cookies-next";

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const error_message = "Error when authenticating";

  const { query } = ctx;

  if (query.code && query.state) {
    //@ts-ignore
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
      state: query.state,
      code: query.code,
    });

    const url = `${process.env.NEXT_PUBLIC_API}/callback?${params.toString()}`;

    return {
      redirect: {
        destination: url,
        permanent: false,
      },
    };
  }

  if(query.isLogin === '0'){
    deleteCookie("access_token", {
      req: ctx.req,
      res: ctx.res,
    });

    deleteCookie("user", {
      req: ctx.req,
      res: ctx.res,
    });

    deleteCookie("refresh_token", {
      req: ctx.req,
      res: ctx.res,
    });

    return {
      redirect: {
        destination: "http://localhost:3000/404",
        permanent: false,
      },
    };
  }

  if (!query.error) {
    if (query.access_token && query.refresh_token && query.expires_in) {
      // console.log(query.access_token)

      const response = await setAutoLogin(query.nik);
      const token = response.data.result.access_token;
      const user = response.data.result.user;

      
        const users = {
          name: user.name,
          email: user.email,
          role: user.role_id,
          nik: user.nik,
          isLogin: user.isLogin,
          is_dept_head: user.is_department_head,
          is_div_head: user.is_division_head,
        };

        setCookie("access_token", token, {
          req: ctx.req,
          res: ctx.res,
          maxAge: parseInt(query.expires_in.toString()),
          httpOnly: true,
        });

        setCookie("user", users, {
          req: ctx.req,
          res: ctx.res,
          maxAge: parseInt(query.expires_in.toString()),
          httpOnly: true,
        });

        setCookie("refresh_token", token, {
          req: ctx.req,
          res: ctx.res,
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
        });

        return {
          redirect: {
            destination: "http://localhost:3000/",
            permanent: false,
          },
        };
    }
  }

  return {
    props: {
      error_message,
    },
  };
};

type Props = {
  error_message: string;
};

const Callback: NextPage<Props> = ({ error_message }) => {
  return <div>{error_message}</div>;
};

export default Callback;
