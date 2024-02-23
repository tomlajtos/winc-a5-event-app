import { useRef } from "react";
import { useDeleteEvent } from "../../context/DeleteEventContext";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
} from "@chakra-ui/react";
import { toaster } from "../../util/toaster";

export const DeleteEventModal = () => {
  const { event, fetcher, deleteIsOpen, deleteOnClose, toast } =
    useDeleteEvent();

  const toastIdRef = useRef("");

  if (deleteIsOpen) {
    // toast
    toaster(toast, fetcher, { state: "><DEL><" }, toastIdRef);
  }

  return event ? (
    <Modal isOpen={deleteIsOpen} onClose={deleteOnClose}>
      <ModalOverlay
        bg="blackAlpha.500"
        backdropFilter="auto"
        backdropBlur="5px"
      >
        <ModalContent>
          <ModalHeader>Delete Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure that you want to delete this event?
          </ModalBody>
          <ModalFooter>
            <Stack direction="row" spacing={4}>
              <fetcher.Form method="delete">
                <Button
                  type="submit"
                  name="intent"
                  value="delete"
                  variant="permDel"
                  size="sm"
                  onMouseEnter={(e) =>
                    (e.target.offsetParent.style.backgroundColor =
                      // "#FED7D7")
                      "#FEB2B2")
                  }
                  onMouseLeave={(e) =>
                    (e.target.offsetParent.style.backgroundColor = "")
                  }
                >
                  Delete
                </Button>
              </fetcher.Form>
              <Button
                text="Cancel"
                variant="base"
                size="sm"
                onClick={deleteOnClose}
              >
                Cancel
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  ) : null;
};
