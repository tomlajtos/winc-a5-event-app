import { useToast, Button } from "@chakra-ui/react";
import { validateAll } from "../../../io/validate";

export const SaveNewButton = ({ categoryIds, setErrors }, props) => {
  const toast = useToast();
  const variant = props.variant ? props.variant : "base";
  const size = props.size ? props.size : "lg";
  return (
    <Button
      type="submit"
      form="new-event-form"
      variant={variant}
      size={size}
      colorScheme="purple"
      onClick={(e) => {
        // get and use errors for validation that are not yet set as state
        const validity = validateAll(categoryIds, setErrors);

        if (validity.isInvalid) {
          e.preventDefault();
          toast({
            title: "Event information is incomplete",
            description: "Please complete the required fields.",
            duration: 4000,
            position: "top",
            status: "error",
            isClosable: true,
          });
        }
      }}
      {...props}
    >
      Save
    </Button>
  );
};
