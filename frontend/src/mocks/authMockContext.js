export const authMock = {
  username: "johndoe",      // ← ton mock
  password: "password123",  // ← ton mock
  token: "mock-jwt-token",
  userId: "1"
};

export function mockLogin(username, password) {
  ("🔍 Tentative de connexion MOCK :", { username, password });
  ("🔍 Valeurs attendues MOCK :", authMock);

  if (username !== authMock.username) {
    ("❌ Username incorrect :", username, "≠", authMock.username);
  }

  if (password !== authMock.password) {
    ("❌ Password incorrect :", password, "≠", authMock.password);
  }

  if (username === authMock.username && password === authMock.password) {
    ("✅ Connexion MOCK réussie !");
    return { token: authMock.token, userId: authMock.userId };
  }

  throw new Error("Identifiants incorrects (mock)");
}
