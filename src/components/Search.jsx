import { useState, useEffect, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  useDisclosure,
  Center,
  Input as CInput,
  Portal,
} from "@chakra-ui/react";

import { RootContext } from "../context/RootContext";
import { ModalSearch } from "./search/ModalSearch";

import { log } from "../util/Logger";

export const Search = ({ inputProps, props }) => {
  const { searchQ, setSearchQ, categories } = useContext(RootContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const popupSearch = useRef("");

  // TODO: find out if 'open Modal on "Enter" down event' is possible without useEffect
  // does not seem so... keep looking...
  useEffect(() => {
    const open = () => setIsModalOpen(isOpen);
    open();
  }, [isOpen]);

  const closeSearchModal = () => {
    setSearchQ("");
    onClose();
  };

  log.comp("Search", "purple", "white");

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
        <ModalSearch
          inputRef={popupSearch}
          categories={categories}
          isOpen={isModalOpen}
          onClose={closeSearchModal}
          searchQ={searchQ}
          setSearchQ={setSearchQ}
        />
      </Portal>
    </Center>
  );
};
