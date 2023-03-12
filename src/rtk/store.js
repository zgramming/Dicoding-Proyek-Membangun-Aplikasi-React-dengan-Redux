import { configureStore } from '@reduxjs/toolkit';
import LoginReducer from './feature/login/loginSlice';
import RegisterReducer from './feature/register/registerSlice';
import AuthReducer from './feature/auth/authSlice';
import LeaderboardReducer from './feature/leaderboard/leaderboardSlice';
import ThreadReducer from './feature/thread/threadSlice';
import ThreadDetailReducer from './feature/thread_detail/threadDetailSlice';

export default configureStore({
  reducer: {
    threadDetail: ThreadDetailReducer,
    thread: ThreadReducer,
    leaderboard: LeaderboardReducer,
    auth: AuthReducer,
    login: LoginReducer,
    register: RegisterReducer,
  },
});
