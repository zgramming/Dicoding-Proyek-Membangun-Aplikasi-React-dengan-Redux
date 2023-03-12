import { configureStore } from '@reduxjs/toolkit';
import LoginReducer from './feature/login/loginSlice';
import RegisterReducer from './feature/register/registerSlice';
import AuthReducer from './feature/auth/authSlice';
import LeaderboardReducer from './feature/leaderboard/leaderboardSlice';

export default configureStore({
  reducer: {
    leaderboard: LeaderboardReducer,
    auth: AuthReducer,
    login: LoginReducer,
    register: RegisterReducer,
  },
});
