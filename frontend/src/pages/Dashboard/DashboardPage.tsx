import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {NavBar} from "../../widgets/Navbar/Navbar.tsx";
import {useLocation} from "react-router-dom";
import {DashboardContainer} from "../../features/boardManagement/ui/DashboardContainer.tsx";
import {getUserBoards} from "../../features/boardManagement/model/getUserBoardsThunk.ts";

export const Dashboard: React.FC = () => {
  const location = useLocation();
  const user = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  if (user.user !== null && user.token !== null) {
    localStorage.setItem("token", user.token);
    localStorage.setItem("email", user.user.email);
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      dispatch(getUserBoards({ token: storedToken }));
    } else if (user.token) {
      localStorage.setItem("token", user.token);
      dispatch(getUserBoards({ token: user.token }));
    }
  }, [user.token]);

  return (
    <div>
      <NavBar/>
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        height: "100vh",
        marginTop: "5vh",
        gap: "5vw"
      }}>
        {/* Sidebar */}
        <div style={{
          flex: "0 0 auto",
          width: "256px",
          maxWidth: "256px",
          minWidth: "175px",
          height: "8rem",
          backgroundColor: "#f4f5f7",
          padding: "16px",
          boxSizing: "border-box"
        }}>
          <h2 style={{
            fontSize: "18px",
            marginBottom: "16px",
            backgroundColor: location.pathname === "/dashboard" ? "#ade8f4" : "#ffffff",
            padding: "10px",
            borderRadius: "5px"
          }}>
            Boards
          </h2>
          <h2 style={{
            fontSize: "18px",
            marginBottom: "16px",
            backgroundColor: location.pathname === "/templates" ? "#ade8f4" : "#ffffff",
            padding: "10px",
            borderRadius: "5px"
          }}>
            Templates
          </h2>
        </div>
        {/* Main Content */}
        <DashboardContainer/>
      </div>
    </div>
  );
};
