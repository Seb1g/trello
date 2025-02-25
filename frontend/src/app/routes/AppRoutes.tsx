import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { TemplatesBoard } from "../../pages/TemplatesBoard/TemplatesBoard.tsx";
import { check } from "../../features/auth/model/authThunks.ts";
import { LoginPage } from "../../pages/Auth/LoginPage.tsx";
import { RegisterPage } from "../../pages/Auth/RegisterPage.tsx";
import { Dashboard } from "../../pages/Dashboard/DashboardPage.tsx";
import {BoardPage} from "../../pages/Board/BoardPage.tsx";

export const AppRoutes: React.FC = () => {
  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email")

  useEffect(() => {
    if (token !== null && email !== null) {
      dispatch(check({email, token}));
    }
  }, [dispatch, email, token]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user.isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/register" element={user.isLoggedIn ? <Navigate to="/dashboard" /> : <RegisterPage />} />
        <Route path="/dashboard" element={user.isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/templates" element={<TemplatesBoard/>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};
