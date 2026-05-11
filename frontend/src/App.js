import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
