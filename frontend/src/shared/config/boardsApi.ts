import apiClient from '../api/createApi';

interface GetAllUserBoards {
  userId: number;
}

interface GetOneUserBoard {
  boardId: string;
  userId: number;
}

interface CreateUserBoardData {
  title: string;
  userId: number;
}

interface DeleteUserBoardData {
  boardId: string;
  userId: number;
}

interface RenameUserBoardData {
  boardId: string;
  userId: number;
  newName: string;
}

export const getAllUserBoardsApi = (data: GetAllUserBoards) => {
  return apiClient.post('/board/get_all_user_boards', data);
};

export const getOneUserBoardApi = (data: GetOneUserBoard) => {
  return apiClient.post('/board/get_one_user_board', data);
};

export const createUserBoardApi = (data: CreateUserBoardData) => {
  return apiClient.post('/board/create_board', data);
};

export const deleteUserBoardApi = (data: DeleteUserBoardData) => {
  return apiClient.post('/board/delete_board', data);
};

export const renameUserBoardApi = (data: RenameUserBoardData) => {
  return apiClient.post('/board/rename_board', data);
};