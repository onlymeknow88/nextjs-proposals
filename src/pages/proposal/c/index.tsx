import { HouseIcon } from "@/components/organisms/Icons/breadcrumb/house-icon";
import FormProposal from "@/components/organisms/Proposals/Form/create";
import React from "react";
import BreadCumbCustom from "@/components/atoms/Breadcumb";

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

interface ProposalProps {
  tokens: string;
}

// export const CreateProposals = ({areas}: ProposalProps) => {
export const CreateProposals = ({ tokens }: ProposalProps) => {
  return (
    <>
      {/* <div className="sticky top-0 bg-default-50 z-20 pb-3 pt-4 ">
        <div className="overflow-x-hidden relative">
          <div className="flex flex-row px-8 items-center w-full h-[3rem]">
          <BreadCumbCustom
            label="Dashboard"
            labelPage="Proposal"
            labelDetail="Form Pengajuan"
            iconHome={<HouseIcon />}
            // iconPage={<FileTextIcons />}
          />
          </div>
        </div>
      </div> */}
      <div className="flex flex-row pl-1 pr-4 lg:px-8 py-8 items-center w-full justify-between">
        <BreadCumbCustom
          label="Dashboard"
          labelPage="Proposal"
          labelDetail="Form Pengajuan"
          iconHome={<HouseIcon />}
          // iconPage={<FileTextIcons />}
        />
        {/* <div className="w-[18rem] lg:w-[18rem]">
          <Datepicker
            placeholder={"Date Range"}
            //@ts-ignore
            value={value}
            onChange={handleDataRangeChange}
            inputClassName={`relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full border-default-500 border-1 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 rounded-xl tracking-wide font-light text-sm placeholder-gray-400 bg-white focus:ring disabled:opacity-60 disabled:cursor-not-allowed focus:border-default-500 focus:ring-white`}
            toggleClassName={`absolute right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-75 disabled:cursor-not-allowed`}
          />
        </div> */}
      </div>
      <div className="pl-1 pr-4 lg:px-8 w-full max-w-full h-screen max-h-full">
        <div className="flex flex-col justify-center w-full lg:px-0 max-w-[90rem] mx-auto gap-3">
          <h3 className="text-xl font-semibold">Pengajuan Proposal</h3>

          {/* <FormProposal areas={areas}/> */}
          <FormProposal tokens={tokens} />
        </div>
      </div>
    </>
  );
};

export default CreateProposals;
