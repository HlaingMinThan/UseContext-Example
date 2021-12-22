import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  isLoggedIn: true,
  onLogout: () => {},
});
export function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logoutHandler = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
  };
  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways

    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
