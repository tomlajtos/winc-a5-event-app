import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const commonStyles = {
  field: {
    height: [8, 10],
    width: "full",
    fontSize: ["sm", "md"],
    background: "none",
    border: "1px solid",
    borderColor: "gray.500",
    _focus: {
      border: "2px solid",
      borderColor: "neonVio.500",
    },
    _placeholder: {
      fontSize: ["sm", "md"],
    },
  },
};

const customBaseStyles = {
  field: {
    ...commonStyles.field,
    borderRadius: ["md", "lg"],
    _hover: {
      borderColor: "gray.300",
    },
  },
};

const autofillStyles = {
  border: "2px solid",
  borderColor: "neonVio.400",
  WebkitTextFillColor: "#c4b5fd",
  WebkitBoxShadow: "0 0 0px 40px #1f1040 inset",
};

const customBase = definePartsStyle(customBaseStyles);

const search = definePartsStyle({
  field: {
    ...commonStyles.field,
    borderRadius: "full",
    _autofill: {
      _hover: {
        ...autofillStyles,
      },
      _focus: {
        ...autofillStyles,
      },
      _active: {
        ...autofillStyles,
      },
    },
  },
});

export const inputTheme = defineMultiStyleConfig({
  defaultProps: { variant: "customBase" },
  variants: { customBase, search },
});
