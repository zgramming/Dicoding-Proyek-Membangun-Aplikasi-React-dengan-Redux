import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseAPIURL } from '../../../utils/constant';

const initialState = {
  isLoading: true,
  data: null,
  error: null,
};

export const asyncFetchDetailThread = createAsyncThunk('threadDetail/fetch', async (threadId) => {
  try {
    const { data: dataRequest } = await axios.get(`${baseAPIURL}/threads/${threadId}`);
    const { data: dataResponse } = dataRequest;
    const { detailThread } = dataResponse;
    return {
      data: detailThread,
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

export const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.data = [...state, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncFetchDetailThread.pending, (state) => {
        console.log('asyncFetchDetailThread.pending', { state });
        state.isLoading = true;
        state.data = null;
        state.error = null;
      })
      .addCase(asyncFetchDetailThread.fulfilled, (state, action) => {
        console.log('asyncFetchDetailThread.fulfilled', { state, action });
        const { data, error } = action.payload;
        state.isLoading = false;
        state.data = data;
        state.error = error;
      })
      .addCase(asyncFetchDetailThread.rejected, (state, action) => {
        console.log('asyncFetchDetailThread.rejected', { state, action });
        const { message, error } = action;
        state.isLoading = false;
        state.error = error;
        state.message = message;
      });
  },
});

export const { addComment } = threadDetailSlice.actions;

export default threadDetailSlice.reducer;
