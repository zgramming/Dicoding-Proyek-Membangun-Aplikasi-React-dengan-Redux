import { Badge, Card } from '@mantine/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ThumbUpIconAction from './ThumbUpAction';
import ThumbDownIconAction from './ThumbDownAction';

function ThreadItem({ thread, cardWithBorder = false }) {
  const { title, body, category, createdAt, ownerId } = thread;
  const date = new Date(createdAt);
  const dateFormat = date.toLocaleDateString('id-ID', { dateStyle: 'full' });
  const timeFormat = date.toLocaleTimeString();
  return (
    <Card withBorder={cardWithBorder}>
      <div className="flex flex-col">
        <div className="text-sm text-gray-600 font-semibold pb-3">{ownerId}</div>
        <Link to={`/thread/${thread}`} className="text-black no-underline">
          <div className="text-base font-bold">{title}</div>
        </Link>
        <div className="text-xs text-gray-400 pb-3">{`${dateFormat} ${timeFormat}`}</div>
        <div
          className="text-gray-600 text-sm pb-3"
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
          <ThumbUpIconAction />
          <ThumbDownIconAction />
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
