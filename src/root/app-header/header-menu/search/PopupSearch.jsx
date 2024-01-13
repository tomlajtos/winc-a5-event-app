import {
  Input as CInput,
  Modal,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  Spacer,
} from "@chakra-ui/react";

import { useSearchQuery } from "../../../../context/SearchContext";
import { PopupSearchErrorBoundary } from "../../../../error-boundaries/PopupSearchErrorBoundary";
import { CompactEventList } from "./CompactEventList";
// Utils import
import { Logger } from "../../../../util/Logger";

export const PopupSearch = ({ inputRef, isOpen, onClose }) => {
  const { searchQ, setSearchQ } = useSearchQuery();
  return (
    <Modal
      size={["full", null, "xl"]}
      initialFocusRef={inputRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Logger type="render" target="component" name="PopupSearch" level={4} />
      <ModalOverlay
        backdropFilter="auto"
        backdropBlur="50px"
        backdropSaturate="500%"
      />
      <ModalContent bg="whiteAlpha.300">
        <ModalCloseButton size="sm" />
        <ModalBody px={[0, 0, 4]} py={10} align="center">
          <CInput
            ref={inputRef}
            w={["330px"]}
            name="search"
            variant="outline"
            type="input"
            aria-label="popup-search"
            placeholder="Type event title..."
            _placeholder={{ color: "gray.300" }}
            rounded="xl"
            borderColor={"gray.300"}
            color="gray.200"
            focusBorderColor="purple.300"
            defaultValue={searchQ}
            onChange={(e) => {
              setSearchQ(e.target.value);
            }}
          />
          <Spacer h={6} />
          <PopupSearchErrorBoundary>
            <CompactEventList onClose={onClose} />
          </PopupSearchErrorBoundary>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
