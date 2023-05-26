import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';

import styles from './NavBar.module.css';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { User } from 'app/types/user';

const NavBar = () => {
  const navigate = useNavigate();
  const user = useSelector(state => {
    const stateWithType = state as { user: User };
    return stateWithType.user;
  });
  const isUserLogin = !!user?.token;
  console.log('user', user);
  const goToSharePage = useCallback(() => {
    navigate('/share');
  }, [navigate]);

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div>
          <div>Pebble</div>
        </div>
        {isUserLogin ? (
          <div>
            Welcome {user.fullName}
            <Button variant="light" onClick={goToSharePage}>
              Share a video
            </Button>
          </div>
        ) : (
          <LoginModal />
        )}
      </div>
    </header>
  );
};

export default NavBar;
