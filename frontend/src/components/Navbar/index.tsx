import { ReactElement, useContext, useEffect } from "react";
import { AuthContext } from "@/src/context/AuthContext";
import Navbar from "./Navbar";
import config from "@/src/config";
import { useRouter } from "next/router";

interface Props {
  children: ReactElement;
}

const NavbarWrapper: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  const auth = useContext(AuthContext);
  const handleSignOut = async () => {
    const response = await fetch(config.API_URL + "/auth/signout", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInfo: auth?.authState }),
    });
    const json = await response.json();
    console.log(json);
    auth?.logout();
    router.reload();
  };
  return (
    <div>
      <Navbar name={auth?.authState.userInfo?.name} handleSignOut={handleSignOut} />
      {children}
    </div>
  );
};

export default NavbarWrapper;
