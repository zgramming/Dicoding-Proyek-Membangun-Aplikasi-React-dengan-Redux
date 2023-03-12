import { createSlice } from '@reduxjs/toolkit';
import { keyTokenLocalStorage, keyUserLocalStorage } from '../../../utils/constant';
import { asyncLogin } from '../login/loginSlice';

const initialState = {
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initUser: (state) => {
      const token = localStorage.getItem(keyTokenLocalStorage);
      const user = localStorage.getItem(keyUserLocalStorage);

      if (token && user) {
        state.token = token;
        state.user = JSON.parse(user);
      }
    },
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.data;
    },
    unsetUser: (state) => {
      localStorage.removeItem(keyTokenLocalStorage);
      localStorage.removeItem(keyUserLocalStorage);

      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncLogin.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
  },
});

export const { initUser, setUser, unsetUser } = authSlice.actions;

export default authSlice.reducer;
