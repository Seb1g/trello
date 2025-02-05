import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getBoardsApi, createBoardApi } from '../../../shared/api/boardsApi';
import { RootState } from '../../../app/store';

interface Board {
  id: number;
  title: string;
  description?: string;
}

interface BoardState {
  boards: Board[];
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: BoardState = {
  boards: [],
  loading: false,
  error: null,
};

export const fetchBoards = createAsyncThunk<
  Board[],
  string, // ожидаем token
  { rejectValue: string }
>('board/fetchBoards', async (token, { rejectWithValue }) => {
  try {
    const response = await getBoardsApi(token);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки досок');
  }
});

export const addBoard = createAsyncThunk<
  Board,
  { data: { title: string; description?: string }; token: string },
  { rejectValue: string }
>('board/addBoard', async ({ data, token }, { rejectWithValue }) => {
  try {
    const response = await createBoardApi(data, token);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Ошибка создания доски');
  }
});

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    // Дополнительные синхронные экшены при необходимости
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBoards.fulfilled, (state, action: PayloadAction<Board[]>) => {
      state.loading = false;
      state.boards = action.payload;
    });
    builder.addCase(fetchBoards.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Ошибка загрузки досок';
    });

    builder.addCase(addBoard.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addBoard.fulfilled, (state, action: PayloadAction<Board>) => {
      state.loading = false;
      state.boards.push(action.payload);
    });
    builder.addCase(addBoard.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Ошибка создания доски';
    });
  },
});

export const selectBoard = (state: RootState) => state.board;
export default boardSlice.reducer;
