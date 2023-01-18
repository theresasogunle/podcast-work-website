import NextHead from "next/head";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import { appWithTranslation } from "next-i18next";
import { theme as defaultTheme } from "@madebywild/styled-utils";
import resolveConfig from "tailwindcss/resolveConfig";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "~/styles/GlobalStyles";
import { GridContextProvider } from "~/contexts/Grid";
import { MenuContextProvider } from "~/contexts/Menu";
import { WaveContextProvider } from "~/contexts/Wave";
import { StickyYearContextProvider } from "~/contexts/StickyYear";
import { PodcastContextProvider } from "~/contexts/Podcast";
import { SmoothScrollbarContextProvider } from "~/contexts/SmoothScrollbar";
import { use100vh } from "~/hooks/use100vh";
import { CookieBanner } from "~/components/CookieBanner";
import tailwindConfig from "../../tailwind.config";
import "~/styles/fonts.css";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// @ts-expect-error
const { theme: tailwindTheme } = resolveConfig(tailwindConfig);

const theme = {
  ...defaultTheme,
  screens: {
    ...defaultTheme.screens,
    ...tailwindTheme.screens,
  },
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  use100vh();

  /*
    Persistent layout that doesn't re-mount on page change (DefaultPage)
    but with different props for a specific page
    https://nextjs.org/docs/basic-features/layouts#with-typescript
  */

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <link rel="manifest" href="/site.webmanifest" crossOrigin="use-credentials" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="preload"
          href="/fonts/KristallNowPro-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="preload" href="/fonts/Rund-Grotesk-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </NextHead>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <CookieBanner />
        <SmoothScrollbarContextProvider>
          <PodcastContextProvider>
            <GridContextProvider>
              <MenuContextProvider>
                <WaveContextProvider>
                  <StickyYearContextProvider>{getLayout(<Component {...pageProps} />)}</StickyYearContextProvider>
                </WaveContextProvider>
              </MenuContextProvider>
            </GridContextProvider>
          </PodcastContextProvider>
        </SmoothScrollbarContextProvider>
      </ThemeProvider>
    </>
  );
};

export default appWithTranslation(App);
