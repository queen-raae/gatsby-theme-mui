import * as React from "react";
import { CacheProvider } from "@emotion/react";
import getEmotionCache from "./src/getEmotionCache";
import ThemeRoot from "./src/ThemeRoot";

const cache = getEmotionCache();

export const wrapRootElement = ({ element }) => {
  return (
    <CacheProvider value={cache}>
      <ThemeRoot>{element}</ThemeRoot>
    </CacheProvider>
  );
};
