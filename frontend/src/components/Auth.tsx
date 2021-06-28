import { useRouter } from "next/router";
import React, { useEffect, useContext } from "react";
import Loading from "./Loading";
import { AuthContext } from "@/src/context/AuthContext";

interface Props {
  children: any;
}
const Auth: React.FC<Props> = (props) => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const user = auth == undefined ? false : auth.isAuthenticated();

  useEffect(() => {
    console.log(user);
    if (typeof window !== "undefined" && !user) router.push("/auth/signin");
  }, []);

  if (!user) {
    return (
      <div className="grid w-full h-screen place-content-center">
        <Loading />
      </div>
    );
  }
  return props.children;
};

export default Auth;
