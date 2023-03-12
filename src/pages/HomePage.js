import { Card } from '@mantine/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThreadInput from '../components/ThreadInput';
import ThreadItem from '../components/ThreadItem';
import SkeletonThreads from '../components/skeleton/SkeletonThreads';
import { asyncFetchThread } from '../rtk/feature/thread/threadSlice';

function HomePage() {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state) => state.thread);

  useEffect(() => {
    dispatch(asyncFetchThread());
  }, [dispatch]);

  if (isLoading) {
    return <SkeletonThreads />;
  }

  return (
    <Card className="flex flex-col gap-5 my-5">
      <ThreadInput />
      {data?.length === 0 && <p className="text-center">No threads yet</p>}
      <div className="grid grid-cols-1 gap-3">
        {data?.map((thread) => (
          <ThreadItem key={thread.id} thread={thread} cardWithBorder />
        ))}
      </div>
    </Card>
  );
}

export default HomePage;
