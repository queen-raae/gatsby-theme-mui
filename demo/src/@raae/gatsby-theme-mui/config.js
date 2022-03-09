import { deepOrange } from "@mui/material/colors";

const config = {
  palette: {
    primary: deepOrange,
    background: {
      paper: "#fffaf0",
      default: "#fcedd8",
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
};

export default config;
