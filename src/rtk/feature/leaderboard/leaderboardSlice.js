import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseAPIURL } from '../../../utils/constant';

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const asyncFetchLeaderboard = createAsyncThunk('leaderboard/fetch', async () => {
  try {
    const { data: dataRequest } = await axios.get(`${baseAPIURL}/leaderboards`);
    const { data: dataResponse } = dataRequest;
    const { leaderboards } = dataResponse;
    return {
      data: leaderboards,
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
  }
});

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(asyncFetchLeaderboard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(asyncFetchLeaderboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(asyncFetchLeaderboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.message;
      });
  },
});

export default leaderboardSlice.reducer;
