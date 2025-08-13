import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/useAuth";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/auth/Login";
import Tracker from "./pages/tracker/Tracker";
import { Toaster } from "sonner";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-left" richColors/>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Tracker />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
