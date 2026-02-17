import { useState, useContext } from "react";
import { loginRequest } from "../api/auth";
import { AuthContext } from "../context/AuthContext";

import { USE_MOCK } from "../config";
import { mockLogin } from "../mocks/authMockContext";

export const useLogin = () => {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");

  const submitLogin = async (username, password) => {
    setError("");

    console.log("🔧 USE_MOCK =", USE_MOCK);

    // 🔵 MODE MOCK
    if (USE_MOCK) {
      console.log("🟦 MODE MOCK ACTIVÉ");

      try {
        const data = mockLogin(username, password);
        console.log("🟩 MOCK LOGIN OK :", data);

        login(username, password);
        return true;

      } catch (err) {
        console.log("❌ MOCK LOGIN ERROR :", err.message);
        setError(err.message);
        return false;
      }
    }

    // 🔴 MODE API RÉELLE
    console.log("🟥 MODE API ACTIVÉ");

    try {
      const data = await loginRequest(username, password);
      console.log("🟩 API LOGIN OK :", data);

      login(username, password);
      return true;

    } catch (err) {
      console.log("❌ API LOGIN ERROR :", err.message);
      setError("Identifiants incorrects");
      return false;
    }
  };

  return { submitLogin, error };
};
