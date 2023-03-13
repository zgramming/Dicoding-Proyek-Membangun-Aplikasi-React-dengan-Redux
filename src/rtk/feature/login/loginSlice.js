import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { baseAPIURL, keyTokenLocalStorage, keyUserLocalStorage } from '../../../utils/constant';

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

const myProfile = async (token) => {
  const { data: dataRequest } = await axios.get(`${baseAPIURL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { data: dataResponse } = dataRequest;
  const { user } = dataResponse;
  return user;
};

export const asyncLogin = createAsyncThunk('auth/login', async (payload, thunkApi) => {
  try {
    thunkApi.dispatch(showLoading());
    const { email, password } = payload;
    const { data: dataRequest } = await axios.post(`${baseAPIURL}/login`, { email, password });
    const { data: dataResponse } = dataRequest;
    const { token } = dataResponse;
    const user = await myProfile(token);

    localStorage.setItem(keyUserLocalStorage, JSON.stringify(user));
    localStorage.setItem(keyTokenLocalStorage, token);

    return {
      user,
      token,
      error: false,
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
  } finally {
    thunkApi.dispatch(hideLoading());
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
        state.data = action.payload.token;
      })
      .addCase(asyncLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export default loginSlice.reducer;
