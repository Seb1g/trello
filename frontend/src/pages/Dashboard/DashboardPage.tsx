import React, {useState} from 'react';
import {
  useAppDispatch,
  useAppSelector
} from '../../app/store';
import {logout} from '../../features/auth/model/authSlice';
import {useNavigate} from 'react-router-dom';
import {NavBar} from "../../widgets/Navbar/Navbar.tsx";
import {useLocation} from "react-router-dom";

export const Dashboard: React.FC = () => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Вызов хука на верхнем уровне компонента
  const {user} = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  return (
    <div>
      <NavBar>
        <div style={{position: "relative", display: "inline-block"}}>
          <button
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              cursor: "pointer",
              height: "32px",
            }}
            onClick={() => setIsOpen(!isOpen)}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
          >
            User
          </button>
          {isOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: "0",
                marginTop: "0.5rem",
                padding: "1rem",
                width: "16rem",
                backgroundColor: "white",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "0.5rem",
                zIndex: 10,
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
              }}
            >
              <h1>Account</h1>
              <div className="userData"
                   style={{
                     display: "flex",
                     flexDirection: "row",
                     gap: "0.7rem",
                     marginTop: "0.5rem",
                   }}>
                <div className="userData-img">
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "orange",
                      borderRadius: "2rem",
                    }}>{user === null ? "" : user.name[0]}</div>
                </div>
                <div className="userData-info"
                     style={{
                       display: "flex",
                       flexDirection: "column",
                       gap: "0.2rem",
                     }}>
                  <p>{user === null ? "" : user.name}</p>
                  <p>{user === null ? "" : user.email}</p>
                </div>
              </div>
              <div className="switchAccount">
                <button type="button"
                        style={{
                          padding: "0.5rem 1rem",
                          borderRadius: "0.5rem",
                          backgroundColor: "#5fa8d3",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#3b7a9c")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#5fa8d3")}>
                  Switch account(In development)
                </button>
              </div>
              <div className="accountManagement">
                <button type="button"
                        style={{
                          padding: "0.5rem 1rem",
                          borderRadius: "0.5rem",
                          backgroundColor: "#5fa8d3",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#3b7a9c")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#5fa8d3")}>
                Account management(In development)
                </button>
              </div>
              <div className="quitButton">
                <button type="button" onClick={handleLogout}
                        style={{
                          padding: "0.5rem 1rem",
                          borderRadius: "0.5rem",
                          backgroundColor: "#5fa8d3",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#3b7a9c")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#5fa8d3")}>
                        Quit
                </button>
              </div>
              <div className="choiceThemeDropdown">
                <button type="button"
                        style={{
                          padding: "0.5rem 1rem",
                          borderRadius: "0.5rem",
                          backgroundColor: "#5fa8d3",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#3b7a9c")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#5fa8d3")}>
                        Choice Theme(In development)
                </button>
              </div>
            </div>
          )}
        </div>
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
            height: "8rem",
            backgroundColor: "#f4f5f7",
            padding: "16px",
            boxSizing: "border-box",
          }}
        >
          <h2 style={{
            fontSize: "18px",
            marginBottom: "16px",
            backgroundColor: `${location.pathname === "/dashboard" ? "#ade8f4" : "#ffffff"}`,
            padding: "10px",
            borderRadius: "5px",
            alignItems: "center"
          }}>Boards</h2>
          <h2 style={{
            fontSize: "18px",
            marginBottom: "16px",
            backgroundColor: `${location.pathname === "/templates" ? "#ade8f4" : "#ffffff"}`,
            padding: "10px",
            borderRadius: "5px",
            alignItems: "center"
          }}>Templates</h2>
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
            <h2 style={{fontSize: "18px", marginBottom: "16px"}}>Recently Viewed</h2>
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

          <div style={{marginTop: "32px"}}>
            <h2 style={{fontSize: "18px", marginBottom: "16px"}}>Your Workspaces</h2>
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


