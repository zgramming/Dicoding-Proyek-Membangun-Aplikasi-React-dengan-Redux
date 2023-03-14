import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api';

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    onLoadingRegister: (state) => {
      state.isLoading = true;
      state.error = null;
      state.data = null;
    },
    onSuccessRegister: (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    },
    onErrorRegister: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  },
});

export const { onSuccessRegister, onLoadingRegister, onErrorRegister } = registerSlice.actions;

export const asyncRegister = createAsyncThunk('auth/register', async (payload, { dispatch }) => {
  try {
    dispatch(showLoading());
    dispatch(onLoadingRegister());
    const { name = '', email = '', password = '' } = payload;
    const result = await api.register({ name, email, password });
    dispatch(
      onSuccessRegister({
        data: result.data,
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

    dispatch(onErrorRegister({ message }));

    return {
      message,
      error: true,
    };
  } finally {
    dispatch(hideLoading());
  }
});

export default registerSlice.reducer;
