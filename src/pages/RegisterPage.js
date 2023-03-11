import { Button, Card, LoadingOverlay, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncRegister } from '../rtk/feature/register/registerSlice';

function RegisterPage() {
  const { isLoading } = useSelector((state) => state.register);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm({
    initialValues: { email: '', password: '', name: '' },
    validate: {
      name: (value) => (value ? null : 'Name is required'),
      email: (value) => (value ? null : 'Email is required'),
      password: (value) => (value ? null : 'Password is required'),
    },
  });

  const onSubmit = async (values) => {
    const { payload } = await dispatch(asyncRegister(values)).unwrap();
    if (payload.error) {
      const { message } = payload;
      notifications.show({
        color: 'red',
        title: 'Register Failed',
        message,
      });
    } else {
      notifications.show({
        color: 'green',
        title: 'Register',
        message: 'Register success',
      });
      navigate('/login');
    }
  };

  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Card className="my-5">
        <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-5">
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Your Name"
            name="name"
            type="name"
            {...form.getInputProps('name')}
          />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            name="email"
            type="email"
            {...form.getInputProps('email')}
          />
          <TextInput
            withAsterisk
            label="Password"
            placeholder="******"
            name="password"
            type="password"
            {...form.getInputProps('password')}
          />
          <Button type="submit">Login</Button>
        </form>
      </Card>
    </>
  );
}

export default RegisterPage;
