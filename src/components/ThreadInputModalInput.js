import { Button, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import PropTypes from 'prop-types';
import { useState } from 'react';

function ThreadInputModalInput({ onSubmit }) {
  const [body, setComment] = useState('');

  const form = useForm({
    initialValues: { body: '', title: '', category: '' },
    validate: {
      body: (value) => (value ? null : 'Body is required'),
      title: (value) => (value ? null : 'Title is required'),
      category: (value) => (value ? null : 'Category is required'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values, form))} className="flex flex-col gap-5">
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
  );
}

ThreadInputModalInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ThreadInputModalInput;
