import { useDrag } from 'react-dnd';
import { ItemType } from '../model/ItemType.ts';
import { DraggableCardProps } from '../types/DraggableCardTypes.ts';

interface DragResult {
  drag: ReturnType<typeof useDrag>[1];
  isDragging: boolean;
}

export const useDraggableCard = ({ id, columnId, index }: DraggableCardProps): DragResult => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.ITEM,
    item: { id, columnId, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [id, columnId, index]);

  return { drag, isDragging };
};