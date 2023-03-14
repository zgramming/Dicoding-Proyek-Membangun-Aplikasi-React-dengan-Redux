/**
 * skenario test thunk register
 *
 * -  asyncRegister
 *    - should dispatch showLoading, onLoading, onSucess, hideLoading when success register
 *    - should dispatch showLoading, onLoading, onError, hideLoading when error register
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';

import api from '../../utils/api';

import {
  asyncRegister,
  onErrorRegister,
  onLoadingRegister,
  onSuccessRegister,
} from '../../rtk/feature/register/registerSlice';

describe('asyncRegister Thunk', () => {
  const fakeRegisterSuccessResponse = {
    data: {
      user: {
        id: '1',
        name: 'Zeffry Reynando',
        email: 'zeffry.reynando@gmail.com',
        avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
      },
    },
  };

  const fakeRegisterErrorResponse = {
    status: 'error',
    message: 'error',
  };

  beforeEach(() => {
    api._register = api.register;
  });

  afterEach(() => {
    api.register = api._register;
    delete api._register;
  });

  it('should dispatch showLoading, onLoading, onSucess, hideLoading when success register', async () => {
    api.register = () => Promise.resolve(fakeRegisterSuccessResponse);

    const dispatch = jest.fn();

    await asyncRegister({
      name: 'Zeffry Reynando',
      email: 'zeffry.reynando@gmail.com',
      password: 'zeffry',
    })(dispatch);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(onLoadingRegister());
    expect(dispatch).toHaveBeenCalledWith(onSuccessRegister(fakeRegisterSuccessResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch showLoading, onLoading, onError, hideLoading when error register', async () => {
    api.register = () => Promise.reject(fakeRegisterErrorResponse);

    const dispatch = jest.fn();

    await asyncRegister({
      name: 'Zeffry Reynando',
      email: 'zeffry.reynando@gmail.com',
      password: 'zeffry',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(onLoadingRegister());
    expect(dispatch).toHaveBeenCalledWith(onErrorRegister({ message: fakeRegisterErrorResponse.message }));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
