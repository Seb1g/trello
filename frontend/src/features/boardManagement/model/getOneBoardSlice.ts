import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getOneBoard} from "./getOneBoardThunk.ts";

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

export interface BoardsState {
  board: Board;
  loading: boolean;
  error: string | null;
}

const initialState: BoardsState = {
  board: {
    id: 0,
    userId: "",
    title: "",
    columns: [],
  },
  loading: false,
  error: null,
};

export const getOneBoardSlice = createSlice({
  name: 'getOneBoard',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getOneBoard.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOneBoard.fulfilled, (state, action: PayloadAction<Board>) => {
      state.loading = false;
      state.board = action.payload;
    });
    builder.addCase(getOneBoard.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Ошибка получения доски';
    });
  },
});