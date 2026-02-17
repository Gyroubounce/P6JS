// src/api/session.js

export const fetchUserSessions = async (token) => {
  const res = await fetch(
    "http://localhost:8000/api/user-activity?startWeek=1900-01-01&endWeek=2100-01-01",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res.ok) {
    throw new Error("Erreur API user-activity");
  }

  return res.json();
};
