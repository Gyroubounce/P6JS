import React, { createContext, useState, useEffect } from "react";

// Création du contexte
export const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // Au démarrage, on récupère le token et userId du localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUserId = localStorage.getItem("userId");

    if (savedToken) setToken(savedToken);
    if (savedUserId) setUserId(savedUserId);
  }, []);

  // Fonction pour login : stocke token + userId
  const login = (newToken, newUserId) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userId", newUserId);
    setToken(newToken);
    setUserId(newUserId);
  };

  // Fonction pour logout : supprime token + userId
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
