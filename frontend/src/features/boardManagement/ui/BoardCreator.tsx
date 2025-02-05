import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { logout } from '../../auth/model/authSlice.ts';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <h2>Добро пожаловать, {user?.name}!</h2>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default Dashboard;
