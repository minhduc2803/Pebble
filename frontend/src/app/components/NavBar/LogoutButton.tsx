import { logout } from 'app/actions/user';
import { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const hanleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <Button onClick={hanleLogout} variant="light">
      Log out
    </Button>
  );
};

export default LogoutButton;
