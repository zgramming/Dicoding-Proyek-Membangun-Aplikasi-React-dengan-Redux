import { ActionIcon } from '@mantine/core';
import PropTypes from 'prop-types';
import { ThumbUp } from 'tabler-icons-react';

function ThumbUpIconAction({ number = 0 }) {
  return (
    <ActionIcon>
      <div className="flex flex-row items-center">
        <ThumbUp />
        <div className="font-semibold text-xs">{number}</div>
      </div>
    </ActionIcon>
  );
}

ThumbUpIconAction.defaultProps = {
  number: 0,
};

ThumbUpIconAction.propTypes = {
  number: PropTypes.number,
};

export default ThumbUpIconAction;
