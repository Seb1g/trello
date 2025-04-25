import React, {useCallback, useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import {DraggableCard} from "../DraggableCard/DraggableCard.tsx";
import {DroppableColumnProps} from "../../types/DroppableColumnTypes.ts";
import {useDropColumn, useDroppableColumn, useIsDraggingDroppableColumn} from "../../hooks/useDroppableColumn.tsx";
import {keyHandler} from "../../lib/KeyHandler.tsx";
import {RenameInputButton} from "../../../renameInputButton/ui/RenameInputButton.tsx";
import styles from "./DroppableColumnStyle.module.scss";

export const DroppableColumn: React.FC<DroppableColumnProps> = ({id, title, cards, moveItem, moveColumn, index, onColumnDrop}) => {
  const columnRef = useRef<HTMLDivElement | null>(null);
  const {drag, isDragging} = useIsDraggingDroppableColumn({id, index});
  const {dropColumn} = useDroppableColumn({columnRef, index, moveColumn, onColumnDrop,});
  const {drop} = useDropColumn({columnRef, id, moveItem, onColumnDrop,});

  // TODO: Перенести код снизу в useDroppableColumn
  const setColumnRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        drag(dropColumn(node));
        drop(node);
        columnRef.current = node;
      }
    },
    [drag, dropColumn, drop]
  );

  const [isEditing, setIsEditing] = useState(false);
  const [columnTitle, setColumnTitle] = useState(title);
  const [isCreatingNewCard, setIsCreatingNewCard] = useState(false);
  const [newCard, setNewCard] = useState("");

  useEffect(() => {
    return keyHandler({
      onEscape: () => {
        setIsEditing(false);
        setIsCreatingNewCard(false);
      },
      onEnter: () => {
        setIsEditing(false);
      },
    });
  }, []);

  const handleAddCard = () => {
    if (newCard.trim()) {
      // TODO: вызвать внешний handler добавления карточки
      console.log("Добавляем карточку:", newCard);
    }
    setIsCreatingNewCard(false);
    setNewCard("");
  };

  return (
    <motion.div
      ref={setColumnRef}
      layout
      transition={{type: "keyframes", stiffness: 50}}
      className={`${styles.column} ${isDragging ? styles.isDragging : ""}`}
    >
      <div
        className={"dropWrapper"}
        ref={drop}
      >
        <RenameInputButton
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          content={columnTitle}
          setContent={setColumnTitle}
          editInputStyle={styles.editInput}
          contentStyle={styles.content}
        />
        <motion.div
          className={styles.cards}
          transition={{type: "keyframes", stiffness: 90}}
        >
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
        </motion.div>
        {isCreatingNewCard ? (
          <>
          <textarea
            value={newCard}
            onChange={(e) => setNewCard(e.target.value)}
            onBlur={() => setIsEditing(false)}
            autoFocus
            className={styles.textArea}
          />
            <div>
              <button
                className={styles.buttonBox}
                type="button"
                onClick={handleAddCard}
              >
                Добавить карточку
              </button>
              <button
                className="closeNewCardContainer"
                onClick={() => setIsCreatingNewCard(false)}
              >
                ✕
              </button>
            </div>
          </>
        ) : (
          <button
            type="button"
            className={styles.createColumnButton}
            onClick={() => setIsCreatingNewCard(true)}
          >
            + Добавить карточку
          </button>
        )}
      </div>
    </motion.div>
  );
};
