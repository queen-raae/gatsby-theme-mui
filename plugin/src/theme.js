import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import config from "./config";

let theme = createTheme(config);
theme = responsiveFontSizes(theme);

export default theme;
