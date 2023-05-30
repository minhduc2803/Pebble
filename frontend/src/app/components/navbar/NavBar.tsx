import { useSelector } from 'react-redux';
import { User } from 'app/types/user';

import ShareVideoModal from './shareVideo/ShareVideoModal';
import LoginModal from './authorization/LoginModal';
import LogoutButton from './LogoutButton';
import { ReactComponent as Logo } from 'app/images/logo.svg';

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
        <div className={styles.brand}>
          <Logo />
          <div>Pebble</div>
        </div>
        {isUserLogin ? (
          <div className={styles.nav}>
            Welcome <b>{user.fullName}</b>
            <ShareVideoModal className={styles.shareButton} />
            <LogoutButton className={styles.logoutButton} />
          </div>
        ) : (
          <LoginModal className={styles.loginButton} />
        )}
      </div>
    </header>
  );
};

export default NavBar;
