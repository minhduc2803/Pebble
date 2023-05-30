import { useState } from 'react';
import { Button, ButtonGroup, Modal } from 'react-bootstrap';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import styles from './LoginModal.module.css';

type LoginModalProps = {
  className?: string;
};

const LoginModal = ({ className }: LoginModalProps) => {
  const [show, setShow] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const chooseLoginForm = () => setIsLoginForm(true);
  const chooseRegisterForm = () => setIsLoginForm(false);

  return (
    <>
      <Button variant="light" onClick={handleShow} className={className}>
        Login / Register
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={styles.modalTitle}>
            <ButtonGroup className={styles.buttonGroup}>
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
            </ButtonGroup>
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
