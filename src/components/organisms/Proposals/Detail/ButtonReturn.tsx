import { TextArea } from "@/components/atoms/TextArea";
import { returnProposalById } from "@/services/proposal";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

interface ProposalReturnTypes {
  note: string;
}

export const ButtonReturn = ({ proposals, users, tokens }: any) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isloading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    role_id: "",
  });

  const [proposal, setProposals] = useState<ProposalReturnTypes>({
    note: "",
  });

  const handleReturn = async (e: any) => {
    e.preventDefault();
    // Set loading state if needed
    setLoading(true);

    // Perform noted for return action
    const res = await returnProposalById(proposal, proposals.id, tokens);

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

  useEffect(() => {
    const user = JSON.parse(users);
    if (user) {
      // const userParse = JSON.parse(atob(user));
      // console.log(user.role_id)

      if (user.role == 2) {
        // 2 = approver
        // console.log(userParse);
        setIsLogin(true);
        // setUser(userParse);
      } else {
        // 1 = user
        setIsLogin(false);
      }
    }
  }, [users]);

  return (
    <>
      {isLogin ? (
        <Button
          onPress={onOpen}
          size="md"
          color="warning"
          className="lg:text-sm text-white text-lg h-[50px] lg:h-[34px]"
        >
          Return
        </Button>
      ) : (
        <></>
      )}

      <Modal
        backdrop="blur"
        size="2xl"
        isOpen={isOpen}
        isDismissable={false}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Return Proposal
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2 mb-2">
                  <TextArea
                    label="Noted"
                    variants="bordered"
                    maxRows={5}
                    disableAnimation
                    disableAutosize
                    classNames={{
                      inputWrapper: "border-1 border-gray-400",
                      input: "w-[100%] resize-y h-[100px]",
                    }}
                    // value={proposal.note}
                    onChange={(e: any) =>
                      setProposals({ ...proposal, note: e.target.value })
                    }
                  />
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
                        color="warning"
                        onClick={handleReturn}
                        className="text-white"
                      >
                        Return
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
};
