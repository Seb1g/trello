import {ConnectDropTarget, DropTargetMonitor, useDrag, useDrop} from 'react-dnd';
import {ItemType} from '../model/ItemType.ts';
import {DragItem, DroppableColumnProps} from "../types/DroppableColumnTypes.ts";
import React, {useCallback} from "react";

interface DragResult {
  drag: ReturnType<typeof useDrag>[1];
  isDragging: boolean;
}

export const useIsDraggingDroppableColumn = ({ id, index }: DroppableColumnProps): DragResult => {
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

  return { drag, isDragging };
};

interface useDroppableColumnProps {
  columnRef: React.RefObject<HTMLDivElement>;
  index: number;
  moveColumn?: (dragIndex: number, hoverIndex: number) => void;
  onColumnDrop?:() => void;
}

export const useDroppableColumn = ({columnRef, index, moveColumn, onColumnDrop}: useDroppableColumnProps) => {
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

      if (moveColumn !== undefined) moveColumn(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
    drop: () => {
      onColumnDrop?.();
    }
  });
  return {dropColumn};
}

interface useSetColumnRefProps {
  drag: ReturnType<typeof useDrag>[1];
  dropColumn: ConnectDropTarget;
}

export const useSetColumnRef = ({drag, dropColumn}: useSetColumnRefProps) => {
  return useCallback((node: HTMLDivElement | null) => {
    if (node) {
      drag(dropColumn(node));
    }
  }, [drag, dropColumn]);
}

interface useDropColumnProps {
  columnRef: React.RefObject<HTMLDivElement>;
  id: string; // id текущей колонки
  moveItem?: (itemId: string, targetColumnId: string, targetIndex?: number) => void;
  onColumnDrop?: () => void;
}

export const useDropColumn = ({
                                columnRef,
                                id,
                                moveItem,
                                onColumnDrop
                              }: useDropColumnProps) => {
  const [, drop] = useDrop({
    accept: ItemType.ITEM,
    hover: (item: DragItem, monitor: DropTargetMonitor) => {
      if (!columnRef.current) return;

      const hoverBoundingRect = columnRef.current.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      const hoverIndex = Math.floor(hoverClientY / 40); // ← предполагаемая высота карточки

      const dragColumnId = item.columnId;
      const hoverColumnId = id;

      if (dragColumnId === hoverColumnId && item.index === hoverIndex) return;

      moveItem?.(item.id, hoverColumnId, hoverIndex);
      item.index = hoverIndex;
      item.columnId = hoverColumnId;
    },
    drop: () => {
      onColumnDrop?.();
    }
  });

  return { drop };
};
