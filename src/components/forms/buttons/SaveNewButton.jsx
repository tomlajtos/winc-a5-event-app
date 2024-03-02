import { IconButton } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

export const SaveNewButton = (props) => {
  return (
    <IconButton
      type="submit"
      form="new-event-form"
      name="intent"
      value="add"
      aria-label="Save new event"
      icon={<CheckIcon fontSize={["12px", "14px"]} />}
      variant={["smRound", "mdRound"]}
      justifySelf="flex-start"
      isRound
      {...props}
    />
  );
};
