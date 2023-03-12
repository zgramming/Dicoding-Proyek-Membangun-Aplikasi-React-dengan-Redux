import { ActionIcon } from '@mantine/core';
import PropTypes from 'prop-types';
import { ThumbUp } from 'tabler-icons-react';

function ThumbUpIconAction({
  isActive = false,
  number = 0,
  onClick = () => '',
}) {
  return (
    <ActionIcon
      onClick={() => {
        onClick();
      }}
    >
      <div className="flex flex-row items-center">
        <ThumbUp color={isActive ? 'blue' : undefined} />
        <div className="font-semibold text-xs">{number}</div>
      </div>
    </ActionIcon>
  );
}

ThumbUpIconAction.defaultProps = {
  number: 0,
  onClick: () => '',
  isActive: false,
};

ThumbUpIconAction.propTypes = {
  number: PropTypes.number,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
};

export default ThumbUpIconAction;
