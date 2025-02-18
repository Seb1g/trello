import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {getUserBoards, createBoards} from './createBoardThunk.ts';

export interface Board {
  userId: string;
  title: string;
}

export interface BoardState {
  boards: Board[];
  loading: boolean;
  error: string | null;
}

const initialState: BoardState = {
  boards: [],
  loading: false,
  error: null,
};

const boardsSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getUserBoards.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserBoards.fulfilled, (state, action: PayloadAction<Board[]>) => {
      state.loading = false;
      state.boards = action.payload;
    });
    builder.addCase(getUserBoards.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Ошибка получения досок';
    });

    builder.addCase(createBoards.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createBoards.fulfilled, (state, action: PayloadAction<Board>) => {
      state.loading = false;
      state.boards.push(action.payload);
    });
    builder.addCase(createBoards.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Ошибка отправки доски';
    });
  },
});

export const selectBoard = (state: RootState) => state.board;
export default boardsSlice.reducer;