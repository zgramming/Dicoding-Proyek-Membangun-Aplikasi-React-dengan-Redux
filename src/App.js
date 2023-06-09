import { Route, Routes } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Container from './components/Container';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ThreadDetailPage from './pages/ThreadDetailPage';
import HomePage from './pages/HomePage';
import { initUser } from './rtk/feature/auth/authSlice';

function App() {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authState.user) {
      dispatch(initUser());
    }
  }, [authState.user, dispatch]);

  return (
    <>
      <Header />
      <Container>
        <Routes>
          {authState.user && (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/thread/:id" element={<ThreadDetailPage />} />
            </>
          )}
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
