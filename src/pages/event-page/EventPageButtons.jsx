import { Link } from "react-router-dom";
import { Flex, IconButton, Spacer } from "@chakra-ui/react";
import { CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
export const EventPageButtons = ({ onEditClick, onDeleteClick }) => {
  return (
    <Flex
      width="98%"
      mx="auto"
      flexDir="row"
      gap={2}
      border="1px solid"
      borderColor="gray.200"
      px={[2, 4, 8]}
      py={[2, 4]}
      position="sticky"
      top={[1.5, 2]}
      zIndex="docked"
      bg="whiteAlpha.800"
      borderRadius={"2xl"}
    >
      <IconButton
        as={Link}
        to="/"
        aria-label="Close event"
        icon={<CloseIcon fontSize={["8px", "12px"]} />}
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
