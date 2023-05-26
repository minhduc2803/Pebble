import Field from './Field';

import styles from './TextAreaField.module.css';

type TextAreaFieldProps = {
  name: string;
  label?: string;
  [otherProp: string]: any;
};

const TextAreaField = (props: TextAreaFieldProps) => (
  <Field {...props} component="textarea" className={styles.field} />
);

export default TextAreaField;
