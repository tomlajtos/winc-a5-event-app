import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useDisclosure, Center, Input as CInput } from "@chakra-ui/react";
import { PopupSearch } from "./PopupSearch";
import { useSearchContext } from "../../../../context/SearchContext";
import { Logger } from "../../../../util/Logger";

export const Search = ({ inputProps, props }) => {
  const { searchValue, setSearchValue } = useSearchContext();

  const { pathname } = useLocation();
  const popupSearchModal = useDisclosure();
  const popupSearch = useRef("");

  // handle popupSearchModal closing
  const closePopupSearch = () => {
    searchValue !== "" ? setSearchValue("") : searchValue;
    popupSearchModal.onClose();
  };

  // close popupSearchModal if route location is "/"
  if (pathname === "/" && popupSearchModal.isOpen) {
    closePopupSearch();
    searchValue !== "" ? setSearchValue("") : searchValue;
  }

  // event handlers for search input
  const handleChange = () => (e) => setSearchValue(e.target.value);
  const handleClick = () => {
    if (pathname !== "/") {
      searchValue !== "" ? setSearchValue("") : searchValue;
      popupSearchModal.onOpen();
    }
  };

  // open/close popupSearchModal on search input keydown
  const handleKeyDown = (e) => {
    if (pathname !== "/") {
      e.key === "Enter"
        ? popupSearchModal.onOpen()
        : e.key === "Escape"
          ? closePopupSearch()
          : e.preventDefault();
    }
  };

  return (
    <Logger name="search" level={7}>
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
          defaultValue={searchValue}
          onChange={handleChange}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          {...inputProps}
        />
        {pathname !== "/" && (
          <PopupSearch
            inputRef={popupSearch}
            isOpen={popupSearchModal.isOpen}
            onClose={closePopupSearch}
          />
        )}
      </Center>
    </Logger>
  );
};
