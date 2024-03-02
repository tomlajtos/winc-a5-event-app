import { FormControl, FormLabel, Stack, Text } from "@chakra-ui/react";
import { Input } from "../../ui/Input";

export const DateTimeControl = ({
  label,
  inputName,
  defaultValue,
  errors,
  showAsRequired,
}) => {
  return (
    <FormControl display={"flex"} flexDirection={"column"} alignItems={"start"}>
      <Stack
        direction="row"
        spacing={2}
        align="center"
        justify="space-between"
        width="full"
      >
        <FormLabel margin={0} px={[0, 2]} minWidth={["44px", "62px"]}>
          {label}
          {showAsRequired && (
            <Text as="span" pl={1} color="red.500">
              *
            </Text>
          )}
        </FormLabel>
        <Input
          type="datetime-local"
          name={inputName}
          defaultValue={defaultValue}
          flex={1}
        />
      </Stack>
      {errors && errors[inputName] && (
        <Text color="red.500" fontStyle="italic" py={1} px={2}>
          {errors[inputName]}
        </Text>
      )}
    </FormControl>
  );
};
