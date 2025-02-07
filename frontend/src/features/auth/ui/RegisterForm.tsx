import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {selectAuth, clearError, logout} from '../model/authSlice.ts';
import {useNavigate} from 'react-router-dom';
import {register} from "../model/authThunks.ts"

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {loading, error} = useAppSelector(selectAuth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRedirectToLogin = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleRegister = () => {
    dispatch(register({name, email, password}));
  };

  return (
    <div
      style={{display: "flex", flexDirection: "column", gap: "20px", justifyContent: "center", alignItems: "center"}}>
      <div
        style={{display: 'flex', flexDirection: 'column', gap: "15px", width: "200px", alignItems: "center"}}>
        <h2>Регистрация</h2>
        {error && (
          <p style={{color: 'red'}}>
            {error}
            <button onClick={() => dispatch(clearError())}>×</button>
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
      <div>
        <button onClick={handleRedirectToLogin}>У вас уже есть аккаунт?</button>
      </div>
    </div>
  );
};

export default Register;
