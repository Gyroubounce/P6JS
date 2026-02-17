import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

import { fetchUserInfo } from "../api/user";
import { fetchUserSessions } from "../api/session";
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

    const load = async () => {
      try {
        setLoading(true);

        const user = await fetchUserInfo(token);
        const sessions = await fetchUserSessions(token);

        const transformed = transformUserData(user, sessions);

        setUserData({
          profile: transformed.profile ?? user.profile ?? {},
          statistics: transformed.statistics ?? user.statistics ?? {},
          sessions: transformed.sessions ?? sessions ?? [],
          ...transformed,
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

    load();
  }, [token]);

  return (
    <UserContext.Provider value={{ userData, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
