import {
  Input as CInput,
  Modal,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  Spacer,
} from "@chakra-ui/react";

import { CompactEventList } from "./CompactEventList";
import { Logger } from "../../util/Logger";
import { ModalSearchErrorBoundary } from "../../error-boundaries/ModalSearchErrorBoundary";

export const ModalSearch = ({
  inputRef,
  isOpen,
  onClose,
  searchQ,
  setSearchQ,
  categories,
}) => {
  return (
    <Modal
      size={["full", null, "xl"]}
      initialFocusRef={inputRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Logger type="render" name="SearchModal" color="cyan" bg="black" />
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
          <ModalSearchErrorBoundary>
            <CompactEventList
              categories={categories}
              searchQ={searchQ}
              onClose={onClose}
            />
          </ModalSearchErrorBoundary>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
