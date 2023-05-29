import { login } from 'app/actions/user';
import Field from 'app/components/form/Field';
import Form from 'app/components/form/Form';
import SubmitButton from 'app/components/form/SubmitButton';
import { LoginFormData } from 'app/types/user';
import { required } from 'app/utils/validationUtils';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

type LoginFormProps = {
  className?: string;
  onSuccess?: () => void;
};

const LoginForm = ({ className, onSuccess }: LoginFormProps) => {
  const dispatch = useDispatch();

  const onSubmit = (values: LoginFormData) => {
    dispatch(login(values, onSuccess));
  };

  return (
    <Form onSubmit={onSubmit} className={className}>
      <Modal.Body>
        <Field
          name="email"
          component="input"
          label="Email"
          validate={required('Email')}
        />
        <Field
          name="password"
          component="input"
          label="Password"
          type="password"
          validate={required('Password')}
        />
      </Modal.Body>
      <Modal.Footer>
        <SubmitButton>Login</SubmitButton>
      </Modal.Footer>
    </Form>
  );
};

export default LoginForm;
