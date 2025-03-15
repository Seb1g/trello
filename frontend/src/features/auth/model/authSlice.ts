// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '../../../app/store';
// import {check, login, register} from './authThunks';
//
// export interface User {
//   id: number;
//   name: string;
//   email: string;
// }
//
// interface AuthState {
//   user: User | null;
//   token: string | null;
//   isLoggedIn: boolean;
//   loading: boolean;
//   error: string | null;
// }
//
// const initialState: AuthState = {
//   user: null,
//   token: null,
//   isLoggedIn: false,
//   loading: false,
//   error: null,
// };
//
//
// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout(state) {
//       state.user = null;
//       state.token = null;
//       state.error = null;
//       state.isLoggedIn = false;
//     },
//     clearError(state) {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(login.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(login.fulfilled, (state, action: PayloadAction<{ user: User; token: string; isLoggedIn: boolean; }>) => {
//       state.loading = false;
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.isLoggedIn = action.payload.isLoggedIn;
//     });
//     builder.addCase(login.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload || 'Ошибка входа';
//     });
//
//     builder.addCase(check.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(check.fulfilled, (state, action: PayloadAction<{ user: User; isLoggedIn: boolean }>) => {
//       state.loading = false;
//       state.user = action.payload.user;
//       state.isLoggedIn = action.payload.isLoggedIn;
//     });
//     builder.addCase(check.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload || 'Ошибка входа';
//     });
//
//     builder.addCase(register.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(register.fulfilled, (state, action: PayloadAction<{ user: User; token: string; isLoggedIn: boolean; }>) => {
//       state.loading = false;
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.isLoggedIn = action.payload.isLoggedIn;
//     });
//     builder.addCase(register.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload || 'Ошибка регистрации';
//     });
//   },
// });


import {createSlice} from "@reduxjs/toolkit";
import {IUser} from "../../../shared/api/createApi.ts";
import {checkAuth, login, logout, registration} from "./authThunks.ts";

const initialState = {
  user: {} as IUser,
  isAuth: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false;
        state.user = {} as IUser;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuth = false;
        state.user = {} as IUser;
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;