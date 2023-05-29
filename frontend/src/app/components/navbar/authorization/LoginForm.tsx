import { login } from 'app/actions/user';
import Field from 'app/components/form/Field';
import Form from 'app/components/form/Form';
import SubmitButton from 'app/components/form/SubmitButton';
import { LoginFormData } from 'app/types/user';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

type LoginFormProps = {
  className: string;
  onSuccess?: () => void;
};

const LoginForm = ({ className, onSuccess }: LoginFormProps) => {
  const dispatch = useDispatch();

  const onSubmit = (values: LoginFormData) => {
    dispatch(login(values, onSuccess));
  };

  const validateEmail = (email?: string) => {
    return email ? undefined : 'Email is required';
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
        <SubmitButton>Login</SubmitButton>
      </Modal.Footer>
    </Form>
  );
};

export default LoginForm;
