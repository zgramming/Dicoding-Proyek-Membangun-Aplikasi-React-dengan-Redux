import { Button, Modal, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import PropTypes from 'prop-types';
import { useState } from 'react';

function ThreadInputModal({ isOpen, onClose }) {
  const [comment, setComment] = useState('');

  const form = useForm({
    initialValues: { comment: '', title: '', category: '' },
    validate: {
      comment: (value) => (value ? null : 'Comment is required'),
      title: (value) => (value ? null : 'Title is required'),
      category: (value) => (value ? null : 'Category is required'),
    },
  });

  const onSubmit = (values) => values;

  return (
    <Modal opened={isOpen} onClose={onClose} title="Buat Postingan">
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
          placeholder="Your comment"
          label="Your comment"
          minRows={5}
          onInput={(e) => {
            setComment(e.target.value);
          }}
          {...form.getInputProps('comment')}
          withAsterisk
        />
        <Button type="submit" disabled={!comment}>
          Posting
        </Button>
      </form>
    </Modal>
  );
}

ThreadInputModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ThreadInputModal;
