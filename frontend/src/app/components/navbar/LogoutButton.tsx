import { logout } from 'app/actions/user';
import { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

type LogoutButtonProps = {
  className?: string;
};

const LogoutButton = ({ className }: LogoutButtonProps) => {
  const dispatch = useDispatch();

  const hanleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <Button onClick={hanleLogout} variant="light" className={className}>
      Log out
    </Button>
  );
};

export default LogoutButton;
