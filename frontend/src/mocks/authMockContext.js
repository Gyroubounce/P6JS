export const authMock = {
  username: "johndoe",      // ← ton mock
  password: "password123",  // ← ton mock
  token: "mock-jwt-token",
  userId: "1"
};

export function mockLogin(username, password) {
  console.log("🔍 Tentative de connexion MOCK :", { username, password });
  console.log("🔍 Valeurs attendues MOCK :", authMock);

  if (username !== authMock.username) {
    console.log("❌ Username incorrect :", username, "≠", authMock.username);
  }

  if (password !== authMock.password) {
    console.log("❌ Password incorrect :", password, "≠", authMock.password);
  }

  if (username === authMock.username && password === authMock.password) {
    console.log("✅ Connexion MOCK réussie !");
    return { token: authMock.token, userId: authMock.userId };
  }

  throw new Error("Identifiants incorrects (mock)");
}
