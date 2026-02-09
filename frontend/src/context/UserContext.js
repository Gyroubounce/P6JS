import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { token } = useContext(AuthContext);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Index du bloc de 4 semaines (0 = premier bloc)
  const [weekBlockIndex, setWeekBlockIndex] = useState(0);

  useEffect(() => {
    if (!token) {
      setUserData(null);
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);

        // 1) Profil + statistiques globales
        const infoRes = await fetch("http://localhost:8000/api/user-info", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const info = await infoRes.json();

        // 2) 🔥 Récupérer TOUTES les sessions (pas filtrées par dates)
        // On met une période très large pour tout récupérer
        const activityRes = await fetch(
          `http://localhost:8000/api/user-activity?startWeek=2000-01-01&endWeek=2100-01-01`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const sessions = await activityRes.json();

        setUserData({
          profile: info.profile,
          statistics: info.statistics,
          sessions, // 🔥 toutes les sessions, non filtrées
        });
      } catch (err) {
        console.error("Erreur UserContext :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        userData,
        loading,
        weekBlockIndex,
        setWeekBlockIndex, // 🔥 navigation par blocs de 4 semaines
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
