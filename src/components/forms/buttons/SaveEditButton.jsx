// Chakra-ui imports
import { Button } from "@chakra-ui/react";

export const SaveEditButton = (props) => {
  const variant = props.variant ? props.variant : "base";
  const size = props.size ? props.size : ["sm", "md", "lg"];

  return (
    <Button
      type="submit"
      form="edit-event-form"
      variant={variant}
      name="intent"
      value="edit"
      size={size}
      {...props}
    >
      Save
    </Button>
  );
};
