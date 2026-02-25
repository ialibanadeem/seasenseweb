import React, { createContext, useState } from "react";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  // Hardcoded fisherman role as requested by user
  const [user] = useState({
    id: 'guest-fisherman',
    email: 'fisherman@seasense.com',
    role: 'FISHERMAN'
  });

  const login = async () => {
    console.log("Login is no longer required in fisherman mode.");
  };

  const logout = async () => {
    console.log("Logout is disabled in persistent mode.");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
