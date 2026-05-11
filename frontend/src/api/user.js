// src/api/user.js

export const fetchUserInfo = async (token) => {
  const res = await fetch("http://localhost:8000/api/user-info", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Erreur API user-info");
  }

  return res.json();
};
