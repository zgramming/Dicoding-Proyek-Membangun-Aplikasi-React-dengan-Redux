import { Card } from '@mantine/core';
import { Route, Routes } from 'react-router-dom';

import Container from './components/Container';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ThreadDetailPage from './pages/ThreadDetailPage';
import ThreadInput from './components/ThreadInput';
import ThreadItem from './components/ThreadItem';

function HomePage() {
  const threads = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <Card className="flex flex-col gap-5 my-5">
      <ThreadInput />
      <div className="grid grid-cols-1 gap-3">
        {threads.map((thread) => (
          <ThreadItem key={thread} thread={thread} cardWithBorder />
        ))}
      </div>
    </Card>
  );
}

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
