import { Card, LoadingOverlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { asyncRegister } from '../rtk/feature/register/registerSlice';

function RegisterPage() {
  const { isLoading } = useSelector((state) => state.register);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    const result = await dispatch(asyncRegister(values)).unwrap();
    if (result.error) {
      notifications.show({
        color: 'red',
        title: 'Register Failed',
        message: result.message,
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
        <RegisterInput onSubmit={onSubmit} />
      </Card>
    </>
  );
}

export default RegisterPage;
