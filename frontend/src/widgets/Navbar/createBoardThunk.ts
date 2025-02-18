import {
  getBoardsApi,
  createBoardApi,
  createBoardData
} from '../../shared/api/boardsApi.ts';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Board} from "./createBoardSlice.ts";

const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || 'Ошибка запроса';
  }
  return 'Неизвестная ошибка';
};

export const getUserBoards = createAsyncThunk<
  Board[],
  string,
  { rejectValue: string }
>('boards/get_all_user-board', async (credentials, {rejectWithValue}) => {
  try {
    const response = await getBoardsApi(credentials);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const createBoards = createAsyncThunk<
  Board,
  createBoardData,
  { rejectValue: string }
>('boards/create_board', async (credentials, {rejectWithValue}) => {
  try {
    const response = await createBoardApi(credentials);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});
