import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { transformUserData } from "../utils/transformUserData";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { token } = useContext(AuthContext);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (token === null) return;

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

      const infoRes = await fetch("http://localhost:8000/api/user-info", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const activityRes = await fetch(
        "http://localhost:8000/api/user-activity?startWeek=1900-01-01&endWeek=2100-01-01",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!infoRes.ok || !activityRes.ok) {
        setUserData({
          profile: {},
          statistics: {},
          sessions: [],
        });
        return;
      }

      const user = await infoRes.json();
      const sessions = await activityRes.json();

      // 🔥 Transformation complète
      const transformed = transformUserData(user, sessions);

      // 🔥 Reconstruction propre pour Dashboard + Profile
      setUserData({
        profile: transformed.profile ?? user.profile ?? {},
        statistics: transformed.statistics ?? user.statistics ?? {},
        sessions: transformed.sessions ?? sessions ?? [],
        ...transformed, // garde les champs supplémentaires
      });

    } catch (err) {
      console.error("Erreur UserContext :", err);

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
