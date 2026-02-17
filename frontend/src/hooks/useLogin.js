import { useState } from "react";
import { loginRequest } from "../api/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useLogin = () => {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");

  const submitLogin = async (username, password) => {
    setError("");

    try {
      const data = await loginRequest(username, password);
      login(data.token, data.userId);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  return { submitLogin, error };
};
