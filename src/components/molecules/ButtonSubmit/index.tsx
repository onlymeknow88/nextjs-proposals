import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Button,
  } from "@nextui-org/react";
  import React, { useState } from "react";
  
  export const ButtonSubmit = ({ onSubmit }:any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isloading, setLoading] = useState(false);
  
    const handleSubmit = async (e:any) => {
      e.preventDefault();
      // Set loading state if needed
      setLoading(true);
  
      // Perform delete action
      await onSubmit();
  
      // Reset loading state
      setLoading(false);
  
      // Close the modal
      onClose();
    };
  
      const handleClose = () => {
          setLoading(false);
          onClose();
      };
  
    return (
      <>
        <Button radius="sm" onPress={onOpen} size="md" color="primary" className="lg:text-sm text-lg h-[50px] lg:h-[34px] md:h-[34px] md:text-sm">
          Submit
        </Button>
        <Modal placement="center" backdrop="blur" size="md" isOpen={isOpen} isDismissable={false} hideCloseButton>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Submit
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-2 mb-2">
                    <span>
                      Are you sure want to submit?
                    </span>
                    <div className="flex justify-end gap-2 mt-4">
                      {isloading ? (
                        <Button
                          isLoading
                          isDisabled
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
                          onClick={handleSubmit}
                          className="text-white"
                          radius="sm"
                        >
                          Submit
                        </Button>
                      )}
                      <Button onPress={handleClose}  variant="flat" color="default" radius="sm">
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
  