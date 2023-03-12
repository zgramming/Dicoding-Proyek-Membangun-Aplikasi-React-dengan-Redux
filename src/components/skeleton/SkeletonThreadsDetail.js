import { Card, Skeleton } from '@mantine/core';

function SkeletonThreadsDetail() {
  return (
    <Card className=" my-5">
      {[1].map((val) => (
        <div key={val}>
          <Skeleton height={50} circle mb="xl" />
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </div>
      ))}
    </Card>
  );
}

export default SkeletonThreadsDetail;
