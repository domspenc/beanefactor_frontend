import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/global.css"; // Global styles

import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import ProjectDetailPage from "./pages/ProjectDetailPage.jsx";
import CreateProjectPage from "./pages/CreateProjectPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

import NavBar from "./components/NavBar.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Wrap with NavBar layout */}
          <Route path="/" element={<NavBar />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="projects" element={<ProjectPage />} />
            <Route path="project/:id" element={<ProjectDetailPage />} />
            <Route path="projects/create" element={<CreateProjectPage />} />
            <Route path="dogusers" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
