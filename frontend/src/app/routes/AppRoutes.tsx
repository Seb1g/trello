import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {LoginPage} from '../../pages/Auth/LoginPage';
import {RegisterPage} from '../../pages/Auth/RegisterPage';
import {Dashboard} from '../../pages/Dashboard/DashboardPage';
import {useAppDispatch, useAppSelector} from '../store';
import {TemplatesBoard} from "../../pages/TemplatesBoard/TemplatesBoard.tsx";
import {check} from "../../features/auth/model/authThunks.ts";
import {checkCredentials} from "../../shared/api/authApi.ts";

const App: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("token") !== null && localStorage.getItem("email") !== null) {
      const email = localStorage.getItem("email");
      const token = localStorage.getItem("token");
      dispatch(check({email, token} as checkCredentials));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/templates" element={<TemplatesBoard/>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
