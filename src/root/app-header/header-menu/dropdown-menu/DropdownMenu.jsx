// Chakra-ui imports
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  Spacer,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
// Component imports
import { CategoryFilters } from "../CategoryFilters";
import { Navigation } from "./Navigation";
import { Search } from "../search/Search";

export const DropdownMenu = ({ layout }) => {
  return (
    <Menu
      closeOnSelect={false}
      gutter={12}
      isLazy={true}
      lazyBehavior="keepMounted"
      placement="auto-start"
    >
      <MenuButton
        as={IconButton}
        arai-label="Options"
        icon={<HamburgerIcon />}
        variant="solid"
        size={["sm", "md"]}
        width={["32px", "40px"]} // to make sure the 'sm' button is square too
        colorScheme="purple"
      />
      <MenuList
        pt={[4, 4, 0]}
        direction="column"
        minWidth={["250px", "300px"]}
        maxH="90vh"
        spacing={0}
        backgroundColor="whiteAlpha.900"
        color="gray.900"
        border="none"
      >
        {layout == "min" && (
          <Search
            props={{
              width: "90%",
              mx: "auto",
            }}
            inputProps={{
              backgroundColor: "whiteAlpha.600",
            }}
          />
        )}
        <Spacer height={[2, 1, 2]} />
        <Navigation />
        <Spacer height={[0.5, 1, 2]} />
        <MenuDivider borderColor="gray.400" width="95%" mx="auto" my={0} />
        <Spacer height={[0.5, 1, 2]} />
        <CategoryFilters />
        <Spacer height={[0.5, 1, 2]} />
      </MenuList>
    </Menu>
  );
};
