import { ReactNode } from 'react';
import { Form as FinalForm } from 'react-final-form';

type FormProps = {
  onSubmit: (values: any) => void;
  children: ReactNode;
  className?: string;
};

const Form = ({ children, onSubmit, className }: FormProps) => (
  <FinalForm
    onSubmit={onSubmit}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit} className={className}>
        {children}
      </form>
    )}
  />
);

export default Form;
