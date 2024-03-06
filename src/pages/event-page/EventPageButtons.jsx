// React and React Router imports
// Chakra-ui imports
// Context and custom hook imports
// Component imports
// Error component imports
// Util and I/O imports
// Assets imports

// React and React Router imports
import { Link } from "react-router-dom";
// Chakra-ui imports
import { Flex, IconButton, Spacer } from "@chakra-ui/react";
import { CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

export const EventPageButtons = ({ onEditClick, onDeleteClick }) => {
  return (
    <Flex
      width="98%"
      mx="auto"
      px={[2, 4, 6]}
      py={[1, 1.5, 2]}
      position="sticky"
      top={[1.5, 2]}
      flexDir="row"
      gap={2}
      border="1px solid"
      borderColor="gray.300"
      borderRadius={"2xl"}
      zIndex="docked"
      bg="whiteAlpha.400"
      backdropFilter="auto"
      backdropBlur="5px"
    >
      <IconButton
        as={Link}
        to="/"
        aria-label="Close event"
        icon={<CloseIcon fontSize={["12px", "12px"]} />}
        variant={["smRound", "mdRound"]}
        justifySelf="flex-start"
        isRound
      />
      <Spacer />
      <IconButton
        aria-label="Edit event"
        icon={<EditIcon fontSize={["14px", "20px"]} />}
        variant={["smRound", "mdRound"]}
        isRound
        onClick={() => {
          onEditClick();
        }}
      />
      <IconButton
        ml={[0, 2, 3]}
        aria-label="Delete event"
        icon={<DeleteIcon fontSize={["14px", "20px"]} />}
        variant={["smRound", "mdRound"]}
        isRound
        onClick={onDeleteClick}
      />
    </Flex>
  );
};
