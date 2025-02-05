import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { selectAuth, clearError } from '../model/authSlice.ts';
import {login} from "../model/authThunks.ts"

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(selectAuth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    dispatch(login({ email, password }));
  };

  return (
    <div>
      <h2>Вход</h2>
      {error && (
        <p style={{ color: 'red' }}>
          {error} <button onClick={() => dispatch(clearError())}>×</button>
        </p>
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Вход...' : 'Войти'}
      </button>
    </div>
  );
};

export default Login;
