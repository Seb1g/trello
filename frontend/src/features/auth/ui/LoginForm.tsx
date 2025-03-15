import React, {useState} from 'react';
import {useAppDispatch} from '../../../app/store';
// import {selectAuth, clearError, logout} from '../model/authSlice.ts';
import {useNavigate} from 'react-router-dom';
import {login} from "../model/authThunks.ts"

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const {loading, error} = useAppSelector(selectAuth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRedirectToRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    dispatch(login({email, password}));
  };

  return (
    <div
      style={{display: "flex", flexDirection: "column", gap: "20px", justifyContent: "center", alignItems: "center"}}>
      <div
        style={{display: 'flex', flexDirection: 'column', gap: "15px", width: "200px", alignItems: "center"}}>
        <h2>Вход</h2>
        {/*{error && (*/}
        {/*  <p style={{color: 'red'}}>*/}
        {/*    {error}*/}
        {/*    <button onClick={() => dispatch(clearError())}>×</button>*/}
        {/*  </p>*/}
        {/*)}*/}
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
        <button onClick={handleLogin}
                // disabled={loading}
        >
          {/*{loading ? 'Вход...' : 'Войти'}*/}
          Login
        </button>
      </div>
      <div>
        <button onClick={handleRedirectToRegister}>У вас нет аккаунта?</button>
      </div>
    </div>
  );
};

export default Login;
