import { Avatar, Badge, Card, Image } from '@mantine/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { asyncFetchLeaderboard } from '../rtk/feature/leaderboard/leaderboardSlice';
import SkeletonLeaderboard from '../components/skeleton/SkeletonLeaderboard';

function LeaderboardItem({ leaderboard, index }) {
  const { user, score } = leaderboard;
  return (
    <div key={user.id} className="flex flex-row items-center gap-5">
      <Avatar color="cyan" radius="xl">
        {index + 1}
      </Avatar>
      <div className="flex flex-row items-center gap-5 grow">
        <div className="relative h-12 w-12">
          <Image
            radius="md"
            src={`${user.avatar}`}
            alt="Random image"
            fit="fill"
            className="shadow-lg"
          />
        </div>
        <div className="flex flex-col grow">
          <div className="text-base font-bold">{user.name}</div>
          <div className="text-xs text-gray-500">{user.email}</div>
        </div>
        <Badge>{score}</Badge>
      </div>
    </div>
  );
}

LeaderboardItem.propTypes = {
  leaderboard: PropTypes.oneOfType([PropTypes.object]).isRequired,
  index: PropTypes.number.isRequired,
};

function LeaderboardPage() {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.leaderboard);

  useEffect(() => {
    dispatch(asyncFetchLeaderboard());
  }, [dispatch]);

  if (isLoading) return <SkeletonLeaderboard />;

  return (
    <Card className="flex flex-col gap-2 my-5">
      <h2 className="text-center">Klasemen Pengguna</h2>
      {data && (
        <div className="grid grid-cols-1 gap-5">
          {data.map((item, index) => (
            <LeaderboardItem key={item.user.id} leaderboard={item} index={index} />
          ))}
        </div>
      )}
    </Card>
  );
}

export default LeaderboardPage;
