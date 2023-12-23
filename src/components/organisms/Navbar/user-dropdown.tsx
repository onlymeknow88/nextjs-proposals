import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarItem,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { DarkModeSwitch } from "./darkmodeswitch";

import { getUserLogin, setLogout } from "@/services/auth";
import axios from "axios";

export const UserDropdown = () => {
  // const { users, tokens } = props;
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    name: "",
  });
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    setLoading(true);

    const res = await getUserLogin();
    setUser(res.data.result);

    setIsLogin(true);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const onLogout = async (e: any) => {
    e.preventDefault();
    await axios.post("/api/logout", {});
    router.push("/");
    setIsLogin(false);
  };

  if (isLogin) {
    return (
      <Dropdown className="w-64 mt-4 mx-8">
        <div>
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              color="success"
              size="md"
              className="transition-transform"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              alt=""
              aria-labelledby="user-dropdown"
            />
          </DropdownTrigger>
        </div>
        <DropdownMenu
        // onAction={(actionKey) => console.log({ actionKey })}
        >
          <DropdownItem
            key="profile"
            className="flex flex-col justify-start w-full items-start"
            aria-labelledby="user-dropdown"
          >
            <p>Signed in as</p>
            <p>{user.name}</p>
          </DropdownItem>
          <DropdownItem
            onClick={onLogout}
            key="logout"
            color="danger"
            className="text-danger "
            aria-labelledby="user-dropdown"
          >
            Log Out
          </DropdownItem>
          {/* <DropdownItem key="switch">
            <DarkModeSwitch />
          </DropdownItem> */}
        </DropdownMenu>
      </Dropdown>
    );
  }
};
