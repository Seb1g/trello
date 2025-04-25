export interface Card {
  id: string;
  content: string;
  position: number;
}

export interface DragItem {
  id: string;
  type: string;
  columnId: string;
  index: number;
}

export interface DroppableColumnProps {
  id: string;
  title?: string;
  cards?: Card[];
  onColumnDrop?: () => void;
  moveItem?: (id: string, columnId: string, targetIndex?: number) => void;
  moveColumn?: (dragIndex: number, hoverIndex: number) => void;
  index: number;
}