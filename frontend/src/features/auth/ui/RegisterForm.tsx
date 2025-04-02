import React, {useState} from 'react';
import {useAppDispatch} from '../../../app/store';
import {useNavigate} from 'react-router-dom';
import {registration} from "../model/authThunks.ts"

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRedirectToLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    dispatch(registration({email, password}));
  };

  return (
    <div
      style={{display: "flex", flexDirection: "column", gap: "20px", justifyContent: "center", alignItems: "center"}}>
      <div
        style={{display: 'flex', flexDirection: 'column', gap: "15px", width: "200px", alignItems: "center"}}>
        <h2>Регистрация</h2>
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
        <button onClick={handleRegister}>
          Register
        </button>
      </div>
      <div>
        <button onClick={handleRedirectToLogin}>У вас уже есть аккаунт?</button>
      </div>
    </div>
  );
};

export default Register;
