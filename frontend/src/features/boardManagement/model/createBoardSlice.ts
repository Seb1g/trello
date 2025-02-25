import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createBoards} from "./createBoardThunk";

interface Card {
  id: number;
  content: string;
}

interface Cards {
  data: Card[];
}

interface Column {
  title: string;
  cards: Cards;
}

export interface Board {
  columns: Column[];
  id: number;
  userId: string;
  title: string;
}

export interface BoardState {
  board: Board;
  loading: boolean;
  error: string | null;
}

const initialState: BoardState = {
  board: {
    id: 0,
    userId: "",
    title: "",
    columns: [],
  },
  loading: false,
  error: null,
};


export const createBoardSlice = createSlice({
  name: 'createBoard',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(createBoards.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createBoards.fulfilled, (state, action: PayloadAction<Board>) => {
      state.loading = false;
      state.board = action.payload;
    });
    builder.addCase(createBoards.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Ошибка отправки доски';
    });
  },
});