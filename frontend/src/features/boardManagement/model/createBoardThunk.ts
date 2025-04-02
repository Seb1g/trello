import {createUserBoardApi} from '../../../shared/config/boardsApi.ts';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

interface createBoardData {
  title: string;
  userId: number;
}

interface Board {
  id: string;
  title: string;
  userId: number;
}

const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || 'Ошибка запроса';
  }
  return 'Неизвестная ошибка';
};

export const createBoards = createAsyncThunk<
  Board,
  createBoardData,
  { rejectValue: string }
>('board/create_board', async (credentials, {rejectWithValue}) => {
  try {
    const response = await createUserBoardApi(credentials);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});
