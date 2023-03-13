import ThreadReducer, { filterByCategory } from '../../rtk/feature/thread/threadSlice';

/**
 * test scenarios for threadState reducer
 *
 * - threadRedcuer function
 *   - should return initial state
 *   - should return filtered thread with category
 *   - should return empty array when filtered thread with category
 */

describe('threadReducer function', () => {
  const threads = [
    { title: 'thread 1', category: 'category 1' },
    { title: 'thread 2', category: 'category 2' },
    { title: 'thread 3', category: 'category 3' },
    { title: 'thread 4', category: 'category 4' },
    { title: 'thread 5', category: 'category 5' },
  ];

  const initialState = {
    isLoading: true,
    data: [],
    error: null,
    filteredThreads: [],
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

  it('should return initial state', () => {
    expect(ThreadReducer(undefined, { type: undefined })).toEqual(initialState);
  });
  it('should return filtered thread with category', () => {
    expect(
      ThreadReducer(
        {
          ...initialState,
          data: threads,
        },
        filterByCategory('category 1'),
      ),
    ).toEqual({
      ...initialState,
      data: threads,
      filteredThreads: [{ title: 'thread 1', category: 'category 1' }],
    });
  });
  it('should return empty array when filtered thread with category', () => {
    expect(
      ThreadReducer(
        {
          ...initialState,
          data: threads,
        },
        filterByCategory('category 10'),
      ),
    ).toEqual({
      ...initialState,
      data: threads,
      filteredThreads: [],
    });
  });
});
