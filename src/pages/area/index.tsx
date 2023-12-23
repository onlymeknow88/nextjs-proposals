import AreaContent from '@/components/organisms/Areas/content'
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
  
  interface AreaProps {
    tokens: string;
    users: string;
  }


const Areas = ({tokens, users}: AreaProps) => {
  return <AreaContent tokens={tokens}/>
}

export default Areas