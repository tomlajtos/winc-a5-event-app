// default Chakra-ui theme extensions and overrides
import { extendTheme } from "@chakra-ui/react";
// global style overrides
import { styles } from "./styles";
// global theme extensions
import { themeXtra } from "./theme";
// component style overrides
import { buttonTheme } from "./components/button";
import { checkboxTheme } from "./components/checkbox";
import { inputTheme } from "./components/input";

const overrides = {
  styles,
  components: {
    Button: buttonTheme,
    Checkbox: checkboxTheme,
    Input: inputTheme,
  },
};
const themeExtensions = {
  colors: themeXtra.colors,
};

export const theme = extendTheme({ ...overrides, ...themeExtensions });
