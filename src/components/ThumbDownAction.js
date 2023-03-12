import { ActionIcon } from '@mantine/core';
import { ThumbDown } from 'tabler-icons-react';
import PropTypes from 'prop-types';

function ThumbDownIconAction({
  isActive = false,
  number = 0,
  onClick = () => '',
}) {
  return (
    <ActionIcon onClick={onClick}>
      <div className="flex flex-row items-center">
        <ThumbDown color={isActive ? 'blue' : undefined} />
        <div className="font-semibold text-xs">{number}</div>
      </div>
    </ActionIcon>
  );
}

ThumbDownIconAction.defaultProps = {
  number: 0,
  onClick: () => '',
  isActive: false,
};

ThumbDownIconAction.propTypes = {
  number: PropTypes.number,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
};

export default ThumbDownIconAction;
