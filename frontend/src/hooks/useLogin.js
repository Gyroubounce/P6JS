import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { USE_MOCK } from "../config";
import { mockLogin } from "../mocks/authMockContext";

export const useLogin = () => {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");

  const submitLogin = async (username, password) => {
    setError("");

    ("🔧 USE_MOCK =", USE_MOCK);

    // 🔵 MODE MOCK
    if (USE_MOCK) {
      try {
        mockLogin(username, password);
        await login(username, password); // utilise le login du AuthContext
        return true;
      } catch (err) {
        setError(err.message);
        return false;
      }
    }

    // 🔴 MODE API RÉELLE
    try {
      await login(username, password); // AuthContext gère loginRequest
      return true;

    } catch (err) {
      ("❌ API LOGIN ERROR :", err.message);
      setError("Identifiants incorrects");
      return false;
    }
  };

  return { submitLogin, error };
};
