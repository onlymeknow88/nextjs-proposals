import React from "react";
import CcowContent from "@/components/organisms/Ccow/content";

interface GetServerSideProps {
  req: {
    cookies: {
      access_token: string;
      user: string;
    };
  };
}

export async function getServerSideProps({ req }: GetServerSideProps) {
  const { access_token } = req.cookies;
  const { user } = req.cookies;

  if (!access_token) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: {
      tokens: access_token,
      users: user,
    },
  };
}

interface AreaProps {
  tokens: string;
  users: string;
}

const Ccows = ({ tokens, users }: AreaProps) => {
  return <CcowContent tokens={tokens} />;
};

export default Ccows;
