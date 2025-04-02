import {getOneUserBoardApi} from '../../../shared/config/boardsApi.ts';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

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

interface GetOneBoardThunk {
  boardId: string;
  userId: number;
}

const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || 'Ошибка запроса';
  }
  return 'Неизвестная ошибка';
};

export const getOneBoard = createAsyncThunk<
  Board,
  GetOneBoardThunk,
  { rejectValue: string }
>('board/get_one_user_board', async (credentials, {rejectWithValue}) => {
  try {
    const response = await getOneUserBoardApi(credentials);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});
