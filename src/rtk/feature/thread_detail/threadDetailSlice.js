import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseAPIURL, keyTokenLocalStorage } from '../../../utils/constant';
import { asyncDownVoteThread, asyncNeutralVote, asyncUpVoteThread } from '../thread/threadSlice';

const initialState = {
  isLoading: true,
  data: null,
  error: null,
  onCreateComment: {
    isLoading: false,
    data: null,
    error: null,
  },
  onUpVoteComment: {
    isLoading: false,
    data: null,
    error: null,
  },
  onDownVoteComment: {
    isLoading: false,
    data: null,
    error: null,
  },
  onNeutralVoteComment: {
    isLoading: false,
    data: null,
    error: null,
  },
};

const fetchDetailThread = async (threadId) => {
  const { data: dataRequest } = await axios.get(`${baseAPIURL}/threads/${threadId}`);
  const { data: dataResponse } = dataRequest;
  const { detailThread } = dataResponse;
  return detailThread;
};

export const asyncFetchDetailThread = createAsyncThunk('threadDetail/fetch', async (threadId) => {
  try {
    const detailThread = await fetchDetailThread(threadId);
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

export const asyncCreateComment = createAsyncThunk('comment/create', async (payload) => {
  try {
    const { threadId, content } = payload;
    const { data: dataRequest } = await axios.post(
      `${baseAPIURL}/threads/${threadId}/comments`,
      {
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(keyTokenLocalStorage)}`,
        },
      },
    );

    const { data: dataResponse } = dataRequest;
    const { comment } = dataResponse;

    return {
      data: comment,
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

export const asyncUpVoteComment = createAsyncThunk('comment/upVote', async (payload) => {
  try {
    const { commentId, threadId } = payload;
    const { data: dataRequest } = await axios.post(
      `${baseAPIURL}/threads/${threadId}/comments/${commentId}/up-vote`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(keyTokenLocalStorage)}`,
        },
      },
    );

    const { data: dataResponse } = dataRequest;
    const { vote } = dataResponse;
    const detailThread = await fetchDetailThread(threadId);

    return {
      detailThread,
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

export const asyncDownVoteComment = createAsyncThunk('comment/downVote', async (payload) => {
  try {
    const { commentId, threadId } = payload;

    const { data: dataRequest } = await axios.post(
      `${baseAPIURL}/threads/${threadId}/comments/${commentId}/down-vote`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(keyTokenLocalStorage)}`,
        },
      },
    );

    const { data: dataResponse } = dataRequest;
    const { vote } = dataResponse;
    const detailThread = await fetchDetailThread(threadId);

    return {
      detailThread,
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

export const asyncNeutralVoteComment = createAsyncThunk('comment/neutralVote', async (payload) => {
  try {
    const { commentId, threadId } = payload;
    const { data: dataRequest } = await axios.post(
      `${baseAPIURL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(keyTokenLocalStorage)}`,
        },
      },
    );

    const { data: dataResponse } = dataRequest;
    const { vote } = dataResponse;
    const detailThread = await fetchDetailThread(threadId);
    return {
      detailThread,
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

export const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.data = {
        ...state.data,
        comments: [...state.data.comments, action.payload],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncFetchDetailThread.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.error = null;
      })
      .addCase(asyncFetchDetailThread.fulfilled, (state, action) => {
        const { data, error } = action.payload;
        state.isLoading = false;
        state.data = data;
        state.error = error;
      })
      .addCase(asyncFetchDetailThread.rejected, (state, action) => {
        const { message, error } = action;
        state.isLoading = false;
        state.error = error;
        state.message = message;
      });

    // Create comment

    builder
      .addCase(asyncCreateComment.pending, (state) => {
        state.onCreateComment.isLoading = true;
        state.onCreateComment.data = null;
        state.onCreateComment.error = null;
      })
      .addCase(asyncCreateComment.fulfilled, (state, action) => {
        const { data, error } = action.payload;
        state.onCreateComment.isLoading = false;
        state.onCreateComment.data = data;
        state.onCreateComment.error = error;

        // Add comment to thread detail
        state.data = {
          ...state.data,
          comments: [...state.data.comments, data],
        };
      })
      .addCase(asyncCreateComment.rejected, (state, action) => {
        const { message, error } = action;
        state.onCreateComment.isLoading = false;
        state.onCreateComment.error = error;
        state.onCreateComment.message = message;
      });

    // Upvote thread
    builder.addCase(asyncUpVoteThread.fulfilled, (state, action) => {
      const { threads } = action.payload;

      // Update thread detail
      const thread = threads.find((val) => val.id === state.data.id);
      state.data = {
        ...state.data,
        ...thread,
      };
    });

    // Downvote thread
    builder.addCase(asyncDownVoteThread.fulfilled, (state, action) => {
      const { threads } = action.payload;

      // Update thread detail
      const thread = threads.find((val) => val.id === state.data.id);
      state.data = {
        ...state.data,
        ...thread,
      };
    });

    // Neutral vote thread
    builder.addCase(asyncNeutralVote.fulfilled, (state, action) => {
      const { threads } = action.payload;

      // Update thread detail
      const thread = threads.find((val) => val.id === state.data.id);
      state.data = {
        ...state.data,
        ...thread,
      };
    });

    // Upvote comment
    builder
      .addCase(asyncUpVoteComment.pending, (state) => {
        state.onUpVoteComment.isLoading = true;
        state.onUpVoteComment.data = null;
        state.onUpVoteComment.error = null;
      })
      .addCase(asyncUpVoteComment.fulfilled, (state, action) => {
        const { data, error, detailThread } = action.payload;
        state.onUpVoteComment.isLoading = false;
        state.onUpVoteComment.data = data;
        state.onUpVoteComment.error = error;

        state.data = {
          ...state.data,
          ...detailThread,
        };
      })
      .addCase(asyncUpVoteComment.rejected, (state, action) => {
        const { message, error } = action;
        state.onUpVoteComment.isLoading = false;
        state.onUpVoteComment.error = error;
        state.onUpVoteComment.message = message;
      });

    // Downvote comment
    builder
      .addCase(asyncDownVoteComment.pending, (state) => {
        state.onDownVoteComment.isLoading = true;
        state.onDownVoteComment.data = null;
        state.onDownVoteComment.error = null;
      })
      .addCase(asyncDownVoteComment.fulfilled, (state, action) => {
        const { data, error, detailThread } = action.payload;
        state.onDownVoteComment.isLoading = false;
        state.onDownVoteComment.data = data;
        state.onDownVoteComment.error = error;

        state.data = {
          ...state.data,
          ...detailThread,
        };
      })
      .addCase(asyncDownVoteComment.rejected, (state, action) => {
        const { message, error } = action;
        state.onDownVoteComment.isLoading = false;
        state.onDownVoteComment.error = error;
        state.onDownVoteComment.message = message;
      });

    // Neutral vote comment
    builder
      .addCase(asyncNeutralVoteComment.pending, (state) => {
        state.onNeutralVoteComment.isLoading = true;
        state.onNeutralVoteComment.data = null;
        state.onNeutralVoteComment.error = null;
      })
      .addCase(asyncNeutralVoteComment.fulfilled, (state, action) => {
        const { data, error, detailThread } = action.payload;
        state.onNeutralVoteComment.isLoading = false;
        state.onNeutralVoteComment.data = data;
        state.onNeutralVoteComment.error = error;

        state.data = {
          ...state.data,
          ...detailThread,
        };
      })
      .addCase(asyncNeutralVoteComment.rejected, (state, action) => {
        const { message, error } = action;
        state.onNeutralVoteComment.isLoading = false;
        state.onNeutralVoteComment.error = error;
        state.onNeutralVoteComment.message = message;
      });
  },
});

export const { addComment } = threadDetailSlice.actions;

export default threadDetailSlice.reducer;
