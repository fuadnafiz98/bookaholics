import React, { ReactNode, useState, createContext } from "react";

interface User {
  user_id: string;
  name: string;
}

type AuthContextType = {
  authState: {
    token: string;
    userInfo: User;
  };
  isAuthenticated: () => void;
  logout: () => void;
  setAuthState: (authInfo: { token: string; userInfo: User }) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const { Provider } = AuthContext;

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const userInfo = typeof window !== "undefined" && localStorage.getItem("userInfo");
  const [authState, setAuthState] = useState({
    token: "",
    userInfo: userInfo ? JSON.parse(userInfo) : null,
  });
  const setAuthInfo = ({ token, userInfo }: { token: string; userInfo: User }) => {
    typeof window !== "undefined" && localStorage.setItem("userInfo", JSON.stringify(userInfo));
    typeof window !== "undefined" && localStorage.setItem("isAuthenticated", "true");
    setAuthState({
      token,
      userInfo,
    });
  };

  const logout = () => {
    typeof window !== "undefined" && localStorage.removeItem("isAuthenticated");
    typeof window !== "undefined" && localStorage.removeItem("userInfo");
    setAuthState({
      token: "",
      userInfo: null,
    });
  };

  const isAuthenticated = () => {
    console.log(authState.userInfo);
    if (!authState.userInfo) return false;
    return true;
  };

  return (
    <Provider
      value={{
        authState,
        isAuthenticated,
        logout,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
