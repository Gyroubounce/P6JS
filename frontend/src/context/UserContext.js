import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext"; // pour récupérer le token

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setUserData(null);
      setLoading(false);
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/user-info", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Erreur API");
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error("Erreur fetch user info:", err);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [token]);

  return (
    <UserContext.Provider value={{ userData, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
