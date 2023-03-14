import { LoadingOverlay, Modal } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { asyncCreateThread } from '../rtk/feature/thread/threadSlice';
import ThreadInputModalInput from './ThreadInputModalInput';

function ThreadInputModal({ isOpen, onClose, onSuccessSubmit }) {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.thread.onCreate);

  const onSubmit = async (values, form) => {
    dispatch(showLoading());
    const { error } = await dispatch(asyncCreateThread(values)).unwrap();
    if (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to create thread',
        color: 'red',
      });
    } else {
      notifications.show({
        title: 'Success',
        message: 'Thread created',
        color: 'green',
      });
      form.reset();
      onSuccessSubmit();
    }
    dispatch(hideLoading());
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Buat Postingan">
      <LoadingOverlay visible={isLoading} overlayBlur={2} />

      <ThreadInputModalInput onSubmit={onSubmit} />
    </Modal>
  );
}

ThreadInputModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccessSubmit: PropTypes.func.isRequired,
};

export default ThreadInputModal;
