import BreadCumbCustom from '@/components/atoms/Breadcumb';
import FormBudget from '@/components/organisms/Budget/Form/edit';
import { HouseIcon } from '@/components/organisms/Icons/breadcrumb/house-icon';
import { getBudgetById } from '@/services/budget';
import { BudgetsTypes, UserTypes } from '@/services/data-types';
import React from 'react'

interface GetServerSideProps {
    req: {
      cookies: {
        access_token: string;
        user: string;
      };
    };
    params: {
      id: string;
    };
  }
  
  export async function getServerSideProps({ req, params }: GetServerSideProps) {
    const { access_token } = req.cookies;
    const { id } = params;
    const { user } = req.cookies;
  
    if (!access_token) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
  
    const res = await getBudgetById(id, access_token);
    const data = res.data.result;
    // console.log(data)
    const budgetBase64 = btoa(JSON.stringify(data));
  
    return {
      props: {
        tokens: access_token,
        users: user,
        budgets: budgetBase64,
      },
    };
  }
  
  interface BudgetsProps {
    budgets: BudgetsTypes;
    users: UserTypes;
    tokens: string;
  }
const EditBudgets = ({tokens, users, budgets}: BudgetsProps) => {
    return (
        <>
          <div className="flex flex-row pl-1 pr-4 lg:px-8 py-8 items-center w-full justify-between">
            <BreadCumbCustom
              label="Dashboard"
              labelPage="Budgets"
              labelDetail="Add Budget"
              iconHome={<HouseIcon />}
            />
          </div>
          <div className="pl-1 pr-4 lg:px-8 w-full max-w-full h-screen max-h-full">
            <div className="flex flex-col justify-center w-full lg:px-0 max-w-[90rem] mx-auto gap-3">
              <h3 className="text-xl font-semibold"></h3>
    
              <FormBudget tokens={tokens} budgetBase64={budgets} users={users}/>
            </div>
          </div>
        </>
      );
}

export default EditBudgets