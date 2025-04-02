import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getUserBoards} from "./getUserBoardsThunk.ts";

export interface Board {
  id: string;
  userId: number;
  title: string;
}

export interface BoardsState {
  boards: Board[];
  loading: boolean;
  error: string | null;
}

const initialState: BoardsState = {
  boards: [],
  loading: false,
  error: null,
};

const getUserBoardsSlice = createSlice({
  name: 'getUserBoard',
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
  },
});

export default getUserBoardsSlice.reducer;