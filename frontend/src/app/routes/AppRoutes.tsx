import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../../features/auth/ui/LoginForm';
import Register from '../../features/auth/ui/RegisterForm';
import Dashboard from '../../features/boardManagement/ui/BoardCreator';
import { useAppSelector } from '../store';

const App: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
