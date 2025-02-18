import apiClient from './createApi';

export interface createBoardData {
  title: string;
  token: string;
}

export const getBoardsApi = (token: string) => {
  return apiClient.post('/boards/get_all_user-board', token, {
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const createBoardApi = (data: createBoardData) => {
  return apiClient.post('/boards/create_board', data);
};

// export const updateBoardApi = (boardId: number, data: Partial<string>, token: string) => {
//   return apiClient.put(`/boards/boards/${boardId}`, data, {
//     headers: {Authorization: `Bearer ${token}`},
//   });
// };
//
// export const deleteBoardApi = (boardId: number, token: string) => {
//   return apiClient.delete(`/boards/boards/${boardId}`, {
//     headers: {Authorization: `Bearer ${token}`},
//   });
// };