import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api';

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    onLoadingLeaderboard: (state) => {
      state.isLoading = true;
      state.error = null;
      state.data = null;
    },
    onSuccessLeaderboard: (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    },
    onErrorLeaderboard: (state, action) => {
      state.isLoading = false;
      state.error = action.message;
    },
  },
});

export const { onLoadingLeaderboard, onSuccessLeaderboard, onErrorLeaderboard } = leaderboardSlice.actions;

// eslint-disable-next-line no-unused-vars
export const asyncFetchLeaderboard = createAsyncThunk('leaderboard/fetch', async (_, thunkApi) => {
  try {
    thunkApi.dispatch(showLoading());
    thunkApi.dispatch(onLoadingLeaderboard());
    const result = await api.fetchLeaderboard();
    thunkApi.dispatch(onSuccessLeaderboard({ data: result.data }));
    return {
      ...result,
      error: false,
    };
  } catch (error) {
    let message = error?.message || 'Unknown Error';
    if (axios.isAxiosError(error)) {
      message = error?.response?.data?.message || 'Unknown Error';
    }

    thunkApi.dispatch(onErrorLeaderboard({ message }));
    return {
      message,
      error: true,
    };
  } finally {
    thunkApi.dispatch(hideLoading());
  }
});

export default leaderboardSlice.reducer;
