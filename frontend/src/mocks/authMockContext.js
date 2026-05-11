export const authMock = {
  username: "johndoe",      // ← ton mock
  password: "password123",  // ← ton mock
  token: "mock-jwt-token",
  userId: "1"
};

export function mockLogin(username, password) {


  if (username !== authMock.username) {
  
  }

  if (password !== authMock.password) {
  
  }

  if (username === authMock.username && password === authMock.password) {
    
    return { token: authMock.token, userId: authMock.userId };
  }

  throw new Error("Identifiants incorrects (mock)");
}
