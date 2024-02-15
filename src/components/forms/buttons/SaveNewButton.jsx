import { Button } from "@chakra-ui/react";

export const SaveNewButton = (props) => {
  const variant = props.variant ? props.variant : "base";
  const size = props.size ? props.size : "lg";
  return (
    <Button
      type="submit"
      form="new-event-form"
      name="intent"
      value="addNew"
      variant={variant}
      size={size}
      colorScheme="purple"
      onClick={() => {
        console.log("saving new event");
      }}
      {...props}
    >
      Save
    </Button>
  );
};
