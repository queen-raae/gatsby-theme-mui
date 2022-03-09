import * as React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

export default function ThemeRoot(props) {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline enableColorScheme />
      {props.children}
    </ThemeProvider>
  );
}

ThemeRoot.propTypes = {
  children: PropTypes.node,
};
