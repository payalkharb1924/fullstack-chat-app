import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
  // useEffect runs after the component mounts (i.e., after the UI is rendered the first time).
  // Inside it, you're calling checkAuth() — likely to verify the user's login state.
  // [checkAuth] is the dependency array: this tells React to re-run the effect if checkAuth changes (which rarely happens, but it’s best practice to include it).

  console.log(onlineUsers);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log(authUser);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  // we can add a loding screen till it is checking is user is authorized
  if (isCheckingAuth && !authUser)
    return (
      // Loader came from package npm i lucide-react
      <div className="flex items-center justify-center h-screen">
        {/* <span className="loading loading-bars loading-xl"></span> */}
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;

// ✅ Routes:
// A container that holds all your <Route> definitions.
// It replaces the older <Switch> component from React Router v5.
// It matches only the first route that matches the URL (which is more efficient).

// ✅ Route:
// Defines a path and the component to render when that path is matched.
// You use it to map URLs to React components (pages/views).
