// React and React Router imports
import { useLocation } from "react-router-dom";
// Chakra-ui imports
import { useDisclosure, Center, Input } from "@chakra-ui/react";
// Context and custom hook imports
import { useSearchContext } from "../../../../context/SearchContext";
// Component imports
import { PopupSearch } from "./PopupSearch";

export const Search = ({ inputProps, props }) => {
  const { searchValue, setSearchValue } = useSearchContext();
  const { pathname } = useLocation();
  const popupSearchModal = useDisclosure();
  const isReadOnly = pathname !== "/" && !inputProps.ref;

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
  const handleChange = (e) => setSearchValue(e.target.value);
  const handleClick = () => {
    if (pathname !== "/" && !inputProps.ref) {
      searchValue !== "" ? setSearchValue("") : searchValue;
      popupSearchModal.onOpen();
    }
  };

  // open/close popupSearchModal on search input keydown
  const handleKeyDown = (e) => {
    if (pathname !== "/" && !inputProps.ref) {
      e.key === "Enter"
        ? popupSearchModal.onOpen()
        : e.key === "Escape"
          ? closePopupSearch()
          : e.key;
    }
  };

  return (
    <Center className="search-input-container" {...props}>
      <Input
        type="search"
        name="search"
        variant={"search"}
        isReadOnly={isReadOnly}
        defaultValue={searchValue}
        placeholder="Type an event title..."
        maxW="500px"
        color="gray.200"
        onChange={handleChange}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...inputProps}
      />
      {pathname !== "/" && (
        <PopupSearch
          isOpen={popupSearchModal.isOpen}
          onClose={closePopupSearch}
        />
      )}
    </Center>
  );
};
