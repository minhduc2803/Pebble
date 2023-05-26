import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Field, Form } from 'react-final-form';

import styles from './LoginModal.module.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const LoginModal = () => {
  const [show, setShow] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const chooseLoginForm = () => setIsLoginForm(true);
  const chooseRegisterForm = () => setIsLoginForm(false);

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        Login / Register
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Button
              variant="light"
              active={isLoginForm}
              onClick={chooseLoginForm}
            >
              Login
            </Button>
            <Button
              variant="light"
              active={!isLoginForm}
              onClick={chooseRegisterForm}
            >
              Register
            </Button>
          </Modal.Title>
        </Modal.Header>
        {isLoginForm ? (
          <LoginForm className={styles.form} onSuccess={handleClose} />
        ) : (
          <RegisterForm className={styles.form} onSuccess={handleClose} />
        )}
      </Modal>
    </>
  );
};

export default LoginModal;
