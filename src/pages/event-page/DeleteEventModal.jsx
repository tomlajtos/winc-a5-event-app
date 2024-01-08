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

export const DeleteEventModal = ({ event, fetcher, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
              <fetcher.Form method="delete" action={`/event/${event.id}`}>
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
              <Button text="Cancel" variant="base" size="sm" onClick={onClose}>
                Cancel
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};
