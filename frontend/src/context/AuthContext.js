import React, { createContext, useState, useEffect } from "react";
import { USE_MOCK } from "../config";
import { loginRequest } from "../api/auth"; // ⭐ On utilise ton API réelle



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // Charger token + userId depuis localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUserId = localStorage.getItem("userId");

    if (savedToken) setToken(savedToken);
    if (savedUserId) setUserId(savedUserId);
  }, []);

  // ------------------------------------------------------------
  // 🔥 LOGIN MOCK + API
  // ------------------------------------------------------------
  const login = async (username, password) => {

    // ⭐ MODE MOCK
    if (USE_MOCK) {
     

      if (username === "johndoe" && password === "password123") {
        const token = "mock-jwt-token";
        const userId = "1";

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);

        setToken(token);
        setUserId(userId);

        return;
      }

      throw new Error("Identifiants incorrects (mock)");
    }

    // ⭐ MODE API RÉELLE
    try {
      const data = await loginRequest(username, password);

      // data = { token, userId }
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);

      setToken(data.token);
      setUserId(data.userId);

    } catch (err) {
      console.error("Erreur login API :", err);
      throw err;
    }
  };

  // ------------------------------------------------------------
  // 🔥 LOGOUT
  // ------------------------------------------------------------
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken(null);
    setUserId(null);
  };



  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
