import ThreadDetailReducer, { addComment } from '../../rtk/feature/thread_detail/threadDetailSlice';

/**
 * test scenarios for threadDetailState reducer
 *
 * - threadDetailRedcuer function
 *   - should return initial state
 *   - should return new comment when add comment
 */

describe('threadDetailReducer function', () => {
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

  it('should return initial state', () => {
    expect(ThreadDetailReducer(undefined, { type: undefined })).toEqual(initialState);
  });
  it('should return new comment when add comment', () => {
    expect(
      ThreadDetailReducer(
        {
          ...initialState,
          data: {
            comments: [
              {
                id: 1,
                content: 'comment 1',
              },
            ],
          },
        },
        addComment({
          id: 2,
          content: 'comment 2',
        }),
      ),
    ).toEqual({
      ...initialState,
      data: {
        comments: [
          {
            id: 1,
            content: 'comment 1',
          },
          {
            id: 2,
            content: 'comment 2',
          },
        ],
      },
    });
  });
});
