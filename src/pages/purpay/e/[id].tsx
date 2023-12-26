import BreadCumbCustom from '@/components/atoms/Breadcumb';
import { HouseIcon } from '@/components/organisms/Icons/breadcrumb/house-icon';
import FormPurpay from '@/components/organisms/Purpay/Form/edit';
import { PurpayTypes, UserTypes } from '@/services/data-types';
import { getPurpayById } from '@/services/purpay';
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

  const res = await getPurpayById(id, access_token);
  const data = res.data.result;
  // console.log(data)
  const purpayBase64 = btoa(JSON.stringify(data));

  return {
    props: {
      tokens: access_token,
      users: user,
      purpays: purpayBase64,
    },
  };
}
  
  interface PurpaysProps {
    tokens: string;
    users: UserTypes;
    purpays: PurpayTypes
  }

const EditPurpays = ({tokens, users, purpays}: PurpaysProps) => {
    return (
        <>
          <div className="flex flex-row pl-1 pr-4 lg:px-8 py-8 items-center w-full justify-between">
            <BreadCumbCustom
              label="Dashboard"
              labelPage="GL Accounts"
              labelDetail="Edit GL Account"
              iconHome={<HouseIcon />}
            />
          </div>
          <div className="pl-1 pr-4 lg:px-8 w-full max-w-full h-screen max-h-full">
            <div className="flex flex-col justify-center w-full lg:px-0 max-w-[90rem] mx-auto gap-3">
              <h3 className="text-xl font-semibold"></h3>
    
              <FormPurpay tokens={tokens} purpayBase64={purpays} users={users}/>
            </div>
          </div>
        </>
      );
}

export default EditPurpays