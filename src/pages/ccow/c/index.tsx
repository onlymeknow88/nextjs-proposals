import BreadCumbCustom from "@/components/atoms/Breadcumb";
import { HouseIcon } from "@/components/organisms/Icons/breadcrumb/house-icon";
import React from "react";
import FormCcow from "@/components/organisms/Ccow/Form/create";

interface GetServerSideProps {
  req: {
    cookies: {
      access_token: string;
    };
  };
}

export async function getServerSideProps({ req }: GetServerSideProps) {
  const { access_token } = req.cookies;
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
    },
  };
}

interface CcowProps {
  tokens: string;
}

const CreateCcows = ({ tokens }: CcowProps) => {
  return (
    <>
      <div className="flex flex-row pl-1 pr-4 lg:px-8 py-8 items-center w-full justify-between">
        <BreadCumbCustom
          label="Dashboard"
          labelPage="Ccow"
          labelDetail="Add Ccow"
          iconHome={<HouseIcon />}
          hrefChild='/ccow'
          isBreadcrumb={true}
          isBreadcrumbList={true}
        />
      </div>
      <div className="pl-0 pr-4 lg:px-8 w-full max-w-full h-screen max-h-full">
        <div className="flex flex-col justify-center w-full lg:px-0 max-w-[90rem] mx-auto gap-3">
          <h3 className="text-xl font-semibold"></h3>

          <FormCcow tokens={tokens} />
        </div>
      </div>
    </>
  );
};

export default CreateCcows;
