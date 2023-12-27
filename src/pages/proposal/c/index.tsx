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
          hrefChild='/proposal'
          isBreadcrumb={true}
          isBreadcrumbList={true}

        />
      </div>
      <div className="pl-0 pr-4 lg:px-8 w-full max-w-full h-screen max-h-full">
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
