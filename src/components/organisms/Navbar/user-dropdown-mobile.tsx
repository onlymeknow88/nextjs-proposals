import React, { useCallback, useEffect, useState } from "react";

import {
  Avatar,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import NextLink from "next/link";
import { Closed } from "../Icons/Navbar/close";
import Cookies from "js-cookie";

import { useRouter } from "next/router";

import clsx from "clsx";
import { AccountsIcon } from "../Icons/sidebar/accounts-icon";
import { getUserLogin } from "@/services/auth";
// import { DarkModeSwitch } from "./darkmodeswitch";

export const ModalMenu = () => {
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    name: "",
  });

  const router = useRouter();

  const fetchUser = useCallback(async () => {
    setLoading(true);


      const res = await getUserLogin();
      setUser(res.data)
      
      setIsLogin(true);
  },[]);


  useEffect(() => {

  fetchUser()
  }, [fetchUser]);

  const onLogout = () => {
    Cookies.remove("token");
    router.push("/");
    setIsLogin(false);
  };

  if (isLogin) {
    return (
      <div className="sm:hidden">
        <Avatar
          onClick={onOpen}
          as="button"
          color="secondary"
          size="md"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
        <Modal
          isOpen={isOpen}
          placement="bottom-center"
          onOpenChange={onOpenChange}
          className="m-0 rounded-t-3xl"
          radius="none"
          // size="2xl"
          hideCloseButton
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col justify-start items-start">
                      <p>Signed in as</p>
                      <p className="text-md text-default-500">{user.name}</p>
                    </div>
                    <div className="">
                      <Button
                        // size="lg"
                        onClick={onClose}
                        className="rounded-full bg-transparent"
                        isIconOnly
                      >
                        <Closed />
                      </Button>
                    </div>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col pb-8 gap-1">
                    <MenuDropdownItem title="Profile" href="accounts" />
                    <MenuDropdownItem title="Change Password" href="accounts" />
                    <hr />
                    <MenuDropdownItem logout={onLogout} title="Logout" />
                    <br />
                    {/* <DarkModeSwitch /> */}
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
  }
};

type MenuDropdownItemProps = {
  title: string;
  href?: string;
  logout?: () => void;
};

function MenuDropdownItem({ title, href = "", logout }: MenuDropdownItemProps) {
  return (
    <NextLink
      href={href}
      onClick={logout}
      className="text-default-900 active:bg-none max-w-full"
    >
      <div
        className={clsx(
          "flex w-full min-h-[50px] h-full items-center px-3.5 cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-default-100"
        )}
      >
        <label
          className={clsx(
            title === "Logout" ? "text-danger" : "text-default-900"
          )}
        >
          {title}
        </label>
      </div>
    </NextLink>
  );
}
