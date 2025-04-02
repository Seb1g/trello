import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { checkAuth } from "../../features/auth/model/authThunks.ts";
import Login from "../../features/auth/ui/LoginForm.tsx";
import Register from "../../features/auth/ui/RegisterForm.tsx";
import { TemplatesBoard } from "../../pages/TemplatesBoard/TemplatesBoard";
import { Dashboard } from "../../pages/Dashboard/DashboardPage";
import { BoardPage } from "../../pages/Board/BoardPage";

const AppRoutes: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuth, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {!isAuth ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/templates" element={<TemplatesBoard />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
