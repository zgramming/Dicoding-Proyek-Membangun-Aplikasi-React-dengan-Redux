import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseAPIURL, keyTokenLocalStorage } from '../../../utils/constant';

const initialState = {
  isLoading: true,
  data: [],
  filteredThreads: [],
  error: null,
  onUpVote: {
    isLoading: false,
    data: null,
    error: null,
  },
  onDownVote: {
    isLoading: false,
    data: null,
    error: null,
  },
  onNeutralVote: {
    isLoading: false,
    data: null,
    error: null,
  },
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

export const asyncUpVoteThread = createAsyncThunk('thread/upvote', async (threadId) => {
  try {
    const { data: dataRequest } = await axios.post(
      `${baseAPIURL}/threads/${threadId}/up-vote`,
      null,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(keyTokenLocalStorage)}`,
        },
      },
    );
    const { data: dataResponse } = dataRequest;
    const { vote } = dataResponse;
    const threads = await fetchThreads();
    return {
      threads,
      data: vote,
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

export const asyncDownVoteThread = createAsyncThunk('thread/downvote', async (threadId) => {
  try {
    const { data: dataRequest } = await axios.post(
      `${baseAPIURL}/threads/${threadId}/down-vote`,
      null,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(keyTokenLocalStorage)}`,
        },
      },
    );
    const { data: dataResponse } = dataRequest;
    const { vote } = dataResponse;
    return {
      data: vote,
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

export const asyncNeutralVote = createAsyncThunk('thread/neutralvote', async (threadId) => {
  try {
    const { data: dataRequest } = await axios.post(
      `${baseAPIURL}/threads/${threadId}/neutral-vote`,
      null,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(keyTokenLocalStorage)}`,
        },
      },
    );
    const { data: dataResponse } = dataRequest;
    const { vote } = dataResponse;
    return {
      data: vote,
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
    filterByCategory: (state, action) => {
      const selectedCategory = action.payload ?? '';
      const items = [...(state.data ?? [])];
      if (selectedCategory) {
        state.filteredThreads = items.filter((thread) => thread.category === selectedCategory);
      } else {
        state.filteredThreads = [];
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch thread
    builder
      .addCase(asyncFetchThread.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.error = null;
      })
      .addCase(asyncFetchThread.fulfilled, (state, action) => {
        const { data, error } = action.payload;
        state.isLoading = false;
        state.data = data;
        state.error = error;
      })
      .addCase(asyncFetchThread.rejected, (state, action) => {
        const { message, error } = action;
        state.isLoading = false;
        state.error = error;
        state.message = message;
      });

    // Create thread
    builder
      .addCase(asyncCreateThread.pending, (state) => {
        state.onCreate.isLoading = true;
        state.onCreate.data = null;
        state.onCreate.error = null;
      })
      .addCase(asyncCreateThread.fulfilled, (state, action) => {
        const { data, error, threads } = action.payload;
        state.onCreate.isLoading = false;
        state.onCreate.data = data;
        state.onCreate.error = error;

        // Adding new thread to the list
        state.data = [...threads];
      })
      .addCase(asyncCreateThread.rejected, (state, action) => {
        const { message, error } = action;
        state.onCreate.isLoading = false;
        state.onCreate.error = error;
        state.onCreate.message = message;
      });

    // Upvote thread
    builder
      .addCase(asyncUpVoteThread.pending, (state) => {
        state.onUpVote.isLoading = true;
        state.onUpVote.data = null;
        state.onUpVote.error = null;
      })
      .addCase(asyncUpVoteThread.fulfilled, (state, action) => {
        const { data, error, threads } = action.payload;
        state.onUpVote.isLoading = false;
        state.onUpVote.data = data;
        state.onUpVote.error = error;

        // Adding new thread to the list
        state.data = [...threads];
      })
      .addCase(asyncUpVoteThread.rejected, (state, action) => {
        const { message, error } = action;
        state.onUpVote.isLoading = false;
        state.onUpVote.error = error;
        state.onUpVote.message = message;
      });

    // Downvote thread
    builder
      .addCase(asyncDownVoteThread.pending, (state) => {
        state.onDownVote.isLoading = true;
        state.onDownVote.data = null;
        state.onDownVote.error = null;
      })
      .addCase(asyncDownVoteThread.fulfilled, (state, action) => {
        const { data, error, threads } = action.payload;
        state.onDownVote.isLoading = false;
        state.onDownVote.data = data;
        state.onDownVote.error = error;

        // Adding new thread to the list
        state.data = [...threads];
      })
      .addCase(asyncDownVoteThread.rejected, (state, action) => {
        const { message, error } = action;
        state.onDownVote.isLoading = false;
        state.onDownVote.error = error;
        state.onDownVote.message = message;
      });

    // Neutral vote thread
    builder
      .addCase(asyncNeutralVote.pending, (state) => {
        state.onNeutralVote.isLoading = true;
        state.onNeutralVote.data = null;
        state.onNeutralVote.error = null;
      })
      .addCase(asyncNeutralVote.fulfilled, (state, action) => {
        const { data, error, threads } = action.payload;
        state.onNeutralVote.isLoading = false;
        state.onNeutralVote.data = data;
        state.onNeutralVote.error = error;

        // Adding new thread to the list
        state.data = [...threads];
      })
      .addCase(asyncNeutralVote.rejected, (state, action) => {
        const { message, error } = action;
        state.onNeutralVote.isLoading = false;
        state.onNeutralVote.error = error;
        state.onNeutralVote.message = message;
      });
  },
});

export const { add, filterByCategory } = threadSlice.actions;

export default threadSlice.reducer;
