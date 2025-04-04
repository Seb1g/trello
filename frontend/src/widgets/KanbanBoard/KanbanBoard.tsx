import React, {useCallback, useEffect, useRef, useState} from "react";
import {useAppSelector} from "../../app/store.ts";
import {DndProvider, useDrag, useDrop, DropTargetMonitor} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {motion} from "framer-motion";

const ItemType = {
  ITEM: "item",
  COLUMN: "column",
};

interface DragItem {
  id: string;
  type: string;
  columnId: string;
  index: number;
}

interface Columns {
  id: string;
  title: string;
  position: number;
  cards: Card[];
}

const DraggableCard: React.FC<{
  id: string;
  content: string;
  columnId: string;
  index: number;
  moveItem: (id: string, columnId: string, targetIndex?: number) => void;
}> = ({id, content, columnId, index}) => {
  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemType.ITEM,
    item: {id, columnId, index},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [id, columnId, index]);

  const [isEditing, setIsEditing] = useState(false);
  const [contents, setContents] = useState(content);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter") {
        setIsEditing(false)
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setIsEditing]);

  return (
    <motion.div
      ref={drag}
      layout
      transition={{type: "spring", stiffness: 500, damping: 30}}
      style={{
        padding: "8px",
        margin: "4px",
        backgroundColor: "lightblue",
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
        borderRadius: "4px",
        boxShadow: isDragging ? "0px 5px 15px rgba(0, 0, 0, 0.2)" : "none",
        gap: "20px"
      }}
    >
      {isEditing ? (
        <input
          type="text"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          onBlur={() => setIsEditing(false)}
          autoFocus
          style={{
            width: "100%",
            padding: "5px",
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
          {contents}
        </p>
      )}
    </motion.div>
  );
};

interface Card {
  id: string;
  content: string;
  position: number;
}

const DroppableColumn: React.FC<{
  id: string;
  title: string;
  cards: Card[];
  columns: Columns;
  moveItem: (id: string, columnId: string, targetIndex?: number) => void;
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
  index: number;
}> = ({id, title, cards, moveItem, moveColumn, index}) => {

  const columnRef = useRef<HTMLDivElement | null>(null);

  const [{isDragging}, drag] = useDrag(
    () => ({
      type: ItemType.COLUMN,
      item: {id, index},
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, index]
  );

  const [, dropColumn] = useDrop({
    accept: ItemType.COLUMN,
    hover: (item: DragItem, monitor: DropTargetMonitor) => {
      if (!columnRef.current || item.index === index) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = columnRef.current.getBoundingClientRect();
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) return;

      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) return;
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) return;

      moveColumn(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    drop: (item: DragItem) => {
      dispatch(updateBoard(columns));
    }
  });

  const setColumnRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      drag(dropColumn(node));
      columnRef.current = node;
    }
  }, [drag, dropColumn]);

  const [, drop] = useDrop({
    accept: ItemType.ITEM,
    hover: (item: DragItem, monitor: DropTargetMonitor) => {
      if (!columnRef.current) return;

      const dragIndex = item.index;
      const dragColumnId = item.columnId;
      const hoverColumnId = id;
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) return;

      const hoverBoundingRect = columnRef.current.getBoundingClientRect();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      const hoverIndex = Math.floor(hoverClientY / 40);

      if (dragColumnId === hoverColumnId) {
        if (dragIndex === hoverIndex) return;
        const hoverMiddleY = hoverIndex * 40 + 20;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
        moveItem(item.id, hoverColumnId, hoverIndex);
        item.index = hoverIndex;
      } else {
        moveItem(item.id, hoverColumnId, hoverIndex);
      }
    },
    drop: (item: DragItem) => {
      dispatch(updateBoard(columns));
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [columnTitle, setColumnTitle] = useState(title);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsEditing(false);
        setIsCreatingNewCard(false);
      } else if (event.key === "Enter") {
        setIsEditing(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setIsEditing]);

  const [isCreatingNewCard, setIsCreatingNewCard] = useState(false);
  const [newCard, setNewCard] = useState("");
  console.log(newCard);

  return (
    <motion.div
      ref={setColumnRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? "rotate(3deg)" : "none",
      }}
      layout
      transition={{type: "keyframes", stiffness: 50}}
    >
      <motion.div
        ref={drop}
        style={{
          padding: "16px",
          backgroundColor: "lightgray",
          minWidth: "150px",
          minHeight: "75px",
          margin: "8px",
          borderRadius: "8px",
        }}
      >
        {isEditing ? (
          <input
            type="text"
            value={columnTitle}
            onChange={(e) => setColumnTitle(e.target.value)}
            onBlur={() => setIsEditing(false)}
            autoFocus
            style={{
              width: "100%",
              padding: "5px",
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
            {columnTitle}
          </p>
        )}
        {cards?.map((card, idx) => (
          <DraggableCard
            key={card.id}
            id={card.id}
            content={card.content}
            columnId={id}
            index={idx}
            moveItem={moveItem}
          />
        ))}
        {isCreatingNewCard ? (
          <div className="newItemContainer">
            <div className="inputBox">
              <textarea
                onChange={(e) => setNewCard(e.target.value)}
                onBlur={() => setIsEditing(false)}
                autoFocus
                style={{
                  width: "100%",
                  height: "76px",
                  padding: "5px",
                  border: "1px solid #0079bf",
                  borderRadius: "4px",
                  outline: "none",
                }}
              />
            </div>
            <div className="button box"
                 style={{
                   display: "flex",
                   gap: "20px"
                 }}>
              <button
                className="newCardItem"
                type="button"
                onClick={() => {
                  setIsCreatingNewCard(false);
                }}
              >
                Add card
              </button>
              <button
                className="closeNewCardContainer"
                onClick={() => setIsCreatingNewCard(false)}>
                X
              </button>
            </div>
          </div>
        ) : (
          <p
            style={{
              color: "#5e6c84",
              fontSize: "14px",
              marginTop: "10px",
              cursor: "pointer",
            }}
            onClick={() => setIsCreatingNewCard(true)}
          >
            + Добавить карточку
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

export const KanbanBoard: React.FC = () => {
  const board = useAppSelector((state) => state.getOneBoard);

  const [columns, setColumns] = useState<Array<Columns>>([]);

  React.useEffect(() => {
    if (board?.board?.columns) {
      const formattedColumns = Object.values(board.board.columns)
        .map(col => ({
          ...col,
          cards: Object.values(col.cards || {}),
          id: col.id,
          title: col.title,
          position: col.position
        }))
        .sort((a, b) => a.position - b.position);

      setColumns(formattedColumns);
    }
  }, [board?.board?.columns]);

  const moveItem = (itemId: string, targetColumnId: string, targetIndex?: number) => {
    setColumns((prev) => {
      const sourceCol = prev.find(col => col.cards.some(card => card.id === itemId));
      const targetCol = prev.find(col => col.id === targetColumnId);
      if (!sourceCol || !targetCol) return prev;

      const item = sourceCol.cards.find(card => card.id === itemId);
      if (!item) return prev;

      const currentIndex = sourceCol.cards.findIndex(card => card.id === itemId);
      const newIndex = targetIndex ?? targetCol.cards.length;
      if (sourceCol.id === targetCol.id && currentIndex === newIndex) return prev;

      const updatedColumns = prev.map(col => ({
        ...col,
        cards: [...col.cards],
      }));

      const updatedSourceCol = updatedColumns.find(col => col.id === sourceCol.id);
      updatedSourceCol!.cards = updatedSourceCol!.cards.filter(card => card.id !== itemId);

      const updatedTargetCol = updatedColumns.find(col => col.id === targetCol.id);
      updatedTargetCol!.cards.splice(newIndex, 0, item);

      return updatedColumns;
    });
  };

  const moveColumn = (dragIndex: number, hoverIndex: number) => {
    if (dragIndex === hoverIndex) return;

    setColumns((prev) => {
      const newColumns = [...prev];
      const [draggedColumn] = newColumns.splice(dragIndex, 1);
      newColumns.splice(hoverIndex, 0, draggedColumn);
      return newColumns;
    });
  };

  const [hovered, setHovered] = useState(false);
  const style = {
    backgroundColor: hovered ? "gray" : "lightgray",
    color: "black",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "200px",
    height: "45px",
    margin: "8px",
    borderRadius: "8px",
  };

  const [isOpenNewColumn, setOpenNewColumn] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenNewColumn(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setOpenNewColumn]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{display: "flex", gap: "1rem", padding: "10px"}}>
        {columns.map((column, index) => (
          <DroppableColumn
            key={column.id}
            id={column.id}
            title={column.title}
            cards={column.cards}
            columns={column}
            moveItem={moveItem}
            moveColumn={moveColumn}
            index={index}
          />
        ))}
        <motion.div
          style={{
            opacity: 1,
            transform: "none",
          }}
          layout
          transition={{type: "keyframes", stiffness: 50}}
        >
          {isOpenNewColumn ? (
            <motion.div
              style={{
                display: "flex",
                backgroundColor: "lightgray",
                flexDirection: "column",
                color: "black",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
                justifyContent: "center",
                alignItems: "center",
                minWidth: "250px",
                minHeight: "45px",
                margin: "8px",
                borderRadius: "8px",
                gap: "20px",
                padding: "16px",
              }}>
              <div className="newColumnInput">
                <input
                  type="text"
                  placeholder="Enter the name of the new column"
                  autoFocus
                  style={{
                    width: "220px",
                    padding: "5px",
                    border: "1px solid #0079bf",
                    borderRadius: "4px",
                    outline: "none",
                  }}
                />
              </div>
              <div
                className="newColumnButtonsContainer"
                style={{
                  display: "flex",
                  gap: "20px",
                  flexDirection: "row",
                }}>
                <button
                  className="createNewColumnButton"
                  onClick={() => {
                    console.log("Yep!");
                    setOpenNewColumn(false);
                  }}
                >
                  Add column
                </button>
                <button
                  className="closeNewColumnPopup"
                  onClick={() => {
                    setOpenNewColumn(false);
                  }}
                >X
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              style={style}
              onClick={() => {
                setOpenNewColumn(true);
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              + Add another column
            </motion.div>
          )
          }
        </motion.div>
      </div>
    </DndProvider>
  );
};