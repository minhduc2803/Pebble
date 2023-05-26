import { login } from 'app/actions/user';
import { LoginFormData } from 'app/types/user';
import { Button, Modal } from 'react-bootstrap';
import { Field, Form } from 'react-final-form';
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

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={className}>
          <Modal.Body>
            <Field name="email" component="input" placeholder="Email" />
            <Field
              name="password"
              component="input"
              placeholder="Password"
              type="password"
            />
            <Modal.Footer>
              <Button variant="light" type="submit">
                Login
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </form>
      )}
    />
  );
};

export default LoginForm;
