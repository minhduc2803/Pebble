import { ReactNode } from 'react';
import { Button } from 'react-bootstrap';

import styles from './SubmitButton.module.css';

const SubmitButton = ({ children }: { children: ReactNode }) => (
  <Button variant="light" type="submit" className={styles.button}>
    {children}
  </Button>
);

export default SubmitButton;
