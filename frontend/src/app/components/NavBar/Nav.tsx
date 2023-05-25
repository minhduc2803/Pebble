import { useState, useEffect, useCallback } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

import { RegistingUser, User } from 'app/types/user';

import styles from './Nav.module.css';
import { register } from 'app/api/users';

const Nav = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const userSrting = localStorage.getItem('user');
    if (!userSrting) return;
    const user = JSON.parse(userSrting);
    if (user) {
      setUser(user);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.setItem('user', '');
    setUser(undefined);
  }, []);

  const goToSharePage = useCallback(() => {
    navigate('/share');
  }, [navigate]);

  const onSubmit = (values: RegistingUser) => {
    console.log('values', values);
    register(values);
    localStorage.setItem(
      'user',
      JSON.stringify({
        fullName: values.fullName,
        email: values.email,
        token: values.password,
      }),
    );
    setUser({
      fullName: values.fullName,
      email: values.email,
      token: values.password,
    });
  };

  return user ? (
    <div className={styles.nav}>
      <div>Welcome {user.email}</div>
      <button onClick={goToSharePage}>Share a movie</button>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={styles.nav}>
          <Field name="fullName" component="input" placeholder="Full Name" />
          <Field name="email" component="input" placeholder="Email" />
          <Field
            name="password"
            component="input"
            placeholder="Password"
            type="password"
          />
          <button type="submit">Login / Register</button>
        </form>
      )}
    />
  );
};

export default Nav;
