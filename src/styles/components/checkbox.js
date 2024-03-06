// Chakra-ui multi part component style utils imports
import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);
const sizes = {
  mlg: definePartsStyle({
    control: defineStyle({
      boxSize: 6,
    }),
    label: defineStyle({
      fontSize: "16px",
      marginLeft: 2,
    }),
  }),
};

export const checkboxTheme = defineMultiStyleConfig({ sizes });
