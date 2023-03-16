import type { AppProps } from "next/app";
import CtxProvider from "../ctx";

import "../style.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CtxProvider>
      <Component {...pageProps} />
    </CtxProvider>
  );
}
