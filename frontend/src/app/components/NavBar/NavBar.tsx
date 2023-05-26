import { useSelector } from 'react-redux';
import { User } from 'app/types/user';
import LoginModal from './authorization/LoginModal';
import ShareVideoModal from './shareVideo/ShareVideoModal';

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
          <div>
            Welcome {user.fullName}
            <ShareVideoModal />
          </div>
        ) : (
          <LoginModal />
        )}
      </div>
    </header>
  );
};

export default NavBar;
