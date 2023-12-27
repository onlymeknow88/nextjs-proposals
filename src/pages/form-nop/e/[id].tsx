import BreadCumbCustom from '@/components/atoms/Breadcumb';
import FormNop from '@/components/organisms/FormNop/edit';
import { HouseIcon } from '@/components/organisms/Icons/breadcrumb/house-icon';
import { FormNopTypes, UserTypes } from '@/services/data-types';
import { getFormNopById } from '@/services/form-nop';
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
  
    const res = await getFormNopById(id, access_token);
    const data = res.data.result;
    const formNopsBase64 = btoa(JSON.stringify(data));
  
    return {
      props: {
        tokens: access_token,
        users: user,
        formNops: formNopsBase64,
      },
    };
  }
  
  interface CcowProps {
    formNops: FormNopTypes;
    users: UserTypes;
    tokens: string;
  }

const EditFormNops = ({ formNops, users, tokens }: CcowProps) => {
    return (
      <>
        <div className="flex flex-row pl-1 pr-4 lg:px-8 py-8 items-center w-full justify-between">
          <BreadCumbCustom
            label="Dashboard"
            labelPage="Non Order Payment"
            labelDetail="Edit Non Order Payment"
            iconHome={<HouseIcon />}
            isBreadcrumb={true}
            isBreadcrumbList={true}
          />
        </div>
        <div className="pl-0 pr-4 lg:px-8 w-full max-w-full h-screen max-h-full">
          <div className="flex flex-col justify-center w-full lg:px-0 max-w-[90rem] mx-auto gap-3">
            <h3 className="text-xl font-semibold"></h3>
  
            <FormNop tokens={tokens} formNopsBase64={formNops} users={users}/>
          </div>
        </div>
      </>
    );
  };
  
  export default EditFormNops;