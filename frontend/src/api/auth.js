const API_URL = process.env.REACT_APP_API_URL;

export const loginRequest = async (username, password) => {
  const res = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Erreur de connexion");
  }

  return data; // { token, userId }
};
