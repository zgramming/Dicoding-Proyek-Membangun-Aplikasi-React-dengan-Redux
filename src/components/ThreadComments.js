import { Avatar } from '@mantine/core';
import PropTypes from 'prop-types';
import ThumbDownIconAction from './ThumbDownAction';
import ThumbUpIconAction from './ThumbUpAction';

// TODO: Replace propTypes comments with Array of Objects
function ThreadComments({ comments }) {
  return (
    <div className="grid grid-cols-1 gap-5 py-5">
      {comments.map((comment) => {
        const { id, content, createdAt, owner, upVotesBy, downVoteBy } = comment;
        const { name, avatar } = owner;
        const date = new Date(createdAt);
        const dateFormat = date.toLocaleDateString('id-ID', { dateStyle: 'full' });
        const timeFormat = date.toLocaleTimeString();
        return (
          <div key={comment} className="flex flex-row gap-3 items-start">
            <Avatar radius="xl" src={`${avatar}`} />
            <div className="flex flex-col gap-1 grow">
              <div className="text-sm font-semibold">{name}</div>
              <div
                className="text-gray-600 text-sm"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: content }}
              />
              <div className="flex flex-wrap items-center py-1 gap-3">
                <ThumbUpIconAction />
                <ThumbDownIconAction />
              </div>
              <div className="text-xs text-gray-400 font-semibold self-end">
                {`${dateFormat} ${timeFormat}`}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

ThreadComments.propTypes = {
  comments: PropTypes.arrayOf().isRequired,
};

export default ThreadComments;
