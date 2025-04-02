import React from 'react';
import {NavBar} from "../../widgets/Navbar/Navbar.tsx";
import {DashboardContainer} from "../../features/boardManagement/ui/DashboardContainer.tsx";

export const Dashboard: React.FC = () => {

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
            backgroundColor: "#ade8f4",
            padding: "10px",
            borderRadius: "5px"
          }}>
            Boards
          </h2>
          <h2 style={{
            fontSize: "18px",
            marginBottom: "16px",
            backgroundColor: "#ade8f4",
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
