import { Route, Routes } from 'react-router-dom';

import Container from './components/Container';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ThreadDetailPage from './pages/ThreadDetailPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/thread/:id" element={<ThreadDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
