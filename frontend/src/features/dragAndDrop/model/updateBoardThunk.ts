import {updateBoardApi} from '../../../shared/config/boardsApi.ts';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

interface Response {
  message: string;
  board: string;
}

interface CardsData {
  id: string;
  content: string;
  position: number;
}

interface BoardData {
  id: string;
  title: string;
  position: number;
  cards: CardsData[];
}

interface UpdateBoardData {
  boardId: string;
  boardData: BoardData[];
  userId: number;
}

const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || 'Ошибка запроса';
  }
  return 'Неизвестная ошибка';
};

export const updateBoardThunk = createAsyncThunk<
  Response,
  UpdateBoardData,
  { rejectValue: string }
>('board/update_board', async (credentials, {rejectWithValue}) => {
  try {
    const response = await updateBoardApi(credentials);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});
