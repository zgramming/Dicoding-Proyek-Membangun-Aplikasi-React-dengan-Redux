import { Button, Card, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

function LoginPage() {
  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (value) => (value ? null : 'Email is required'),
      password: (value) => (value ? null : 'Password is required'),
    },
  });

  const onSubmit = (values) => values;

  return (
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
  );
}

export default LoginPage;
