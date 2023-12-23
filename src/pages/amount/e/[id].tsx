import BreadCumbCustom from "@/components/atoms/Breadcumb";
import FormAmount from "@/components/organisms/Amount/Form/edit";
import { HouseIcon } from "@/components/organisms/Icons/breadcrumb/house-icon";
import { getAmountById } from "@/services/amount";
import { AmountTypes, UserTypes } from "@/services/data-types";
import React from "react";

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
  
    const res = await getAmountById(id, access_token);
    const data = res.data.result;
    console.log(data)
    const amountBase64 = btoa(JSON.stringify(data));
    return {
      props: {
        tokens: access_token,
        users: user,
        amounts: amountBase64,
      },
    };
  }
  
  interface AmountProps {
    amounts: AmountTypes;
    users: UserTypes;
    tokens: string;
  }
  

const CreateAmounts = ({ tokens,amounts, users }: AmountProps) => {
  return (
    <>
      <div className="flex flex-row pr-8 pl-4 lg:px-8 py-8 items-center w-full justify-between">
        <BreadCumbCustom
          label="Dashboard"
          labelPage="Amounts"
          labelDetail="Add Amount"
          iconHome={<HouseIcon />}
        />
      </div>
      <div className="pr-8 pl-4 lg:px-8 w-full max-w-full h-screen max-h-full">
        <div className="flex flex-col justify-center w-full lg:px-0 max-w-[90rem] mx-auto gap-3">
          <h3 className="text-xl font-semibold"></h3>

          <FormAmount tokens={tokens} amountBase64={amounts} users={users}/>
        </div>
      </div>
    </>
  );
};

export default CreateAmounts;
