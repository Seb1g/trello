import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../app/store.ts";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {motion} from "framer-motion";
import {updateBoardThunk} from "../../model/updateBoardThunk.ts";
import {DroppableColumn} from "../DroppableColumn/DroppableColumn.tsx";
import {moveColumn, moveItem} from "../../hooks/useKanbanBoard.tsx";
import styles from "./KanbanBoardStyle.module.scss"
import {keyHandler} from "../../lib/KeyHandler.tsx";
import {formatColumnsForSaving} from "../../lib/formatingColumnForSave.ts";

interface Card {
  id: string;
  content: string;
  position: number;
}

interface Columns {
  id: string;
  title: string;
  position: number;
  cards: Card[];
}

export const KanbanBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.getOneBoard);
  const userData = useAppSelector((state) => state.auth.user.id);

  const [columns, setColumns] = useState<Columns[]>([]);
  const [isOpenNewColumn, setOpenNewColumn] = useState(false);

  React.useEffect(() => {
    if (board?.board?.columns) {
      setColumns(Object.values(board.board.columns)
        .map(col => ({
          ...col,
          cards: Object.values(col.cards || {}),
          id: col.id,
          title: col.title,
          position: col.position
        }))
        .sort((
          a,
          b
        ) => a.position - b.position));
    }
  }, [board?.board?.columns]);

  const handleMoveItem = (itemId: string, targetColumnId: string, targetIndex?: number) => {
    setColumns(prev => moveItem(prev, itemId, targetColumnId, targetIndex))
  }

  const handleMoveColumn = (dragIndex: number, hoverIndex: number) => {
    setColumns((prev) => moveColumn(dragIndex, hoverIndex, prev))
  }

  useEffect(() => {
    return keyHandler({
      onEscape: () => {
        setOpenNewColumn(false)
      },
      onEnter: () => {
        //TODO: Сделать создание колонны
      },
    });
  }, [setOpenNewColumn]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={`${styles.kanbanBoard}`}>
        {columns.map((column, index) => (
          <DroppableColumn
            key={column.id}
            id={column.id}
            title={column.title}
            cards={column.cards}
            onColumnDrop={() => {
              const formatted = formatColumnsForSaving(columns);
              console.log("ready to send to API", formatted, board.board.id);
              dispatch(updateBoardThunk({boardId: board.board.id, boardData: formatted, userId: userData}))
            }}
            moveItem={handleMoveItem}
            moveColumn={handleMoveColumn}
            index={index}
          />
        ))}
        <motion.div
          className={`${styles.newColumnContainer}`}
          layout
          transition={{type: "keyframes", stiffness: 50}}
        >
          {isOpenNewColumn ? (
            <motion.div
              className={`${styles.createColumnContainer}`}>
              <div className={`${styles.newColumnInput}`}>
                <input
                  type="text"
                  placeholder="Enter the name of the new column"
                  autoFocus/>
              </div>
              <div
                className={`${styles.createColumnButtonsContainer}`}>
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
              className={`${styles.openMenuCreateColumnContainer}`}
              onClick={() => {
                setOpenNewColumn(true);
              }}
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