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
import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export const ButtonRejected = ({ proposals, users, tokens }: any) => {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isloading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isDeptHead, setDeptHead] = useState(false);
  const [isDivHead, setDivHead] = useState(false);
  const [user, setUser] = useState({
    role_id: "",
    nik: "",
  });

  const handleRejected = async (e: any) => {
    e.preventDefault();
    // Set loading state if needed
    setLoading(true);
    const user = JSON.parse(users);
    // Perform for approved action
    const res = await approveProposalById(
      proposals.id,
      user.nik,
      "rejected",
      tokens
    );
    // console.log(res.data);

    // Reset loading state
    setLoading(false);

    // Close the modal
    onClose();
    router.push("/proposal");
  };

  const handleClose = () => {
    setLoading(false);
    onClose();
  };

  //reject status for dept head
  const getDeptReject = useCallback(() => {
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

  //reject status for dept head
  const getDivReject = useCallback(() => {
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

  //get users from server side
  const x = JSON.parse(users);
  //div head reject
  if (x.is_div_head == 1) {
    return (
      <>
        {getDivReject() ? (
          <Button
            onPress={onOpen}
            size="md"
            color={getDivReject() ? "danger" : "default"}
            className="lg:text-sm text-lg h-[50px] lg:h-[34px]"
            isDisabled={getDivReject() ? false : true}
          >
            Rejected
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
                <p>Rejected</p>
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
                          color="danger"
                          onClick={handleRejected}
                          // className="text-white"
                        >
                          Rejected
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

  //dept head reject
  if (x.is_dept_head == 1) {
    return (
      <>
        {getDeptReject() ? (
          <Button
            onPress={onOpen}
            size="md"
            color={getDeptReject() ? "danger" : "default"}
            className="lg:text-sm text-lg h-[50px] lg:h-[34px]"
            isDisabled={getDeptReject() ? false : true}
          >
            Rejected
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
                  <p>Rejected</p>
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
                          color="danger"
                          onClick={handleRejected}
                          // className="text-white"
                        >
                          Rejected
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
