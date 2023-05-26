import { register } from 'app/actions/user';
import { RegisterFormData } from 'app/types/user';
import { Button, Modal } from 'react-bootstrap';
import { Field, Form } from 'react-final-form';
import { useDispatch } from 'react-redux';

type RegisterFormProps = {
  className: string;
  onSuccess?: () => void;
};

const RegisterForm = ({ className, onSuccess }: RegisterFormProps) => {
  const dispatch = useDispatch();

  const onSubmit = (values: RegisterFormData) => {
    dispatch(register(values, onSuccess));
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={className}>
          <Modal.Body>
            <Field name="fullName" component="input" placeholder="Full Name" />
            <Field name="email" component="input" placeholder="Email" />
            <Field
              name="password"
              component="input"
              placeholder="Password"
              type="password"
            />
            <Modal.Footer>
              <Button variant="light" type="submit">
                Register
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </form>
      )}
    />
  );
};

export default RegisterForm;
