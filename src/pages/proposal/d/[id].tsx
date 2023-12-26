import { HouseIcon } from "@/components/organisms/Icons/breadcrumb/house-icon";
import { DetailsProposal as Details } from "@/components/organisms/Proposals/Detail";
import React from "react";
import { getProposalById } from "@/services/proposal";
import { ProposalTypes, UserTypes } from "@/services/data-types";
import BreadCumbCustom from "@/components/atoms/Breadcumb";

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

  // const tokenPassport = atob(token);

  if (!access_token) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  const res = await getProposalById(id, access_token);

  // console.log(res)
  const data = res.data.result;
  // console.log(data)
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

export const DetailProposal = ({
  proposals,
  users,
  tokens,
}: ProposalProps) => {
  // console.log('ini token',tokens)
  return (
    <>
      {/* <div className="sticky top-0 bg-default-50 z-20 pb-3 pt-4  ">
        <div className="overflow-x-hidden relative">
          <div className="flex flex-row px-8 items-center w-full h-[3rem]">
            <BreadCumbCustom
              label="Dashboard"
              labelPage="Proposal"
              labelDetail="Detail"
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
          labelDetail="Detail"
          iconHome={<HouseIcon />}
          // iconPage={<FileTextIcons />}
        />
      </div>
      <div className="pl-1 pr-4 lg:px-8 w-full max-w-full h-screen max-h-full">
        <div className="flex flex-col justify-center w-full lg:px-0  max-w-[90rem] mx-auto gap-3">

          <h3 className="text-xl font-semibold">Detail Proposal</h3>
          <Details
            proposalBase64={proposals}
            users={users}
            tokens={tokens}
          />
        </div>
      </div>
    </>
  );
};

export default DetailProposal;
