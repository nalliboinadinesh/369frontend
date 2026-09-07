import React, { createContext, useContext, useState, useEffect } from "react";
import { getToken, setToken, getUser, setUser, clearSession } from "../utils/storage";
import { loginUser, registerUser } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [token, setTokenState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore authentication session from localStorage
    const storedToken = getToken();
    const storedUser = getUser();

    if (storedToken) {
      setTokenState(storedToken);
      setUserState(storedUser || { email: "user@demo.com", name: "User" });
    }
    setLoading(false);
  }, []);

  const handleLogin = async (credentials) => {
    const data = await loginUser(credentials);
    const jwt = data.token || data.data?.token;
    const userInfo = data.user || data.data?.user || { email: credentials.email, name: credentials.email.split("@")[0] };

    setToken(jwt);
    setUser(userInfo);

    setTokenState(jwt);
    setUserState(userInfo);
    return data;
  };

  const handleRegister = async (userData) => {
    const data = await registerUser(userData);
    const jwt = data.token || data.data?.token;
    const userInfo = data.user || data.data?.user || { email: userData.email, name: userData.name };

    setToken(jwt);
    setUser(userInfo);

    setTokenState(jwt);
    setUserState(userInfo);
    return data;
  };

  const logout = () => {
    clearSession();
    setTokenState(null);
    setUserState(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    loading,
    login: handleLogin,
    register: handleRegister,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
