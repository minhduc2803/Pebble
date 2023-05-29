import { useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { register } from 'app/actions/user';
import Field from 'app/components/form/Field';
import Form from 'app/components/form/Form';
import SubmitButton from 'app/components/form/SubmitButton';
import { RegisterFormData } from 'app/types/user';
import { isValidateEmail, required } from 'app/utils/validationUtils';

type RegisterFormProps = {
  className?: string;
  onSuccess?: () => void;
};

const RegisterForm = ({ className, onSuccess }: RegisterFormProps) => {
  const dispatch = useDispatch();

  const onSubmit = (values: RegisterFormData) => {
    dispatch(register(values, onSuccess));
  };

  const validateEmail = (email?: string) => {
    return isValidateEmail(email) ? undefined : 'Please provide a valid email';
  };

  const validatePassword = (password?: string) => {
    return (password?.length || 0) < 8
      ? 'Password need to has minimum length of 8'
      : undefined;
  };

  return (
    <Form onSubmit={onSubmit} className={className}>
      <Modal.Body>
        <Field
          name="fullName"
          component="input"
          label="Full Name"
          validate={required('Full Name')}
        />
        <Field
          name="email"
          component="input"
          label="Email"
          validate={validateEmail}
        />
        <Field
          name="password"
          component="input"
          label="Password"
          type="password"
          validate={validatePassword}
        />
      </Modal.Body>
      <Modal.Footer>
        <SubmitButton>Register</SubmitButton>
      </Modal.Footer>
    </Form>
  );
};

export default RegisterForm;
