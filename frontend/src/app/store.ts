import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/model/authSlice';
import boardReducer from '../widgets/Navbar/createBoardSlice.ts';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

// Создаём store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    board: boardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Можно включить, если возникают проблемы с несерийзуемыми объектами
    }),
});

// Типизация RootState (общий state всего приложения)
export type RootState = ReturnType<typeof store.getState>;

// Типизация AppDispatch (методы store.dispatch)
export type AppDispatch = typeof store.dispatch;

// Хуки с типизацией для удобства
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
