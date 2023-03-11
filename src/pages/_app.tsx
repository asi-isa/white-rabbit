import type { AppProps } from "next/app";
import GlobalCtxProvider from "../ctx";

import "../style.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalCtxProvider>
      <Component {...pageProps} />
    </GlobalCtxProvider>
  );
}
