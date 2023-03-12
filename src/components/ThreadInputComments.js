import { Button, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { asyncCreateComment } from '../rtk/feature/thread_detail/threadDetailSlice';

function ThreadInputComment() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => state.threadDetail.onCreateComment,
  );

  const [content, setContent] = useState('');
  const form = useForm({
    initialValues: { content: '' },
    validate: {
      content: (value) => (value ? null : 'content is required'),
    },
  });

  const onSubmit = async (values) => {
    const result = await dispatch(
      asyncCreateComment({
        ...values,
        threadId: id,
      }),
    ).unwrap();
    if (result.error) {
      const { message } = result;
      notifications.show({
        color: 'red',
        title: 'Error',
        message,
      });
    } else {
      notifications.show({
        color: 'green',
        title: 'Success',
        message: 'Comment created',
      });

      // Reset form
      form.reset();
    }
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="text-lg font-semibold">Buat Komentar</div>
        <Textarea
          placeholder="Your content"
          minRows={3}
          onInput={(e) => {
            setContent(e.target.value);
          }}
          {...form.getInputProps('content')}
        />
        <Button type="submit" disabled={!content || isLoading}>
          Komentar
        </Button>
      </div>
    </form>
  );
}

export default ThreadInputComment;
