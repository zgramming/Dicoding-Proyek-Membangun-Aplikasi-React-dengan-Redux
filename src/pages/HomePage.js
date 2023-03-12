import { Badge, Card } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchThread, filterByCategory } from '../rtk/feature/thread/threadSlice';
import ThreadInput from '../components/ThreadInput';
import ThreadItem from '../components/ThreadItem';
import SkeletonThreads from '../components/skeleton/SkeletonThreads';

function CategoryFilter() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.thread);
  const [selectedCategory, setSelectedCategory] = useState();
  const categories = [...new Set(data?.map((thread) => thread.category))];

  useEffect(() => {
    dispatch(filterByCategory(selectedCategory));
  }, [dispatch, selectedCategory]);

  return (
    <div className="flex flex-col gap-3">
      <div className="text-base">{`Kategori Populer Saat Ini ${categories?.length ?? 0}`}</div>
      <div className="flex flex-wrap gap-3">
        {categories?.map((category) => (
          <Badge
            key={category}
            className="cursor-pointer"
            color={selectedCategory === category ? 'blue' : 'gray'}
            onClick={() => {
              setSelectedCategory((prevState) => {
                if (prevState === category) {
                  return null;
                }

                return category;
              });
            }}
          >
            {`#${category}`}
          </Badge>
        ))}
      </div>
    </div>
  );
}
function HomePage() {
  const dispatch = useDispatch();
  const { isLoading, data, filteredThreads } = useSelector((state) => state.thread);
  const items = filteredThreads?.length > 0 ? filteredThreads : data;
  useEffect(() => {
    dispatch(asyncFetchThread());
  }, [dispatch]);

  if (isLoading) {
    return <SkeletonThreads />;
  }

  return (
    <Card className="flex flex-col gap-5 my-5">
      <ThreadInput />
      <CategoryFilter />
      {items?.length === 0 && <p className="text-center">No threads yet</p>}
      <div className="grid grid-cols-1 gap-3">
        {items?.map((thread) => (
          <ThreadItem key={thread.id} thread={thread} cardWithBorder />
        ))}
      </div>
    </Card>
  );
}

export default HomePage;
