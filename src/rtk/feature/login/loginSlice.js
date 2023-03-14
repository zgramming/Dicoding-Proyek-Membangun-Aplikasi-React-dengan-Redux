import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api';

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    onLoadingLogin: (state) => {
      state.isLoading = true;
      state.error = null;
      state.data = null;
    },
    onSuccessLogin: (state, action) => {
      state.isLoading = false;
      state.data = action.payload.token;
    },
    onErrorLogin: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  },
});

export const { onSuccessLogin, onLoadingLogin, onErrorLogin } = loginSlice.actions;

export const asyncLogin = createAsyncThunk('auth/login', async (payload, { dispatch }) => {
  try {
    dispatch(showLoading());
    dispatch(onLoadingLogin());
    const { email, password } = payload;
    const result = await api.login({ email, password });
    dispatch(
      onSuccessLogin({
        token: result.token,
      }),
    );
    return {
      ...result,
      error: false,
    };
  } catch (error) {
    let message = error?.message || 'Unknown Error';
    if (axios.isAxiosError(error)) {
      message = error?.response?.data?.message || 'Unknown Error';
    }

    dispatch(onErrorLogin({ message }));

    return {
      payload: {
        message,
        error: true,
      },
    };
  } finally {
    dispatch(hideLoading());
  }
});

export default loginSlice.reducer;
