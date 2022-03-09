import React from "react";
import { renderToString } from "react-dom/server";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";

import ThemeRoot from "./src/ThemeRoot";
import getEmotionCache from "./src/getEmotionCache";

export const wrapRootElement = ({ element }) => {
  return <ThemeRoot>{element}</ThemeRoot>;
};

export const onRenderBody = (gatsbyUtils) => {
  const { setHeadComponents } = gatsbyUtils;

  setHeadComponents([
    <meta
      key="mui-viewport"
      name="viewport"
      content="initial-scale=1, width=device-width"
    />,
  ]);
};

export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  const headComponents = getHeadComponents();
  headComponents.sort((x, y) => {
    if (x.key === "emotion-css-global" || x.key === "emotion-css") {
      return -1;
    }
    if (y.key === "style") {
      return 1;
    }
    return 0;
  });
  replaceHeadComponents(headComponents);
};

export const replaceRenderer = ({
  bodyComponent,
  setHeadComponents,
  replaceBodyHTMLString,
}) => {
  const cache = getEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  const emotionStyles = extractCriticalToChunks(
    renderToString(<CacheProvider value={cache}>{bodyComponent}</CacheProvider>)
  );

  setHeadComponents(
    emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(" ")}`}
        key={`emotion-${style.key}`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ))
  );

  // render the result from `extractCritical`
  replaceBodyHTMLString(emotionStyles.html);
};
