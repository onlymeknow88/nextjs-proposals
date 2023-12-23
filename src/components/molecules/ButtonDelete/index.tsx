import {
    Modal,
    ModalBody,
    ModalHeader,
    ModalContent,
    ModalFooter,
    useDisclosure,
    Button,
  } from "@nextui-org/react";
  import {  useState } from "react";
  import { useRouter } from "next/router";
import { DeleteIcon } from "@/components/organisms/Icons/Table/delete-icon";
  
  export const ModalDelete = ({ onDelete }:any) => {
    const router = useRouter();
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [isloading, setLoading] = useState(false);
  
    const handleDelete = async () => {
      // Set loading state if needed
      setLoading(true);
  
      // Perform delete action
      await onDelete();
  
      // Reset loading state
      setLoading(false);
  
      // Close the modal
      onClose();
    };
  
    return (
      <>
        <Button startContent={<DeleteIcon size={20} fill="#FF0080" />} onPress={onOpen} size="sm" className="bg-transparent text-md">
          Hapus
        </Button>
        <Modal
          backdrop="blur"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="xs"
          classNames={{
            closeButton: "text-2xl text-default-500",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Delete
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-2 mb-2">
                    <span>Are you sure want to delete this?</span>
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
                          color="danger"
                          onClick={handleDelete}
                          radius="sm"
                        >
                          Delete
                        </Button>
                      )}
                      <Button onPress={onClose} variant="flat" color="default" radius="sm" className="bg-default-100">
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
  