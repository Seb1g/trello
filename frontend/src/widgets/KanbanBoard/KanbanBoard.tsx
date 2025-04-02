import React, {useState} from "react";
import {useAppSelector} from "../../app/store.ts";

export const KanbanBoard: React.FC = () => {
  const board = useAppSelector((state) => state.getOneBoard);

  return (
    <div style={{
      display: "flex", gap: "1rem", padding: "10px"
    }}>
      {board && typeof board.board.columns === "object" ? (
        Object.values(board.board.columns).map((columns, index) => (
          <Column key={index} column={columns} />
        ))
      ) : (
        <div>No columns available</div>
      )}
    </div>
  );
};

interface Cards {
  id: string;
  content: string;
  position: number;
}

interface Columns {
  id: string;
  title: string;
  position: number;
  cards: Cards[];
}

const Column: React.FC<{ column: Columns }> = ({ column }) => {
  const [title, setTitle] = useState(column.title);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <div
        style={{
          width: "272px",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          transition: "all 0.3s ease",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          wordBreak: "break-word",
        }}
      >
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setIsEditing(false)}
            autoFocus
            style={{
              width: "100%",
              padding: "5px",
              fontSize: "14px",
              border: "1px solid #0079bf",
              borderRadius: "4px",
              outline: "none",
            }}
          />
        ) : (
          <p
            onClick={() => setIsEditing(true)}
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              margin: 0,
            }}
          >
            {title}
          </p>
        )}
        {column.cards && typeof column.cards === "object" ? (
          Object.values(column.cards).map((content, id) => (
            <Card key={id} content={content.content} />
          ))
        ) : (
          <div></div>
        )}

        <p
          style={{
            color: "#5e6c84",
            fontSize: "14px",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          + Добавить карточку
        </p>
      </div>
    </div>
  );
};

const Card: React.FC<{ content: string }> = ({ content }) => {
  const [hovered, setHovered] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <div
      style={{
        width: "256px",
        background: "#FFF",
        padding: "10px",
        borderRadius: "6px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        transition: "all 0.3s ease",
        wordBreak: "break-word", // Перенос по символу
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        style={{
          flexGrow: 1,
          transition: "transform 0.3s ease",
          transform: hovered ? "translateX(20px)" : "translateX(0)",
          fontSize: "14px",
        }}
      >
        {content}
      </span>
      {hovered && (
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        />
      )}
    </div>
  );
};
