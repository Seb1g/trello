import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getOneBoard} from "./getOneBoardThunk.ts";

interface Cards {
  id: string;
  content: string;
  position: number;
}

interface Columns {
  id: string;
  title: string;
  position: number;
  cards: Cards[];
}

interface Board {
  title: string;
  id: string;
  columns: Columns[];
}

export interface BoardsState {
  board: Board;
  loading: boolean;
  error: string | null;
}

const initialState: BoardsState = {
  board: {
    id: "",
    title: "",
    columns: [],
  },
  loading: false,
  error: null,
};

const getOneBoardSlice = createSlice({
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

export default getOneBoardSlice.reducer;