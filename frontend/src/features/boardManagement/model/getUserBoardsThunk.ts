import {getAllUserBoardsApi} from '../../../shared/config/boardsApi.ts';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Board} from "./createBoardSlice.ts";

interface GetUserBoardsThunk {
  userId: number;
}

const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || 'Ошибка запроса';
  }
  return 'Неизвестная ошибка';
};

export const getUserBoards = createAsyncThunk<
  Board[],
  GetUserBoardsThunk,
  { rejectValue: string }
>('board/get_all_user-board', async (credentials, {rejectWithValue}) => {
  try {
    const response = await getAllUserBoardsApi(credentials);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});
