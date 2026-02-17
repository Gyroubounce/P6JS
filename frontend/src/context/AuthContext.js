import React, { createContext, useState, useEffect } from "react";
import { USE_MOCK } from "../config"; 
import { mockLogin } from "../mocks/authMockContext"; 

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
  const login = async (email, password) => { 
    
  // ⭐ MODE MOCK — aucune modification du reste du code 
  if (USE_MOCK) { const data = mockLogin(email, password); 
    localStorage.setItem("token", data.token); 
    localStorage.setItem("userId", "1"); // ID mock 
    setToken(data.token); 
    setUserId("1"); 
    return; } 
    
    // ⭐ MODE API RÉELLE
    localStorage.setItem("token", email); 
    localStorage.setItem("userId", password); 
    setToken(email); 
    setUserId(password); 
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
