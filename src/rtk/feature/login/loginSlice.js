import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseAPIURL, keyTokenLocalStorage } from '../../../utils/constant';

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const asyncLogin = createAsyncThunk('auth/login', async (payload) => {
  try {
    const { email, password } = payload;
    const { data: dataRequest } = await axios.post(`${baseAPIURL}/login`, { email, password });
    const { data: dataResponse } = dataRequest;
    const { token } = dataResponse;
    localStorage.setItem(keyTokenLocalStorage, token);

    return {
      payload: {
        data: token,
        error: false,
      },
    };
  } catch (error) {
    let message = error?.message || 'Unknown Error';
    if (axios.isAxiosError(error)) {
      message = error?.response?.data?.message || 'Unknown Error';
    }

    return {
      payload: {
        message,
        error: true,
      },
    };
  }
});

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(asyncLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(asyncLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(asyncLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export default loginSlice.reducer;
