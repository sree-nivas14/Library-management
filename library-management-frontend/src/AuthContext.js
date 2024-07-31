import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = sessionStorage.getItem("auth");
    return storedAuth
      ? JSON.parse(storedAuth)
      : { isAuthenticated: false, role: "" };
  });

  const login = (role) => {
    const newAuth = { isAuthenticated: true, role };
    setAuth(newAuth);
    sessionStorage.setItem("auth", JSON.stringify(newAuth));
  };

  const logout = () => {
    const newAuth = { isAuthenticated: false, role: "" };
    setAuth(newAuth);
    sessionStorage.removeItem("auth");
  };

  useEffect(() => {
    const storedAuth = sessionStorage.getItem("auth");
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
