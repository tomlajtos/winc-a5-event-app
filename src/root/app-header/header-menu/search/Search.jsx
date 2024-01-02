import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useDisclosure, Center, Input as CInput } from "@chakra-ui/react";

import { PopupSearch } from "./PopupSearch";

import { Logger } from "../../../../util/Logger";
import { useSearchQuery } from "../../../../context/SearchContext";

export const Search = ({ inputProps, props }) => {
  const { searchQ, setSearchQ } = useSearchQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();
  const popupSearch = useRef("");

  const closePopupSearch = () => {
    setSearchQ("");
    onClose();
  };

  return (
    <Center {...props}>
      <Logger type="render" target="component" name="Search" level={3} />
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
          if (pathname == "/") {
            setSearchQ(e.target.value);
          }
        }}
        {...inputProps}
        onClick={() => (pathname !== "/" ? onOpen() : closePopupSearch())}
        onKeyDown={(e) =>
          (() => {
            if (pathname !== "/" && e.key === "Enter") {
              onOpen();
            } else if (pathname !== "/" && e.key === "Escape") {
              closePopupSearch();
            }
          })()
        }
      />
      {pathname !== "/" && (
        <PopupSearch
          inputRef={popupSearch}
          isOpen={isOpen}
          onClose={closePopupSearch}
        />
      )}
    </Center>
  );
};
