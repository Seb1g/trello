import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { selectAuth, clearError } from '../model/authSlice.ts';
import {register} from "../model/authThunks.ts"

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(selectAuth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    dispatch(register({ name, email, password }));
  };

  return (
    <div>
      <h2>Регистрация</h2>
      {error && (
        <p style={{ color: 'red' }}>
          {error} <button onClick={() => dispatch(clearError())}>×</button>
        </p>
      )}
      <input
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button onClick={handleRegister} disabled={loading}>
        {loading ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
    </div>
  );
};

export default Register;
