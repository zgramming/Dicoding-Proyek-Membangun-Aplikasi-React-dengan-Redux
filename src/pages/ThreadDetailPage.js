import { Card } from '@mantine/core';
import ThreadInputComment from '../components/ThreadInputComments';
import ThreadItem from '../components/ThreadItem';
import ThreadComments from '../components/ThreadComments';

function ThreadDetailPage() {
  return (
    <Card className="flex flex-col my-5">
      <ThreadItem />
      <ThreadInputComment />
      <ThreadComments comments={[1, 2, 3, 4, 5, 6, 7]} />
    </Card>
  );
}

export default ThreadDetailPage;
