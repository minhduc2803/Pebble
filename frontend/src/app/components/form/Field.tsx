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

const Field = ({ name, label, className, ...props }: FieldProps) => (
  <div className={classNames(styles.field, className)}>
    {!!label && <FormLabel htmlFor={name} className={styles.label}>{label}</FormLabel>}
    <FinalFormField name={name} {...props}>
      {({ input, meta }) => (
        <div className={styles.input}>
          <input {...input} id={input.name} />
          {meta.error && meta.touched && (
            <div className={styles.error}>{meta.error}</div>
          )}
        </div>
      )}
    </FinalFormField>
  </div>
);

export default Field;
