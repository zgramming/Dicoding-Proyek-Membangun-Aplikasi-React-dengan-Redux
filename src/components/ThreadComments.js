import PropTypes from 'prop-types';
import ThreadCommentsItem from './ThreadCommentsItem';

function ThreadComments({ comments }) {
  return (
    <div className="grid grid-cols-1 gap-5 py-5">
      {comments.map((comment) => {
        const { id } = comment;

        return <ThreadCommentsItem key={id} comment={comment} />;
      })}
    </div>
  );
}

ThreadComments.propTypes = {
  comments: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default ThreadComments;
