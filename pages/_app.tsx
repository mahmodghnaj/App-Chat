import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../store/auth";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import Main from "../components/layouts/main";
import { SettingsProvider } from "../store/settings";
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <SettingsProvider>
        <Main> {page}</Main>
      </SettingsProvider>
    ));
  return (
    <AuthProvider>
      <SettingsProvider>
        {getLayout(<Component {...pageProps} />)}{" "}
      </SettingsProvider>
    </AuthProvider>
  );
}

export default MyApp;
