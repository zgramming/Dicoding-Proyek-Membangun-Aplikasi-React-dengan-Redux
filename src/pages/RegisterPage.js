import { Button, Card, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

function RegisterPage() {
  const form = useForm({
    initialValues: { email: '', password: '', name: '' },
    validate: {
      name: (value) => (value ? null : 'Name is required'),
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
  );
}

export default RegisterPage;
