import BreadCumbCustom from "@/components/atoms/Breadcumb";
import { HouseIcon } from "@/components/organisms/Icons/breadcrumb/house-icon";
import { FormProposal } from "@/components/organisms/Proposals/Form/edit";
import { ProposalTypes, UserTypes } from "@/services/data-types";
import { getProposalById } from "@/services/proposal";
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

  const res = await getProposalById(id, access_token);
  // console.log(res);
  const data = res.data.result;
  const proposalBase64 = btoa(JSON.stringify(data));


  return {
    props: {
      tokens: access_token,
      users: user,
      proposals: proposalBase64,
    },
  };
}

interface ProposalProps {
  proposals: ProposalTypes;
  users: UserTypes;
  tokens: string;
}

export const EditProposals = ({
  proposals,
  users,
  tokens,
}: ProposalProps) => {
  // console.log(tokens)
  return (
    <>
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

          <FormProposal
            proposalBase64={proposals}
            users={users}
            tokens={tokens}
          />
        </div>
      </div>
    </>
  );
};

export default EditProposals;
