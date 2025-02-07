import React from "react";

interface NavProps {
  children: React.ReactNode;
}

export const NavBar = ({children}: NavProps) => {

  return (
    <div
      style={{display: 'flex', flexDirection: 'row', marginBottom: "40px"}}>
      <div className="gitIcon">Git icon</div>
      <div className="logo">Logo</div>
      <div className="recentBoards">Recent Boards</div>
      <div className="templates">Templates</div>
      <div className="createBoardButton">Create board button</div>
      <div className="userAccount">
        <div>{children}</div>
      </div>
    </div>
  )
}