import React from 'react'
import BudgetContent from '@/components/organisms/Budget/content'

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


const Budgets = ({tokens, users}: AreaProps) => {
  return <BudgetContent tokens={tokens}/>
}

export default Budgets