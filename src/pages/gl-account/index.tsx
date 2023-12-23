import React from 'react'
import GLAccContent from '@/components/organisms/GLAcc/content'

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

interface GLAccProps {
  tokens: string;
  users: string;
}


const GLAccount = ({tokens, users}: GLAccProps) => {
  return <GLAccContent tokens={tokens}/>
}

export default GLAccount