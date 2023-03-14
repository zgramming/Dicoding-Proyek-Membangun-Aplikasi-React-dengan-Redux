import { configureStore } from '@reduxjs/toolkit';
import { loadingBarMiddleware, loadingBarReducer } from 'react-redux-loading-bar';
import LoginReducer from './feature/login/loginSlice';
import RegisterReducer from './feature/register/registerSlice';
import AuthReducer from './feature/auth/authSlice';
import LeaderboardReducer from './feature/leaderboard/leaderboardSlice';
import ThreadReducer from './feature/thread/threadSlice';
import ThreadDetailReducer from './feature/thread_detail/threadDetailSlice';

export const myReducer = {
  threadDetail: ThreadDetailReducer,
  thread: ThreadReducer,
  leaderboard: LeaderboardReducer,
  auth: AuthReducer,
  login: LoginReducer,
  register: RegisterReducer,
  loadingBar: loadingBarReducer,
};

export default configureStore({
  reducer: myReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loadingBarMiddleware()),
});
