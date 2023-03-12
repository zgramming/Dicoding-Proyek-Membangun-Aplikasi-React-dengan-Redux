import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseAPIURL, keyTokenLocalStorage } from '../../../utils/constant';

const initialState = {
  isLoading: true,
  data: null,
  error: null,
  onCreate: {
    isLoading: false,
    data: null,
    error: null,
  },
};

const fetchThreads = async () => {
  const { data: dataRequest } = await axios.get(`${baseAPIURL}/threads`);
  const { data: dataResponse } = dataRequest;
  const { threads } = dataResponse;
  return threads;
};

export const asyncFetchThread = createAsyncThunk('thread/fetch', async () => {
  try {
    const threads = await fetchThreads();
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

export const asyncCreateThread = createAsyncThunk('thread/create', async (payload) => {
  try {
    const { title, body, category } = payload;
    const { data: dataRequest } = await axios.post(
      `${baseAPIURL}/threads`,
      {
        title,
        body,
        category,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(keyTokenLocalStorage)}`,
        },
      },
    );
    const { data: dataResponse } = dataRequest;
    const { thread } = dataResponse;

    return {
      data: thread,
      threads: await fetchThreads(),
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
    // Fetch thread
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

    // Create thread
    builder
      .addCase(asyncCreateThread.pending, (state) => {
        console.log('asyncCreateThread.pending', { state });
        state.onCreate.isLoading = true;
        state.onCreate.data = null;
        state.onCreate.error = null;
      })
      .addCase(asyncCreateThread.fulfilled, (state, action) => {
        console.log('asyncCreateThread.fulfilled', { state, action });
        const { data, error, threads } = action.payload;
        state.onCreate.isLoading = false;
        state.onCreate.data = data;
        state.onCreate.error = error;

        // Adding new thread to the list
        state.data = [...threads];
      })
      .addCase(asyncCreateThread.rejected, (state, action) => {
        console.log('asyncCreateThread.rejected', { state, action });
        const { message, error } = action;
        state.onCreate.isLoading = false;
        state.onCreate.error = error;
        state.onCreate.message = message;
      });
  },
});

export const { add } = threadSlice.actions;

export default threadSlice.reducer;
