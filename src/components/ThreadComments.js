import { ActionIcon, Avatar } from '@mantine/core';
import PropTypes from 'prop-types';
import { ThumbDown, ThumbUp } from 'tabler-icons-react';

// TODO: Replace propTypes comments with Array of Objects
function ThreadComments({ comments }) {
  return (
    <div className="grid grid-cols-1 gap-5 py-5">
      {comments.map((comment) => (
        <div key={comment} className="flex flex-row gap-3 items-start">
          <Avatar color="cyan" radius="xl" />
          <div className="flex flex-col gap-1">
            <div className="text-sm font-semibold">Zeffry Reynando</div>
            <div className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id molestias deleniti
              molestiae sit, recusandae obcaecati exercitationem iure eum maxime, tempore optio et?
              Illum quis, numquam veritatis voluptatibus magni illo? Tempora.
            </div>
            <div className="flex flex-wrap items-center py-1 gap-3">
              <ActionIcon>
                <ThumbUp />
              </ActionIcon>
              <ActionIcon>
                <ThumbDown />
              </ActionIcon>
            </div>
            <div className="text-xs text-gray-400 font-semibold self-end">
              {new Date().toLocaleDateString('id-ID', {
                dateStyle: 'full',
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

ThreadComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ThreadComments;
