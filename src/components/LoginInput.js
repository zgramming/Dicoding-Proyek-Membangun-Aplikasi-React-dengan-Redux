import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import PropTypes from 'prop-types';

function LoginInput({ onSubmit }) {
  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (value) => (value ? null : 'Email is required'),
      password: (value) => (value ? null : 'Password is required'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))} className="flex flex-col gap-5">
      <TextInput
        withAsterisk
        label="Email"
        placeholder="yours@email.com"
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
  );
}

LoginInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginInput;
