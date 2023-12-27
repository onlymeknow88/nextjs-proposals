import BreadCumbCustom from '@/components/atoms/Breadcumb';
import FormArea from '@/components/organisms/Areas/Form/edit';
import { HouseIcon } from '@/components/organisms/Icons/breadcrumb/house-icon';
import { getAreaById } from '@/services/area';
import { AreasTypes, UserTypes } from '@/services/data-types';
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

  const res = await getAreaById(id, access_token);
  const data = res.data.result;
  const areaBase64 = btoa(JSON.stringify(data));


  return {
    props: {
      tokens: access_token,
      users: user,
      areas: areaBase64,
    },
  };
}

interface AreaProps {
  areas: AreasTypes;
  users: UserTypes;
  tokens: string;
}



const EditAreas = ({
  areas,
  users,
  tokens,
}: AreaProps) => {
    return (
        <>
          <div className="flex flex-row pl-1 pr-4 lg:px-8 py-8 items-center w-full justify-between">
            <BreadCumbCustom
              label="Dashboard"
              labelPage="Area"
              labelDetail="Edit Area"
              iconHome={<HouseIcon />}
              isBreadcrumb={true}
            isBreadcrumbList={true}
            />
          </div>
          <div className="pl-0 pr-4 lg:px-8 w-full max-w-full h-screen max-h-full">
            <div className="flex flex-col justify-center w-full lg:px-0 max-w-[90rem] mx-auto gap-3">
              <h3 className="text-xl font-semibold"></h3>
    
              <FormArea tokens={tokens} areaBase64={areas} users={users}/>
            </div>
          </div>
        </>
      );
}

export default EditAreas