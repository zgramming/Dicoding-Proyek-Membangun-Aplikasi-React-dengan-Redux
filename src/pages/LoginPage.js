import { Button, Card, LoadingOverlay, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useDispatch, useSelector } from 'react-redux';
import { asyncLogin } from '../rtk/feature/login/loginSlice';

function LoginPage() {
  const { isLoading } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (value) => (value ? null : 'Email is required'),
      password: (value) => (value ? null : 'Password is required'),
    },
  });

  const onSubmit = async (values) => {
    const { payload } = await dispatch(asyncLogin(values)).unwrap();
    if (payload.error) {
      const { message } = payload;
      notifications.show({
        color: 'red',
        title: 'Login Failed',
        message,
      });
    } else {
      notifications.show({
        color: 'green',
        title: 'Login',
        message: 'Login success',
      });
    }
  };

  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Card className="my-5">
        <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-5">
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

export default LoginPage;
