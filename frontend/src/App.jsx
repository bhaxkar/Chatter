import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import ProfilePage from "./Pages/ProfilePage";
import UpdateProfilePage from "./Pages/UpdateProfile";
import ChangePasswordPage from "./Pages/ChangePassword";
import Navbar from "./components/Navbar";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, validateAuth, isValidatingAuth, onlineUsers } = useAuthStore();
  
  console.log(onlineUsers);
  
  useEffect(() => {
    validateAuth();
  }, [validateAuth]);

  if (isValidatingAuth && !authUser) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  console.log(authUser);

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignupPage /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route path="/update-profile" element={ authUser ? <UpdateProfilePage />  : <Navigate to="/login"/>  } />
          <Route path="/change-password" element={authUser ? <ChangePasswordPage />: <Navigate to="/login"/>  } />
        </Routes>
      </main>
      <Toaster />
    </div>
  );
};

export default App;
