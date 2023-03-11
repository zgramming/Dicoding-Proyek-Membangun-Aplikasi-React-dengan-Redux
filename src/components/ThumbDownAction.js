import { ActionIcon } from '@mantine/core';
import { ThumbDown } from 'tabler-icons-react';
import PropTypes from 'prop-types';

function ThumbDownIconAction({ number = 0 }) {
  return (
    <ActionIcon>
      <div className="flex flex-row items-center">
        <ThumbDown />
        <div className="font-semibold text-xs">{number}</div>
      </div>
    </ActionIcon>
  );
}

ThumbDownIconAction.defaultProps = {
  number: 0,
};

ThumbDownIconAction.propTypes = {
  number: PropTypes.number,
};

export default ThumbDownIconAction;
