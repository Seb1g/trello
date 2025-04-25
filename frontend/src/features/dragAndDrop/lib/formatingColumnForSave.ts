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

export const formatColumnsForSaving = (columns: Columns[]) => {
  return columns.map((col, colIndex) => ({
    ...col,
    position: colIndex + 1,
    cards: col.cards.map((card, cardIndex) => ({
      ...card,
      position: cardIndex + 1,
    })),
  }));
};