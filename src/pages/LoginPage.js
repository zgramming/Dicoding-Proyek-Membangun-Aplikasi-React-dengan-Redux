import { Card, LoadingOverlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { asyncLogin } from '../rtk/feature/login/loginSlice';

function LoginPage() {
  const { isLoading } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { payload } = await dispatch(asyncLogin(values)).unwrap();
    if (payload?.error) {
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
      navigate('/');
    }
  };

  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Card className="my-5">
        <LoginInput onSubmit={onSubmit} />
      </Card>
    </>
  );
}

export default LoginPage;
