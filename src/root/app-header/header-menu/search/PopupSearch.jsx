// React and React Router imports
import { useRef } from "react";
// Chakra-ui imports
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
} from "@chakra-ui/react";
// Error component imports
import { ErrorBoundary } from "../../../../error-boundaries/ErrorBoundary";
// Component imports
import { CompactEventList } from "./CompactEventList";
import { Search } from "./Search";

export const PopupSearch = ({ isOpen, onClose }) => {
  const focusRef = useRef("");
  return (
    <Modal
      size={["full", null, "xl"]}
      initialFocusRef={focusRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay
        backdropFilter="auto"
        backdropBlur="4px"
        backdropSaturate="150%"
      />
      <ModalContent bg="blackAlpha.400">
        <ModalCloseButton size="sm" color="gray.400" />
        <ModalBody px={[0, null, 4]} py={10} align="center">
          <Search
            inputProps={{
              ref: focusRef,
              w: ["280px", "330px"],
              _placeholder: { color: "gray.300" },
              borderColor: "gray.200",
              color: "gray.200",
            }}
          />
          <ErrorBoundary>
            <CompactEventList onClose={onClose} />
          </ErrorBoundary>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
