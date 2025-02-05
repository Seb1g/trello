import apiClient from './createApi';

export interface BoardData {
  title: string;
  description?: string;
}

// Получение досок для текущего пользователя
export const getBoardsApi = (token: string) => {
  return apiClient.get('/boards', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Создание новой доски
export const createBoardApi = (data: BoardData, token: string) => {
  return apiClient.post('/boards', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Обновление доски
export const updateBoardApi = (boardId: number, data: Partial<BoardData>, token: string) => {
  return apiClient.put(`/boards/${boardId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Удаление доски
export const deleteBoardApi = (boardId: number, token: string) => {
  return apiClient.delete(`/boards/${boardId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};