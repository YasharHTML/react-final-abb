import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import PostPage from "./pages/PostPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/layout/header/Header";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import Footer from "./components/layout/footer/Footer";

export default function Router() {
  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/:username"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <Footer/>
    </>
  );
}
