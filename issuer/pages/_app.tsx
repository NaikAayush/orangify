import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Eth } from "../lib/eth";

export const eth = new Eth();
eth.init();

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

