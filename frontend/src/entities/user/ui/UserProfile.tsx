// import logout from "../../../features/auth/model/authSlice.ts";
import {useState} from "react";
// import {useNavigate} from "react-router-dom";
import {Avatar} from "./Avatar.tsx";
import {UserSelector} from "../model/userSelector.ts";

export const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const navigate = useNavigate();
  const { user} = UserSelector()

  // const handleLogout = () => {
  //   dispatch(logout()).then(() => {
  //     navigate('/login')
  //   });
  // };

  return (
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
            <Avatar />
            <div className="userData-info"
                 style={{
                   display: "flex",
                   flexDirection: "column",
                   gap: "0.2rem",
                 }}>
              <p>{user.user === null ? "" : user.user.email}</p>
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
            <button type="button"
                    // onClick={handleLogout}
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
  )
}