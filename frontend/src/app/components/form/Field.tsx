import { FormLabel } from 'react-bootstrap';
import { Field as FinalFormField } from 'react-final-form';
import classNames from 'classnames';

import styles from './Field.module.css';

type FieldProps = {
  name: string;
  label?: string;
  className?: string;
  [otherProp: string]: any;
};

const Field = ({ label, className, ...props }: FieldProps) => (
  <div className={classNames(styles.field, className)}>
    {!!label && <FormLabel className={styles.label}>{label}</FormLabel>}
    <FinalFormField {...props} className={styles.input} />
  </div>
);

export default Field;
