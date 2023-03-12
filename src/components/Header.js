import { ActionIcon, Button, Drawer, Image } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Logout, Menu2, MilitaryRank } from 'tabler-icons-react';
import { unsetUser } from '../rtk/feature/auth/authSlice';
import Container from './Container';

function HeaderDrawer() {
  const [opened, setOpened] = useState(false);
  const onClose = () => setOpened(false);
  const onOpen = () => setOpened(true);
  return (
    <div className="block lg:hidden">
      <ActionIcon onClick={onOpen}>
        <Menu2 color="white" />
      </ActionIcon>
      <Drawer opened={opened} onClose={onClose} position="right" title="Menu">
        <HeaderMenu />
      </Drawer>
    </div>
  );
}

function HeaderMenu() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col lg:flex-row gap-3">
      <Link to="/leaderboard">
        <Button
          leftIcon={<MilitaryRank />}
          variant="filled"
          color="orange"
          className="w-full lg:w-min"
        >
          Leaderboard
        </Button>
      </Link>
      {user && (
        <Link to="/login" onClick={() => dispatch(unsetUser())}>
          <Button leftIcon={<Logout />} color="red">
            Logout
          </Button>
        </Link>
      )}
      {!user && (
        <>
          <Link to="/register">
            <Button variant="default" className="w-full text-blue-500 lg:w-min">
              Sign Up
            </Button>
          </Link>
          <Link to="/login">
            <Button
              variant="subtle"
              className="w-full bg-blue-500 text-white hover:!bg-blue-400 lg:w-min"
            >
              Sign In
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}

function Header() {
  return (
    <header className="relative flex flex-col bg-blue-500 shadow h-20">
      <Container className="flex flex-row justify-between items-center">
        <Link to="/">
          <div className="relative h-12 w-12">
            <Image
              radius="md"
              src="https://picsum.photos/200"
              alt="Random image"
              fit="fill"
              className="shadow-lg"
            />
          </div>
        </Link>
        <HeaderDrawer />
        <div className="hidden lg:block">
          <HeaderMenu />
        </div>
      </Container>
    </header>
  );
}

export default Header;
