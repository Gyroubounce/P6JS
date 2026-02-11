import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { token } = useContext(AuthContext);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔥 Tant que le token n'est pas encore chargé depuis localStorage,
    // on NE FAIT RIEN. On attend.
    if (token === null) {
      return;
    }

    // 🔥 Si token = "" ou undefined → utilisateur non connecté
    if (!token) {
      setUserData({
        profile: {},
        statistics: {},
        sessions: [],
      });
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);

        // 1) Profil + statistiques
        const infoRes = await fetch("http://localhost:8000/api/user-info", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
                  });

        // 2) Sessions (toutes les sessions)
        const activityRes = await fetch(
          "http://localhost:8000/api/user-activity?startWeek=2000-01-01&endWeek=2100-01-01",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // 🔥 Si l'un des deux échoue → fallback propre
        if (!infoRes.ok || !activityRes.ok) {
          console.warn("API renvoie une erreur → fallback userData vide");
          setUserData({
            profile: {},
            statistics: {},
            sessions: [],
          });
          return;
        }

        const info = await infoRes.json();
        const sessions = await activityRes.json();

        setUserData({
          profile: info.profile ?? {},
          statistics: info.statistics ?? {},
          sessions: Array.isArray(sessions) ? sessions : [],
        });
      } catch (err) {
        console.error("Erreur UserContext :", err);

        // 🔥 fallback en cas d'erreur réseau
        setUserData({
          profile: {},
          statistics: {},
          sessions: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <UserContext.Provider value={{ userData, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
