import { TextArea } from "@/components/atoms/TextArea";
import { approveProposalById, returnProposalById } from "@/services/proposal";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import React, { use, useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { setLogin } from "@/services/auth";

export const ButtonApproved = ({ proposals, users, tokens }: any) => {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isloading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isDeptHead, setDeptHead] = useState(false);
  const [isDivHead, setDivHead] = useState(false);
  const [isDirector, setDirector] = useState(false);
  const [user, setUser] = useState({
    role_id: "",
  });

  const handleApproval = async (e: any) => {
    e.preventDefault();
    // Set loading state if needed
    setLoading(true);
    const user = JSON.parse(users);
    // Perform for approved action
    const res = await approveProposalById(
      proposals.id,
      user.nik,
      "approve",
      tokens
    );

    // console.log(res.data);

    // Reset loading state
    setLoading(false);

    // Close the modal
    onClose();
    router.push("/proposal");
  };

  const getDeptApproval = useCallback(() => {
    if (
      proposals.sts_app_dh == 0 &&
      proposals.sts_app_dh2 == 0 &&
      proposals.sts_app_dr == 0
    ) {
      return true;
    } else {
      return false;
    }
  }, [proposals]);

  const getDivApproval = useCallback(() => {
    if (
      proposals.sts_app_dh == 2 &&
      proposals.sts_app_dh2 == 0 &&
      proposals.sts_app_dr == 0
    ) {
      return true;
    } else {
      return false;
    }
  }, [proposals]);

  const handleClose = () => {
    setLoading(false);
    onClose();
  };

  const x = JSON.parse(users);

  if (x.is_dept_head == 1) {
    return (
      <>
        {getDeptApproval() ? (
          <Button
            onPress={onOpen}
            size="md"
            color={getDivApproval() ? "default" : "primary"}
            className="lg:text-sm text-lg h-[50px] lg:h-[34px]"
            isDisabled={getDeptApproval() ? false : true}
          >
            Approved
          </Button>
        ) : (
          <></>
        )}
        <Modal
          backdrop="blur"
          size="sm"
          isOpen={isOpen}
          isDismissable={false}
          hideCloseButton
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex items-center gap-1">
                <p>Apporved</p>
                  <span className="text-xs text-default-500">{x.name}</span>
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-2 mb-2">
                    <div className="flex justify-end gap-2 mt-4">
                      {isloading ? (
                        <Button
                          isLoading
                          color="danger"
                          variant="solid"
                          spinner={
                            <svg
                              className="animate-spin h-5 w-5 text-current"
                              fill="none"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                fill="currentColor"
                              />
                            </svg>
                          }
                        >
                          Loading
                        </Button>
                      ) : (
                        <Button
                          variant="solid"
                          color="primary"
                          onClick={handleApproval}
                          // className="text-white"
                        >
                          Approved
                        </Button>
                      )}
                      <Button
                        onPress={handleClose}
                        variant="flat"
                        color="default"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }

  if (x.is_div_head == 1) {
    return (
      <>
        {getDivApproval() ? (
          <Button
            onPress={onOpen}
            size="md"
            color={getDivApproval() ? "default" : "primary"}
            className="lg:text-sm text-lg h-[50px] lg:h-[34px]"
            isDisabled={getDivApproval() ? false : true}
          >
            Approved
          </Button>
        ) : (
          <></>
        )}

        <Modal
          backdrop="blur"
          size="sm"
          isOpen={isOpen}
          isDismissable={false}
          hideCloseButton
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                <p>Apporved</p>
                  <span className="text-xs text-default-500">{x.name}</span>
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-2 mb-2">
                    <div className="flex justify-end gap-2 mt-4">
                      {isloading ? (
                        <Button
                          isLoading
                          color="danger"
                          variant="solid"
                          spinner={
                            <svg
                              className="animate-spin h-5 w-5 text-current"
                              fill="none"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                fill="currentColor"
                              />
                            </svg>
                          }
                        >
                          Loading
                        </Button>
                      ) : (
                        <Button
                          variant="solid"
                          color="primary"
                          onClick={handleApproval}
                          // className="text-white"
                        >
                          Approved
                        </Button>
                      )}
                      <Button
                        onPress={handleClose}
                        variant="flat"
                        color="default"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
};
