import {getBoardApi} from '../../../shared/config/boardsApi.ts';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Board} from "./createBoardSlice.ts";

interface GetOneBoardThunk {
  id: string;
  boardId: number;
  token: string;
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
>('board/get_board', async (credentials, {rejectWithValue}) => {
  try {
    const response = await getBoardApi(credentials);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});
