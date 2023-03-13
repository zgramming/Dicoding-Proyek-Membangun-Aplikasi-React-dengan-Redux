import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { baseAPIURL } from '../../../utils/constant';

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const asyncRegister = createAsyncThunk('auth/register', async (payload, thunkApi) => {
  try {
    thunkApi.dispatch(showLoading());
    const { name, email, password } = payload;
    const { data: dataRequest } = await axios.post(`${baseAPIURL}/register`, {
      name,
      email,
      password,
    });
    const { data: dataResponse } = dataRequest;
    const { user } = dataResponse;
    return {
      data: user,
      error: false,
    };
  } catch (error) {
    let message = error?.message || 'Unknown Error';
    if (axios.isAxiosError(error)) {
      message = error?.response?.data?.message || 'Unknown Error';
    }

    return {
      message,
      error: true,
    };
  } finally {
    thunkApi.dispatch(hideLoading());
  }
});

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(asyncRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(asyncRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.data;
      })
      .addCase(asyncRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.message;
      });
  },
});

export default registerSlice.reducer;

// Path: src\rtk\feature\register\Register.js
