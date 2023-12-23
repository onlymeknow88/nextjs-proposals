import React from "react";
import ProposalContent from "@/components/organisms/Proposals/content";

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

  // const users = btoa(user)
  // Cookies.set("users", users, { expires: 1 });

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

interface ProposalProps {
  tokens: string;
  users: string;
}

export const Proposals = ({ tokens, users }: ProposalProps) => {
  return <ProposalContent tokens={tokens} />;
};

export default Proposals;
