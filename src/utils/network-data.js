import { keyTokenLocalStorage } from './constant';

function getAccessToken() {
  return localStorage.getItem(keyTokenLocalStorage);
}

function putAccessToken(accessToken) {
  return localStorage.setItem(keyTokenLocalStorage, accessToken);
}

export { getAccessToken, putAccessToken };
