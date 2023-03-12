import { Button, LoadingOverlay, Modal, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { asyncCreateThread } from '../rtk/feature/thread/threadSlice';

function ThreadInputModal({ isOpen, onClose, onSuccessSubmit }) {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.thread.onCreate);

  const [body, setComment] = useState('');

  const form = useForm({
    initialValues: { body: '', title: '', category: '' },
    validate: {
      body: (value) => (value ? null : 'Body is required'),
      title: (value) => (value ? null : 'Title is required'),
      category: (value) => (value ? null : 'Category is required'),
    },
  });

  const onSubmit = async (values) => {
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

      <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-5">
        <TextInput
          withAsterisk
          label="Judul"
          placeholder="Judul"
          name="title"
          type="text"
          {...form.getInputProps('title')}
        />
        <TextInput
          withAsterisk
          label="Kategori"
          placeholder="Kategori"
          name="category"
          type="text"
          {...form.getInputProps('category')}
        />
        <Textarea
          placeholder="Your body"
          label="Your body"
          minRows={5}
          onInput={(e) => {
            setComment(e.target.value);
          }}
          {...form.getInputProps('body')}
          withAsterisk
        />
        <Button type="submit" disabled={!body}>
          Posting
        </Button>
      </form>
    </Modal>
  );
}

ThreadInputModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccessSubmit: PropTypes.func.isRequired,
};

export default ThreadInputModal;
