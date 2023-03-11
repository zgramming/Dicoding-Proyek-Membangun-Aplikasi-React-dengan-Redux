import { Card } from '@mantine/core';
import ThreadInput from '../components/ThreadInput';
import ThreadItem from '../components/ThreadItem';

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

export default HomePage;
