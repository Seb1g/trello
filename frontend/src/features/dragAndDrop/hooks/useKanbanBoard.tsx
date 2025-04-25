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

export const moveItem = (
  columns: Columns[],
  itemId?: string,
  targetColumnId?: string,
  targetIndex?: number
): Columns[] => {
  const sourceCol = columns.find(col => col.cards.some(card => card.id === itemId));
  const targetCol = columns.find(col => col.id === targetColumnId);
  if (!sourceCol || !targetCol) return columns;

  const item = sourceCol.cards.find(card => card.id === itemId);
  if (!item) return columns;

  const currentIndex = sourceCol.cards.findIndex(card => card.id === itemId);
  const newIndex = targetIndex ?? targetCol.cards.length;
  if (sourceCol.id === targetCol.id && currentIndex === newIndex) return columns;

  const updatedColumns = columns.map(col => ({
    ...col,
    cards: [...col.cards],
  }));

  const updatedSourceCol = updatedColumns.find(col => col.id === sourceCol.id);
  updatedSourceCol!.cards = updatedSourceCol!.cards.filter(card => card.id !== itemId);

  const updatedTargetCol = updatedColumns.find(col => col.id === targetCol.id);
  updatedTargetCol!.cards.splice(newIndex, 0, item);

  return updatedColumns;
}

export const moveColumn = (
  dragIndex: number,
  hoverIndex: number,
  columns: Columns[]
) => {
  if (dragIndex === hoverIndex) return columns;

  const newColumns = [...columns];
  const [draggedColumn] = newColumns.splice(dragIndex, 1);
  newColumns.splice(hoverIndex, 0, draggedColumn);
  return newColumns;
};