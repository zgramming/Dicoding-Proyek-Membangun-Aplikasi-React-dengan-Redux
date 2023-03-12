import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseAPIURL } from '../../../utils/constant';

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const asyncFetchThread = createAsyncThunk('thread/fetch', async () => {
  try {
    const { data: dataRequest } = await axios.get(`${baseAPIURL}/threads`);
    const { data: dataResponse } = dataRequest;
    const { threads } = dataResponse;
    return {
      data: threads,
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

export const threadSlice = createSlice({
  name: 'thread',
  initialState,
  reducers: {
    add: (state, action) => {
      state.data = [...state, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncFetchThread.pending, (state) => {
        console.log('asyncFetchThread.pending', { state });
        state.isLoading = true;
        state.data = null;
        state.error = null;
      })
      .addCase(asyncFetchThread.fulfilled, (state, action) => {
        console.log('asyncFetchThread.fulfilled', { state, action });
        const { data, error } = action.payload;
        state.isLoading = false;
        state.data = data;
        state.error = error;
      })
      .addCase(asyncFetchThread.rejected, (state, action) => {
        console.log('asyncFetchThread.rejected', { state, action });
        const { message, error } = action;
        state.isLoading = false;
        state.error = error;
        state.message = message;
      });
  },
});

export const { add } = threadSlice.actions;

export default threadSlice.reducer;
