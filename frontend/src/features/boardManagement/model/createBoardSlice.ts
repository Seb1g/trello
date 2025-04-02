import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createBoards} from "./createBoardThunk";

interface Board {
  id: string;
  title: string;
  userId: number;
}

export interface BoardState {
  board: Board | null;
  loading: boolean;
  error: string | null;
}

const initialState: BoardState = {
  board: null,
  loading: false,
  error: null,
};


const createBoardSlice = createSlice({
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

export default createBoardSlice.reducer;