import Nav from './Nav';

import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div>
          <div>Pebble</div>
        </div>
        <Nav />
      </div>
    </header>
  );
};

export default NavBar;
