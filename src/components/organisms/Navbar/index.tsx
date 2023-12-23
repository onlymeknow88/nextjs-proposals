import { PageHeaderFirstSection } from "@/components/organisms/Navbar/PageHeaderFirstSection";
import { UserDropdown } from "./user-dropdown";

import { useCallback, useState } from "react";
import { ModalMenu } from "./user-dropdown-mobile";
import { getUserLogin } from "@/services/auth";

interface GetServerSideProps {
  users: string
  tokens: string;
}

export const Navbar = () => {

// const {users, tokens} = props
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

  return (
    <div className="bg-gradient-to-r from-lime-500 to-green-500">
      <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-2 mx-4">
        <PageHeaderFirstSection hidden={showFullWidthSearch} />
        <div className="px-4 flex justify-center items-center">
          <div className="hidden sm:block">
            <UserDropdown/>
          </div>
          <ModalMenu />
        </div>
      </div>
    </div>
  );
};


 
