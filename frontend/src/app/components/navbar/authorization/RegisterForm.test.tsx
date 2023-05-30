import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Provider } from 'react-redux';
import api from 'app/api/api';
import RegisterForm from './RegisterForm';
import store from 'app/redux/store';
import { emailError, passwordError } from 'app/utils/validationUtils';

jest.mock('app/api/api', () => ({
  post: jest.fn(),
}));

const mockedApiPost = api.post as jest.Mock;

describe('RegisterForm', () => {
  beforeEach(() => {
    mockedApiPost.mockResolvedValueOnce({ data: { token: 'test-token' } });
  });

  it('does field validation and only allow submit when form does not have errors', async () => {
    const onSuccessMock = jest.fn();
    const fullNameError = 'Full Name is required';

    render(
      <Provider store={store}>
        <RegisterForm onSuccess={onSuccessMock} />
      </Provider>,
    );

    expect(screen.queryByText(emailError)).toBeNull();
    expect(screen.queryByText(passwordError)).toBeNull();
    expect(screen.queryByText(fullNameError)).toBeNull();

    await user.click(screen.getByText('Register'));

    expect(screen.queryByText(emailError)).toBeInTheDocument();
    expect(screen.queryByText(passwordError)).toBeInTheDocument();
    expect(screen.queryByText(fullNameError)).toBeInTheDocument();

    await user.type(screen.getByLabelText('Email'), 'invalid email');
    await user.click(screen.getByText('Register'));

    expect(screen.queryByText(emailError)).toBeInTheDocument();

    await user.type(screen.getByLabelText('Password'), 'short');
    await user.click(screen.getByText('Register'));

    expect(screen.queryByText(passwordError)).toBeInTheDocument();

    await user.clear(screen.getByLabelText('Email'));
    await user.type(screen.getByLabelText('Email'), 'valid@email.com');
    await user.clear(screen.getByLabelText('Password'));
    await user.type(screen.getByLabelText('Password'), 'valid_password');
    await user.type(screen.getByLabelText('Full Name'), 'full name');

    await user.click(screen.getByText('Register'));

    expect(screen.queryByText(emailError)).toBeNull();
    expect(screen.queryByText(passwordError)).toBeNull();
    expect(screen.queryByText(fullNameError)).toBeNull();

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/users', {
        user: {
          email: 'valid@email.com',
          password: 'valid_password',
          fullName: 'full name',
        },
      });
    });
  });
});
