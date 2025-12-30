import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Shortener from "./components/Shortener";
import Dashboard from "./components/Dashboard";
import HomeExtras from "./components/HomeExtras";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setIsAuth(!!localStorage.getItem("token"));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    window.location.href = "/";
  };

  return (
    <>
      <Navbar isAuth={isAuth} onLogout={logout} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Shortener
                isAuth={isAuth}
                onCreated={() => setRefreshKey((k) => k + 1)}
              />
              <HomeExtras isAuth={isAuth} />
              {isAuth && <Dashboard refreshKey={refreshKey} />}
            </>
          }
        />

        <Route path="/login" element={<Login onAuth={() => setIsAuth(true)} />} />
        <Route path="/signup" element={<Signup onAuth={() => setIsAuth(true)} />} />
      </Routes>
    </>
  );
}
