import FormNopContent from '@/components/organisms/FormNop/content';
import React from 'react'

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
  
  interface FormNopProps {
    tokens: string;
    users: string;
  }

const FormNops = ({tokens,users}: FormNopProps) => {
  return (
    <FormNopContent tokens={tokens} users={users}/>
  )
}

export default FormNops