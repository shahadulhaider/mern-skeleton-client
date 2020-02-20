import { createMuiTheme } from "@material-ui/core/styles";
import { colors, fonts } from "./constants";

export default createMuiTheme({
  palette: {
    primary: {
      main: colors.primary
    },
    secondary: {
      main: colors.secondary
    }
  },
  typography: {
    fontFamily: fonts.primary
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 6,
        textTransform: "capitalize",
        fontSize: "1em"
      }
    }
  }
});
