import { ActionIcon } from '@mantine/core';
import PropTypes from 'prop-types';
import { Message2 } from 'tabler-icons-react';

function MessageIconAction({ number = 0, onClick = () => '' }) {
  return (
    <ActionIcon onClick={onClick}>
      <div className="flex flex-row items-center">
        <Message2 />
        <div className="font-semibold text-xs">{number}</div>
      </div>
    </ActionIcon>
  );
}

MessageIconAction.defaultProps = {
  number: 0,
  onClick: () => '',
};

MessageIconAction.propTypes = {
  number: PropTypes.number,
  onClick: PropTypes.func,
};

export default MessageIconAction;
