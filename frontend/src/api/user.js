const API_URL = process.env.REACT_APP_API_URL;

export const fetchUserInfo = async (token) => {
  const res = await fetch(`${API_URL}/api/user-info`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Erreur API user-info");
  }

  return res.json();
};
