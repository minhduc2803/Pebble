import { useSelector } from 'react-redux';
import { User } from 'app/types/user';

import ShareVideoModal from './shareVideo/ShareVideoModal';
import LoginModal from './authorization/LoginModal';
import LogoutButton from './LogoutButton';

import styles from './NavBar.module.css';

const NavBar = () => {
  const user = useSelector(state => {
    const stateWithType = state as { user: User };
    return stateWithType.user;
  });
  const isUserLogin = !!user?.token;

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div>
          <div>Pebble</div>
        </div>
        {isUserLogin ? (
          <div className={styles.nav}>
            Welcome {user.fullName}
            <ShareVideoModal />
            <LogoutButton />
          </div>
        ) : (
          <LoginModal />
        )}
      </div>
    </header>
  );
};

export default NavBar;
