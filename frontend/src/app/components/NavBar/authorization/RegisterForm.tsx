import { register } from 'app/actions/user';
import Field from 'app/components/form/Field';
import Form from 'app/components/form/Form';
import SubmitButton from 'app/components/form/SubmitButton';
import { RegisterFormData } from 'app/types/user';
import { Modal } from 'react-bootstrap';
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
    <Form onSubmit={onSubmit} className={className}>
      <Modal.Body>
        <Field name="fullName" component="input" label="Full Name" />
        <Field name="email" component="input" label="Email" />
        <Field
          name="password"
          component="input"
          label="Password"
          type="password"
        />
      </Modal.Body>
      <Modal.Footer>
        <SubmitButton>Register</SubmitButton>
      </Modal.Footer>
    </Form>
  );
};

export default RegisterForm;
