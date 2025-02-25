import apiClient from '../api/createApi';

interface GetUserBoards {
  token: string;
}

interface GetUserBoard {
  id: string;
  boardId: number;
  token: string;
}

interface CreateBoardData {
  title: string;
  token: string;
}

export const getBoardsApi = (data: GetUserBoards) => {
  return apiClient.post('/boards/get_all_user-board', data, {
    headers: {Authorization: `Bearer ${data.token}`},
  });
};

export const getBoardApi = (data: GetUserBoard) => {
  return apiClient.post('/boards/get_board', data, {
    headers: {Authorization: `Bearer ${data.token}`},
  });
};

export const createBoardApi = (data: CreateBoardData) => {
  return apiClient.post('/boards/create_board', data, {
    headers: {Authorization: `Bearer ${data.token}`},
  });
};


// export const updateBoardApi = (boardId: number, data: Partial<string>, token: string) => {
//   return apiClient.put(`/board/board/${boardId}`, data, {
//     headers: {Authorization: `Bearer ${token}`},
//   });
// };
//
// export const deleteBoardApi = (boardId: number, token: string) => {
//   return apiClient.delete(`/board/board/${boardId}`, {
//     headers: {Authorization: `Bearer ${token}`},
//   });
// };