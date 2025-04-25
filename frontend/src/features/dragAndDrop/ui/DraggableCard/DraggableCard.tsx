import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {keyHandler} from "../../lib/KeyHandler.tsx";
import styles from './DraggableCardStyle.module.scss'
import {RenameInputButton} from "../../../renameInputButton/ui/RenameInputButton.tsx";
import {DraggableCardProps} from "../../types/DraggableCardTypes.ts";
import {useDrag} from "react-dnd";
import {ItemType} from "../../model/ItemType.ts";

export const DraggableCard: React.FC<DraggableCardProps> = ({id, content, columnId, index}) => {
  // TODO: Перенести код снизу в useDraggableCard
  // const { drag, isDragging } = useDraggableCard({ id, columnId, index });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.ITEM,
    item: { id, columnId, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [id, columnId, index]);

  const [contents, setContents] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    return keyHandler({
      onEscape: () => {
        setIsEditing(false)
      },
      onEnter: () => {
        setIsEditing(false);
      },
    });
  }, [setIsEditing]);

  return (
    <motion.div
      ref={drag}
      layout
      transition={{type: "spring", stiffness: 500, damping: 30}}
      className={`${styles.card} ${isDragging ? styles.isDragging : ''}`}
    >
      <RenameInputButton
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        content={contents}
        setContent={setContents}
        editInputStyle={styles.editInput}
        contentStyle={styles.content}
      />
    </motion.div>
  );
};