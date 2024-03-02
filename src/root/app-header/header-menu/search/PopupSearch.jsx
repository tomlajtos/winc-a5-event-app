import { useRef } from "react";
import {
  Input as CInput,
  Modal,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
} from "@chakra-ui/react";

import { useSearchContext } from "../../../../context/SearchContext";
import { ErrorBoundary } from "../../../../error-boundaries/ErrorBoundary";
import { CompactEventList } from "./CompactEventList";
// Utils import

export const PopupSearch = ({ isOpen, onClose }) => {
  const { searchValue, setSearchValue } = useSearchContext();
  const ref = useRef();
  return (
    <Modal
      size={["full", null, "xl"]}
      initialFocusRef={ref}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay
        backdropFilter="auto"
        backdropBlur="4px"
        backdropSaturate="150%"
      />
      <ModalContent bg="blackAlpha.300">
        <ModalCloseButton size="sm" color="gray.400" />
        <ModalBody px={[0, 0, 4]} py={10} align="center">
          <CInput
            ref={ref}
            w={["280px", "330px"]}
            name="search"
            variant="outline"
            type="input"
            aria-label="popup-search"
            placeholder="Type an event title..."
            _placeholder={{ color: "gray.300" }}
            rounded="xl"
            borderColor={"gray.300"}
            color="gray.200"
            focusBorderColor="purple.300"
            defaultValue={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
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
