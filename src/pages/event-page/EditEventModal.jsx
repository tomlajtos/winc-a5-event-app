import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { EditEventForm } from "../../components/forms/EditEventForm";

export const EditEventModal = ({ event, fetcher, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={["full", null, "lg"]}>
      <ModalOverlay
        bg="blackAlpha.500"
        backdropFilter="auto"
        backdropBlur="5px"
      >
        <ModalContent backgroundColor="whiteAlpha.900">
          <ModalHeader fontSize="2xl" background="transparent">
            Edit event
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody background="transparent">
            <EditEventForm fetcher={fetcher} event={event} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};
