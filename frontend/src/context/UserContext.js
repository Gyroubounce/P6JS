import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

import { fetchUserInfo } from "../api/user";
import { fetchUserSessions } from "../api/session";
import { transformUserData } from "../utils/transformUserData";

import { USE_MOCK } from "../config";
import { userMock } from "../mocks/userMockContext";
console.log("AUTH USE_MOCK =", USE_MOCK);
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { token } = useContext(AuthContext);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("USERCONTEXT → token reçu =", token);

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

        // ⭐ MODE MOCK — aucune modification du reste du code
      if (USE_MOCK) {
        const transformed = transformUserData(userMock, userMock.sessions);

        setUserData({ 
          profile: transformed.profile ?? {}, 
          statistics: transformed.statistics ?? {}, 
          sessions: transformed.sessions ?? [], 
          ...transformed, 
        }); 
        return; 
      }
       
       // ⭐ MODE API RÉELLE — ton code reste intact
        const user = await fetchUserInfo(token);
        let sessions = await fetchUserSessions(token);

        // ⭐ OPTION B : fallback mock si aucune session API 
        if (!sessions || sessions.length === 0) { 
          console.warn("⚠️ Aucune session API trouvée, fallback vers userMock.sessions"); 
          sessions = userMock.sessions; 
        }

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
console.log("TOKEN REÇU PAR USERCONTEXT :", token);

  return (
    <UserContext.Provider value={{ userData, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
