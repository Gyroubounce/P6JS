const API_URL = process.env.REACT_APP_API_URL;

export const fetchUserSessions = async (token) => {
  const res = await fetch(
    `${API_URL}/api/user-activity?startWeek=1900-01-01&endWeek=2100-01-01`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res.ok) {
    throw new Error("Erreur API user-activity");
  }

  return res.json();
};
