import { configureStore } from '@reduxjs/toolkit';
import LoginReducer from './feature/login/loginSlice';
import RegisterReducer from './feature/register/registerSlice';

export default configureStore({
  reducer: {
    login: LoginReducer,
    register: RegisterReducer,
  },
});
