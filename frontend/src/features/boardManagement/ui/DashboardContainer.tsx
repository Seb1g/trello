import React from "react";
import {useAppDispatch, useAppSelector} from "../../../app/store.ts";
import {getOneBoard} from "../model/getOneBoardThunk.ts";
import {useNavigate} from "react-router-dom";

export const DashboardContainer: React.FC = () => {
  const allBoards = useAppSelector(state => state.getUserBoards);
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div
      style={{
        flex: "1 1 auto",
        width: "825px",
        maxWidth: "825px",
        minWidth: "347px",
        overflowX: "auto",
      }}>
      <div>
        <h2 style={{fontSize: "18px", marginBottom: "16px"}}>Recently Viewed</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
          gap: "16px",
        }}>
          {allBoards.boards && typeof allBoards.boards === "object" ? (
            Object.values(allBoards.boards).map((content) => (
              <button className="cardContainer"
                      key={content.id}
                      style={{
                        height: "100px",
                        backgroundColor: "#dfe1e6",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        if (token !== null) {
                          dispatch(getOneBoard({id: token, boardId: content.id, token: token}));
                          navigate("/board");
                        }
                      }}
              >{content.title}</button>
            ))
          ) : (
            <div>Error</div>
          )}
        </div>
      </div>
      <div style={{marginTop: "32px"}}>
        <h2 style={{fontSize: "18px", marginBottom: "16px"}}>Your Workspaces</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
          gap: "16px",
        }}>
          {allBoards.boards && typeof allBoards.boards === "object" ? (
            Object.values(allBoards.boards).map((content) => (
              <button className="cardContainer"
                      key={content.id}
                      style={{
                        height: "100px",
                        backgroundColor: "#dfe1e6",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        if (token !== null) {
                          dispatch(getOneBoard({id: token, boardId: content.id, token: token}));
                          navigate("/board");
                        }
                      }}
              >{content.title}</button>
            ))
          ) : (
            <div>Error</div>
          )}
        </div>
      </div>
    </div>
  )
}