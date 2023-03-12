import { Card } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ThreadItem from '../components/ThreadItem';
import ThreadInputComment from '../components/ThreadInputComments';
import ThreadComments from '../components/ThreadComments';
import { asyncFetchDetailThread } from '../rtk/feature/thread_detail/threadDetailSlice';
import SkeletonThreadsDetail from '../components/skeleton/SkeletonThreadsDetail';

function ThreadDetailPage() {
  const { id } = useParams();
  const { isLoading, data } = useSelector((state) => state.threadDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncFetchDetailThread(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <SkeletonThreadsDetail />;
  }

  return (
    <Card className="flex flex-col my-5">
      <ThreadItem thread={data} />
      <ThreadInputComment />
      <ThreadComments comments={data?.comments ?? []} />
    </Card>
  );
}

export default ThreadDetailPage;
