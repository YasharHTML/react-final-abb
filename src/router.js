import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import PostPage from "./pages/PostPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
        </Routes>
    );
}
