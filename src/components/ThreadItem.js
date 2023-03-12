import { Avatar, Badge, Card } from '@mantine/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ThumbUpIconAction from './ThumbUpAction';
import ThumbDownIconAction from './ThumbDownAction';
import MessageIconAction from './MessageAction';
import {
  asyncDownVoteThread,
  asyncNeutralVote,
  asyncUpVoteThread,
} from '../rtk/feature/thread/threadSlice';

function ThreadItem({ thread, cardWithBorder = false }) {
  const {
    id,
    title,
    body,
    category,
    createdAt,
    ownerId,
    upVotesBy,
    downVotesBy,
    comments,
  } = thread;
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const totalComment = thread?.totalComments ?? comments?.length ?? 0;

  const owner = thread?.owner;
  const date = new Date(createdAt);
  const dateFormat = date.toLocaleDateString('id-ID', { dateStyle: 'full' });
  const timeFormat = date.toLocaleTimeString();

  const isAlreadyUpVote = upVotesBy?.some((userId) => userId === user?.id);
  const isAlreadyDownVote = downVotesBy?.some((userId) => userId === user?.id);

  const onUpVote = () => {
    if (isAlreadyUpVote) {
      dispatch(asyncNeutralVote(id));
    } else {
      dispatch(asyncUpVoteThread(id));
    }
  };

  const onDownVote = () => {
    if (isAlreadyDownVote) {
      dispatch(asyncNeutralVote(id));
    } else {
      dispatch(asyncDownVoteThread(id));
    }
  };

  return (
    <Card withBorder={cardWithBorder}>
      <div className="flex flex-row items-start gap-2">
        {owner && <Avatar src={owner?.avatar} alt="it's me" />}
        <div className="flex flex-col">
          {owner && (
            <div className="text-sm text-gray-600 font-semibold">
              {owner?.name}
            </div>
          )}
          {ownerId && cardWithBorder && (
            <div className="text-sm text-gray-600 font-semibold pb-3">
              {ownerId}
            </div>
          )}
          <Link to={`/thread/${id}`} className="text-black no-underline">
            <div className="text-base font-bold">{title}</div>
          </Link>
          <div className="text-xs text-gray-400 pb-3">{`${dateFormat} ${timeFormat}`}</div>
          <div
            className={`text-gray-600 text-sm pb-3 ${
              cardWithBorder && 'line-clamp-4'
            }`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: body,
            }}
          />
          <div className="pb-3">
            <Badge className="self-start" size="sm">
              {`#${category}`}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <ThumbUpIconAction
              number={upVotesBy?.length ?? 0}
              isActive={isAlreadyUpVote}
              onClick={() => onUpVote()}
            />
            <ThumbDownIconAction
              number={downVotesBy?.length ?? 0}
              isActive={isAlreadyDownVote}
              onClick={() => onDownVote()}
            />
            <MessageIconAction number={totalComment} />
          </div>
        </div>
      </div>
    </Card>
  );
}

ThreadItem.defaultProps = {
  cardWithBorder: false,
};

ThreadItem.propTypes = {
  thread: PropTypes.oneOfType([PropTypes.object]).isRequired,
  cardWithBorder: PropTypes.bool,
};

export default ThreadItem;
