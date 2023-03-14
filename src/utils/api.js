import axios from 'axios';
import { baseAPIURL, keyTokenLocalStorage, keyUserLocalStorage } from './constant';

const api = (() => {
  const myProfile = async (token) => {
    const { data: dataRequest } = await axios.get(`${baseAPIURL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data: dataResponse } = dataRequest;
    const { user } = dataResponse;
    return user;
  };

  async function fetchLeaderboard() {
    const { data: dataRequest } = await axios.get(`${baseAPIURL}/leaderboards`);
    const { data: dataResponse } = dataRequest;
    const { leaderboards } = dataResponse;
    return {
      data: leaderboards,
    };
  }

  async function login({ email, password }) {
    const { data: dataRequest } = await axios.post(`${baseAPIURL}/login`, { email, password });
    const { data: dataResponse } = dataRequest;
    const { token } = dataResponse;
    const user = await myProfile(token);

    localStorage.setItem(keyUserLocalStorage, JSON.stringify(user));
    localStorage.setItem(keyTokenLocalStorage, token);

    return {
      user,
      token,
    };
  }

  async function register({ name, email, password }) {
    const { data: dataRequest } = await axios.post(`${baseAPIURL}/register`, {
      name,
      email,
      password,
    });
    const { data: dataResponse } = dataRequest;
    const { user } = dataResponse;
    return {
      data: user,
    };
  }

  async function createComment({ threadId, content }) {
    const { data: dataRequest } = await axios.post(
      `${baseAPIURL}/threads/${threadId}/comments`,
      {
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(keyTokenLocalStorage)}`,
        },
      },
    );

    const { data: dataResponse } = dataRequest;
    const { comment } = dataResponse;

    return {
      data: comment,
    };
  }

  return {
    fetchLeaderboard,
    login,
    myProfile,
    register,
    createComment,
  };
})();

export default api;
