import React, {useState} from "react";
import DropdownNavBar from "../../shared/ui/DropdownNavBar/DropdownNavBar.tsx";

interface NavProps {
  children: React.ReactNode;
}

export const NavBar = ({children}: NavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCreateBoardModal, setIsOpenCreateBoardModal] = useState(false);
  return (
    <nav
      style={{
        height: "48px",
        display: "flex",
        alignItems: "center",
        justifyContent: 'space-between',
        border: "0.4px solid #edede9",
        padding: "10px",
      }}>
      <div className="navbar"
           style={{
             height: "48px",
             display: "flex",
             alignItems: "center",
             gap: "3rem",
           }}>
        <div className="linkContainer"
             style={{display: "flex", gap: "35px", alignItems: "center"}}>
          <div className="gitIcon">
            <a href="https://github.com/Seb1g">
              <svg width="32" height="30" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                      fill="#24292f"/>
              </svg>
            </a>
          </div>
          <div className="logoContainer">
            <svg xmlns="http://www.w3.org/2000/svg" width="136" viewBox="0 0 293.29 64.56">
              <defs>
                <linearGradient id="A" x1="31.52" y1="64.56" x2="31.52" y2="1.51" gradientUnits="userSpaceOnUse">
                  <stop offset=".18" stopColor="#0052cc"/>
                  <stop offset="1" stopColor="#2684ff"/>
                </linearGradient>
              </defs>
              <g fillRule="evenodd">
                <path
                  d="M130.14 4.58v7.57H111V62.4h-7.92V12.14H86.84V4.58zM134 18.4h7.4v7.74c2.55-5.2 7-8.9 15.58-8.36v7.4c-9.68-1-15.58 1.94-15.58 11.26v26H134zm49.64 44.88c-16.46 0-23.67-9.5-23.67-23 0-13.3 7.4-22.8 20.77-22.8 13.55 0 19 9.42 19 22.8v3.43h-32.1c1.06 7.48 5.9 12.32 16.28 12.32a39 39 0 0 0 13.38-2.38v7c-3.6 1.93-9.16 2.63-13.65 2.63zm-16.1-26h24.55c-.44-8.18-4.14-12.85-11.7-12.85-8-.04-12.06 5.15-12.85 12.8zm52.98 25.38c-7.22 0-11.8-3.43-11.8-11.53V0h7.57v50.25c0 4 2.64 5.37 5.9 5.37a19.17 19.17 0 0 0 2.2-.09v6.77a16.11 16.11 0 0 1-3.88.35zm22.96 0c-7.22 0-11.8-3.43-11.8-11.53V0h7.57v50.25c0 4 2.64 5.37 5.9 5.37a19.17 19.17 0 0 0 2.2-.09v6.77a16.11 16.11 0 0 1-3.88.35zm8.1-22.35c0-13.2 7.74-22.8 20.94-22.8s20.77 9.6 20.77 22.8-7.66 23-20.77 23-20.94-9.8-20.94-23zm7.4 0c0 8.36 4.14 15.93 13.55 15.93s13.38-7.57 13.38-15.93-4-15.75-13.37-15.75S259 31.94 259 40.3z"
                  fill="#253858"/>
                <path
                  d="M55.16 1.5H7.88A7.88 7.88 0 0 0 0 9.39v47.28a7.88 7.88 0 0 0 7.88 7.88h47.28A7.88 7.88 0 0 0 63 56.67V9.4a7.88 7.88 0 0 0-7.84-7.88zM27.42 49.26A3.78 3.78 0 0 1 23.64 53H12a3.78 3.78 0 0 1-3.8-3.74V13.5A3.78 3.78 0 0 1 12 9.71h11.64a3.78 3.78 0 0 1 3.78 3.78zM54.85 33.5a3.78 3.78 0 0 1-3.78 3.78H39.4a3.78 3.78 0 0 1-3.78-3.78v-20a3.78 3.78 0 0 1 3.78-3.79h11.67a3.78 3.78 0 0 1 3.78 3.78z"
                  fill="url(#A)"/>
              </g>
            </svg>
          </div>
        </div>
        <div className="recentBoards"
             style={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: "center",
             }}>
          <DropdownNavBar/>
        </div>
        <div className="templates"
             style={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: "center",
             }}>
          <DropdownNavBar/>
        </div>
        <div className="createBoardButton"
             style={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: "center",
             }}>
          <div style={{position: "relative", flexDirection: "row",}}>
            <button
              style={{
                backgroundColor: "#2563eb",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.2rem",
                cursor: "pointer",
                height: "32px",
                fontWeight: "bold",
              }}
              onClick={() => setIsOpen(!isOpen)}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
            >
              Create board
            </button>
            {isOpen && (
              <div
                style={{
                  position: "absolute",
                  marginTop: "0.5rem",
                  width: "16rem",
                  backgroundColor: "white",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  borderRadius: "0.5rem",
                  zIndex: 10,
                }}
              >
                  <button
                    className="createBoardButton"
                    onClick={() => setIsOpenCreateBoardModal(!isOpenCreateBoardModal)}
                    style={{
                      width: "280px",
                      height: "88px",
                      textAlign: "left",
                      padding: "6px 12px",
                      cursor: "pointer",
                      position: "relative",
                      zIndex: 1, // Поднимаем кнопку выше других элементов
                    }}
                  >
                    <h1>Create board</h1>
                    <div>
                      A board is a collection of cards organized into lists. Use it to manage a project, track, or
                      organize anything.
                    </div>
                  </button>

                  {isOpenCreateBoardModal && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0, // Смещаем модальное окно к верхнему краю кнопки
                        left: 0, // Прижимаем к левому краю кнопки
                        width: "280px",
                        backgroundColor: "white",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        borderRadius: "0.5rem",
                        zIndex: 20, // Поднимаем окно выше кнопки
                        padding: "8px",
                      }}
                    >
                      <div
                        className="buttonContainer"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setIsOpenCreateBoardModal(false)}
                          style={{
                            borderRadius: "0.2rem",
                            border: "none",
                            height: "32px",
                            width: "32px",
                            backgroundColor: "white",
                            cursor: "pointer",
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e0e1dd")}
                          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M7.29289 11.2929L14.364 4.22185C14.7545 3.83132 15.3876 3.83132 15.7782 4.22185C16.1687 4.61237 16.1687 5.24554 15.7782 5.63606L9.41421 12L15.7782 18.364C16.1687 18.7545 16.1687 19.3877 15.7782 19.7782C15.3877 20.1687 14.7545 20.1687 14.364 19.7782L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      Hello world
                    </div>
                  )}
                <button className="createBoardWithTemplatesButton"
                        style={{
                          width: "280px",
                          height: "56px",
                          textAlign: "left",
                          padding: "6px 12px",
                          cursor: "pointer",
                        }}>
                  <h1>Starts with templates</h1>
                  <div>
                    Get started faster with a board template.
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
      <div className="userAccount"
           style={{
             display: 'flex',
             justifyContent: 'center',
             alignItems: "center",
           }}>
        {children}
      </div>
    </nav>
  )
}