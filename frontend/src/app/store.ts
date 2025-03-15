import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';

import authReducer from '../features/auth/model/authSlice.ts';
import {createBoardSlice} from "../features/boardManagement/model/createBoardSlice.ts";
import {getUserBoardsSlice} from "../features/boardManagement/model/getUserBoardsSlice.ts";
import {getOneBoardSlice} from "../features/boardManagement/model/getOneBoardSlice.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    createBoard: createBoardSlice.reducer,
    getUserBoards: getUserBoardsSlice.reducer,
    getOneBoard: getOneBoardSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
