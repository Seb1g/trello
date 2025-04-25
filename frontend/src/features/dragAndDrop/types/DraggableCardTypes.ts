export interface DraggableCardProps {
  id: string;
  content?: string;
  columnId: string;
  index: number;
  moveItem?: (id: string, columnId: string, targetIndex?: number) => void;
}