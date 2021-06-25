import { AppProps } from "next/app";
import "@/styles/global.css";

import NavbarWrapper from "../components/Navbar";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NavbarWrapper>
      <Component {...pageProps} />
    </NavbarWrapper>
  );
}
