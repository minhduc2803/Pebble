import { ReactNode } from 'react';
import { Button } from 'react-bootstrap';

import styles from './SubmitButton.module.css';

const SubmitButton = ({ children }: { children: ReactNode }) => (
  <Button variant="warning" type="submit" className={styles.button}>
    {children}
  </Button>
);

export default SubmitButton;
