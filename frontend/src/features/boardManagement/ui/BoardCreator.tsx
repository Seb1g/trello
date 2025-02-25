import {useState} from "react";
import {createBoards} from "../model/createBoardThunk.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../app/store.ts";
import {getOneBoard} from "../model/getOneBoardThunk.ts";

export const BoardCreator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCreateBoardModal, setIsOpenCreateBoardModal] = useState(false);
  const [title, setNewTitle] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCreateBoard = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await dispatch(createBoards({title, token})).unwrap();

        if (res && res.id) {
          await dispatch(getOneBoard({id: token, token, boardId: res.id}));
          navigate("/board");
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
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
              width: "280px",
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
                border: "none",
                borderRadius: "0.5rem",
                backgroundColor: "white",
                zIndex: 1,
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
                  top: 0,
                  left: 0,
                  width: "280px",
                  backgroundColor: "white",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  borderRadius: "0.5rem",
                  zIndex: 20,
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
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpenCreateBoardModal(false);
                      setIsOpen(false);
                    }}
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
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
                            fill="currentColor"></path>
                    </svg>
                  </button>
                </div>
                <div className="createButtonContainer"
                     style={{
                       display: "flex",
                       flexDirection: "column",
                       gap: "20px",
                       padding: "20px",
                     }}>
                  <input type="text"
                         max={25}
                         placeholder="Enter headline board"
                         onChange={e => {
                           setNewTitle(e.target.value)
                         }}/>
                  <button onClick={handleCreateBoard}>Create board</button>
                </div>
              </div>
            )}
            <button className="createBoardWithTemplatesButton"
                    style={{
                      width: "280px",
                      height: "56px",
                      textAlign: "left",
                      padding: "6px 12px",
                      cursor: "pointer",
                      border: "none",
                      borderRadius: "0.5rem",
                      backgroundColor: "white",
                    }}>
              <h1>Starts with templates</h1>
              <div>
                Get started faster with a board template.
              </div>
            </button>
          </div>
        )}
      </div>
  )
};