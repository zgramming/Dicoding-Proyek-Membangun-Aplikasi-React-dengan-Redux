// import AuthReducer from '../../rtk/feature/auth/authSlice';
import AuthReducer, { setUser, initUser, unsetUser } from '../../rtk/feature/auth/authSlice';
import { keyTokenLocalStorage, keyUserLocalStorage } from '../../utils/constant';
/**
 * test scenarios for authState reducer
 *
 * - authRedcuer function
 *   - should return initial state
 *   - should return state with token and user
 *   - should set token and user when have token and user on local storage
 *   - should unset token and user when unset user
 */

describe('authReducer function', () => {
  const initialState = {
    token: null,
    user: null,
  };
  it('should return initial state', () => {
    expect(AuthReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should return state with token and user', () => {
    expect(
      AuthReducer(
        initialState,
        setUser({
          token: 'token',
          data: 'user',
        }),
      ),
    ).toEqual({
      token: 'token',
      user: 'user',
    });
  });

  it('should set token and user when have token and user on local storage', () => {
    localStorage.setItem(keyTokenLocalStorage, 'token');
    localStorage.setItem(keyUserLocalStorage, JSON.stringify({ name: 'user' }));
    expect(AuthReducer(initialState, initUser())).toEqual({
      token: localStorage.getItem(keyTokenLocalStorage),
      user: JSON.parse(localStorage.getItem(keyUserLocalStorage)),
    });
  });
  it('should unset token and user when unset user', () => {
    expect(AuthReducer(initialState, unsetUser())).toEqual({
      token: null,
      user: null,
    });
  });
});
