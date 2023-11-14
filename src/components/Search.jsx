import { useLocation, Link as RRLink } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import {
  useDisclosure,
  // Button,
  Center,
  Input as CInput,
  Modal,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  Portal,
  Stack,
  StackItem,
} from "@chakra-ui/react";
import { RootContext } from "../context/RootContext";

export const Search = ({ inputProps, props }) => {
  const { searchQ, setSearchQ, events } = useContext(RootContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const popupSearch = useRef("");

  // TODO: find out if 'open Modal on "Enter" down event' is possible without useEffect
  // does not seem so... still looking...
  useEffect(() => {
    const open = () => setIsModalOpen(isOpen);
    open();
  }, [isOpen]);

  const closeSearchModal = () => {
    setSearchQ("");
    onClose();
  };

  return (
    <Center {...props}>
      <CInput
        type="search"
        name="search"
        variant={"outline"}
        placeholder="Search for an event..."
        rounded={"full"}
        minW="225px"
        maxW="500px"
        px={6}
        color="gray.200"
        focusBorderColor="purple.300"
        defaultValue={searchQ}
        onChange={(e) => {
          setSearchQ(e.target.value);
        }}
        {...inputProps}
        onClick={() => (pathname !== "/" ? onOpen() : closeSearchModal())}
        onKeyDown={(e) =>
          (() => {
            if (pathname !== "/" && e.key === "Enter") {
              // console.log(1, e.key, ">", pathname);
              // console.log(e.key === "Enter");
              onOpen();
            } else if (pathname !== "/" && e.key === "Escape") {
              // console.log(2, e.key, ">", pathname);
              closeSearchModal();
            }
          })()
        }
      />
      <Portal>
        <Modal
          initialFocusRef={popupSearch}
          isOpen={isModalOpen}
          onClose={closeSearchModal}
          // returnFocusOnClose={false}
        >
          <ModalOverlay
            backdropFilter="auto"
            backdropBlur="50px"
            backdropSaturate="500%"
          />
          <ModalContent bg="whiteAlpha.300">
            <ModalCloseButton size="sm" />
            <ModalBody>
              <CInput
                ref={popupSearch}
                my={8}
                name="search"
                variant="outline"
                type="input"
                aria-label="popup-search"
                placeholder="search input inside modal"
                rounded="xl"
                borderColor={"gray.300"}
                color="gray.200"
                focusBorderColor="purple.300"
                defaultValue={searchQ}
                onChange={(e) => {
                  setSearchQ(e.target.value);
                }}
              />
              <Stack>
                {events
                  ?.filter((event) =>
                    event.title.toLowerCase().includes(searchQ.toLowerCase()),
                  )
                  .map((event) => (
                    <StackItem key={event.id}>
                      <RRLink to={`/event/${event.id}`}></RRLink>
                    </StackItem>
                  ))}
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Portal>
    </Center>
  );
};
