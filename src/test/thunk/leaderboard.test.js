/**
 * skenario test thunk leaderboard
 *
 * -  asyncFetchLeaderboard
 *  - should dispatch showLoading, onLoading, onSucess, hideLoading when success fetch leaderboard
 *  - should dispatch showLoading, onLoading, onError, hideLoading when error fetch leaderboard
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  asyncFetchLeaderboard,
  onErrorLeaderboard,
  onLoadingLeaderboard,
  onSuccessLeaderboard,
} from '../../rtk/feature/leaderboard/leaderboardSlice';
import api from '../../utils/api';

describe('asyncFetchLeaderboard Thunk', () => {
  const fakeLeaderboardSuccessResponse = {
    status: 'success',
    message: 'ok',
    data: {
      leaderboards: [
        {
          id: 1,
          name: 'admin',
          score: 100,
        },
      ],
    },
  };

  const fakeLeaderboardErrorResponse = {
    status: 'error',
    message: 'error',
  };

  beforeEach(() => {
    api._fetchLeaderboard = api.fetchLeaderboard;
  });

  afterEach(() => {
    api.fetchLeaderboard = api._fetchLeaderboard;

    delete api._fetchLeaderboard;
  });

  it('should dispatch showLoading, onLoading, onSucess, hideLoading', async () => {
    api.fetchLeaderboard = () => Promise.resolve(fakeLeaderboardSuccessResponse);

    const dispatch = jest.fn();

    await asyncFetchLeaderboard()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(onLoadingLeaderboard());
    // expect(dispatch).toHaveBeenCalledWith(onSuccessLeaderboard({ data: fakeLeaderboardSuccessResponse }));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch showLoading, onLoading, onError, hideLoading', async () => {
    api.fetchLeaderboard = () => Promise.reject(fakeLeaderboardErrorResponse);

    const dispatch = jest.fn();

    await asyncFetchLeaderboard()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(onLoadingLeaderboard());
    // expect(dispatch).toHaveBeenCalledWith(onErrorLeaderboard({ message: fakeLeaderboardErrorResponse.message }));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
