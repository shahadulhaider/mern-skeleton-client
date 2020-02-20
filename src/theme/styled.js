import { colors, fonts } from "./constants";

export default {
  // Colors and Properties
  ...colors,
  // Fonts
  fonts: {
    ...fonts
  },
  // media query
  screens: {
    extraSmall: "576px",
    small: "600px",
    medium: "960px",
    large: "1280px"
  }
};
