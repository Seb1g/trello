import React from 'react';
import {
  useAppDispatch,
  // useAppSelector
} from '../../app/store';
import { logout } from '../../features/auth/model/authSlice';
import { useNavigate } from 'react-router-dom';
import {NavBar} from "../../widgets/Navbar/Navbar.tsx";

export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Вызов хука на верхнем уровне компонента
  // const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <NavBar>
        <div>User</div>
      </NavBar>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="leftBox">
          <div className="leftBoxBoardButton">leftBoxBoardButton</div>
          <div className="leftBoxTemplatesRedirect">leftBoxTemplatesRedirect</div>
        </div>
        <div className="mainBox">
          <div className="mostPopularTemplatesContainer">mostPopularTemplatesContainer</div>
          <div className="recentlyViews">recentlyViews</div>
          <div className="usersWorkspacesContainer">usersWorkspacesContainer</div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};
