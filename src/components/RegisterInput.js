import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import PropTypes from 'prop-types';

function RegisterInput({ onSubmit }) {
  const form = useForm({
    initialValues: { email: '', password: '', name: '' },
    validate: {
      name: (value) => (value ? null : 'Name is required'),
      email: (value) => (value ? null : 'Email is required'),
      password: (value) => (value ? null : 'Password is required'),
    },
  });
  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))} className="flex flex-col gap-5">
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
      <Button type="submit">Register</Button>
    </form>
  );
}

RegisterInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default RegisterInput;
