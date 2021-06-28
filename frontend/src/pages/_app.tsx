import { AppProps } from "next/app";
import "@/styles/global.css";

import Auth from "../components/Auth";
import { AuthProvider } from "../context/AuthContext";
import NavbarWrapper from "../components/Navbar";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NavbarWrapper>
        <Component {...pageProps} />
      </NavbarWrapper>
    </AuthProvider>
  );
}
