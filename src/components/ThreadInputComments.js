import { Button, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';

function ThreadInputComment() {
  const [comment, setComment] = useState('');
  const form = useForm({
    initialValues: { comment: '' },
    validate: {
      comment: (value) => (value ? null : 'Comment is required'),
    },
  });

  const onSubmit = (values) => values;

  return (
    <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="text-lg font-semibold">Buat Komentar</div>
        <Textarea
          placeholder="Your comment"
          minRows={3}
          onInput={(e) => {
            setComment(e.target.value);
          }}
          {...form.getInputProps('comment')}
        />
        <Button type="submit" disabled={!comment}>
          Komentar
        </Button>
      </div>
    </form>
  );
}

export default ThreadInputComment;
