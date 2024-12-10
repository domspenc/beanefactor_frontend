import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [auth, setAuth] = useState({
    token: window.localStorage.getItem("token"),
  });

  // Check token expiration or validation if necessary
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      // Optionally, add token expiration check here
      setAuth({ token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};
