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