import BreadCumbCustom from "@/components/atoms/Breadcumb";
import { HouseIcon } from "@/components/organisms/Icons/breadcrumb/house-icon";
import React from "react";
import FormCcow from "@/components/organisms/Ccow/Form/edit";
import { getCcowById } from "@/services/ccow";
import { CcowsTypes, UserTypes } from "@/services/data-types";

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

  const res = await getCcowById(id, access_token);
  const data = res.data.result;
  const ccowBase64 = btoa(JSON.stringify(data));

  return {
    props: {
      tokens: access_token,
      users: user,
      ccows: ccowBase64,
    },
  };
}

interface CcowProps {
  ccows: CcowsTypes;
  users: UserTypes;
  tokens: string;
}

const EditCcows = ({ ccows, users, tokens }: CcowProps) => {
  return (
    <>
      <div className="flex flex-row pr-8 pl-4 lg:px-8 py-8 items-center w-full justify-between">
        <BreadCumbCustom
          label="Dashboard"
          labelPage="Ccow"
          labelDetail="Add Ccow"
          iconHome={<HouseIcon />}
        />
      </div>
      <div className="pr-8 pl-4 lg:px-8 w-full max-w-full h-screen max-h-full">
        <div className="flex flex-col justify-center w-full lg:px-0 max-w-[90rem] mx-auto gap-3">
          <h3 className="text-xl font-semibold"></h3>

          <FormCcow tokens={tokens} ccowBase64={ccows} users={users}/>
        </div>
      </div>
    </>
  );
};

export default EditCcows;
