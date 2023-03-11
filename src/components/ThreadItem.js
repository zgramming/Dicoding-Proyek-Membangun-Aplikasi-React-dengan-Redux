import { ActionIcon, Badge, Card } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Message, ThumbDown, ThumbUp } from 'tabler-icons-react';
import PropTypes from 'prop-types';

function ThreadItem({ thread, cardWithBorder = false }) {
  return (
    <Card withBorder={cardWithBorder}>
      <div className="flex flex-col">
        <div className="text-sm text-gray-600 font-semibold pb-3">Zeffry Reynando</div>
        <Link to={`/thread/${thread}`} className="text-black no-underline">
          <div className="text-base font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.
          </div>
        </Link>
        <div className="text-xs text-gray-400 pb-3">
          {new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}
        </div>
        <div className="text-gray-600 text-sm pb-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda eum dolorum ratione
          doloremque magni aliquam alias officiis nulla beatae impedit? Placeat modi cumque quis
          aliquid blanditiis optio cum doloribus minima.
        </div>
        <div className="pb-3">
          <Badge className="self-start" size="sm">
            #React
          </Badge>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ActionIcon>
            <ThumbUp />
          </ActionIcon>
          <ActionIcon>
            <ThumbDown />
          </ActionIcon>
          <ActionIcon>
            <Message />
          </ActionIcon>
        </div>
      </div>
    </Card>
  );
}

ThreadItem.defaultProps = {
  cardWithBorder: false,
};

ThreadItem.propTypes = {
  thread: PropTypes.string.isRequired,
  cardWithBorder: PropTypes.bool,
};

export default ThreadItem;
