import React from 'react';
// import {
//   useAppDispatch,
//   // useAppSelector
// } from '../../app/store';
// import { logout } from '../../features/auth/model/authSlice';
// import { useNavigate } from 'react-router-dom';
import {NavBar} from "../../widgets/Navbar/Navbar.tsx";

export const Dashboard: React.FC = () => {
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate(); // Вызов хука на верхнем уровне компонента
  // const { user } = useAppSelector((state) => state.auth);

  // const handleLogout = () => {
  //   dispatch(logout());
  //   navigate('/login');
  // };
  return (
    <div>
      <NavBar>
        <div>User</div>
      </NavBar>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          height: "100vh",
          marginTop: "5vh",
          gap: "5vw"
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            flex: "0 0 auto",
            width: "256px",
            maxWidth: "256px",
            minWidth: "175px",
            height: "7rem",
            backgroundColor: "#f4f5f7",
            padding: "16px",
            boxSizing: "border-box",
          }}
        >
          <h2 style={{fontSize: "18px", marginBottom: "16px"}}>Boards</h2>
          <ul style={{listStyle: "none", padding: 0, margin: 0}}>
            <li style={{marginBottom: "8px"}}>Templates</li>
            <li style={{marginBottom: "8px"}}>Home</li>
          </ul>
        </div>

        {/* Main Content */}
        <div
          style={{
            flex: "1 1 auto",
            width: "825px",
            maxWidth: "825px",
            minWidth: "347px",
            overflowX: "auto",
          }}
        >
          <div>
            <h2 style={{ fontSize: "18px", marginBottom: "16px" }}>Recently Viewed</h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
              gap: "16px",
            }}>
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  style={{
                    height: "100px",
                    backgroundColor: "#dfe1e6",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "18px", marginBottom: "16px" }}>Your Workspaces</h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
              gap: "16px",
            }}>
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  style={{
                    height: "100px",
                    backgroundColor: "#dfe1e6",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


