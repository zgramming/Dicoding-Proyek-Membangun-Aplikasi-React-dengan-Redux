import { Avatar } from '@mantine/core';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncDownVoteComment,
  asyncNeutralVoteComment,
  asyncUpVoteComment,
} from '../rtk/feature/thread_detail/threadDetailSlice';
import ThumbDownIconAction from './ThumbDownAction';
import ThumbUpIconAction from './ThumbUpAction';

function ThreadCommentsItem({ comment }) {
  const { id, content, createdAt, owner, upVotesBy, downVotesBy } = comment;

  const { user } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.threadDetail);
  const dispatch = useDispatch();

  const { name, avatar } = owner;
  const date = new Date(createdAt);
  const dateFormat = date.toLocaleDateString('id-ID', {
    dateStyle: 'full',
  });
  const timeFormat = date.toLocaleTimeString();

  const isAlreadyUpVote = upVotesBy?.some((userId) => userId === user?.id);
  const isAlreadyDownVote = downVotesBy?.some((userId) => userId === user?.id);

  const onUpVote = () => {
    if (isAlreadyUpVote) {
      dispatch(
        asyncNeutralVoteComment({
          commentId: id,
          threadId: data.id,
        }),
      );
    } else {
      dispatch(
        asyncUpVoteComment({
          commentId: id,
          threadId: data.id,
        }),
      );
    }
  };

  const onDownVote = () => {
    if (isAlreadyDownVote) {
      dispatch(
        asyncNeutralVoteComment({
          commentId: id,
          threadId: data.id,
        }),
      );
    } else {
      dispatch(
        asyncDownVoteComment({
          commentId: id,
          threadId: data.id,
        }),
      );
    }
  };

  return (
    <div className="flex flex-row gap-3 items-start">
      <Avatar radius="xl" src={`${avatar}`} />
      <div className="flex flex-col gap-1 grow">
        <div className="text-sm font-semibold">{`${name}`}</div>
        <div
          className="text-gray-600 text-sm"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="flex flex-wrap items-center py-1 gap-3">
          <ThumbUpIconAction
            number={upVotesBy?.length ?? 0}
            isActive={isAlreadyUpVote}
            onClick={onUpVote}
          />
          <ThumbDownIconAction
            number={downVotesBy?.length ?? 0}
            isActive={isAlreadyDownVote}
            onClick={onDownVote}
          />
        </div>
        <div className="text-xs text-gray-400 font-semibold self-end">
          {`${dateFormat} ${timeFormat}`}
        </div>
      </div>
    </div>
  );
}

ThreadCommentsItem.propTypes = {
  comment: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ThreadCommentsItem;
