import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Provider } from 'react-redux';
import api from 'app/api/api';
import LoginForm from './LoginForm';
import store from 'app/redux/store';

jest.mock('app/api/api', () => ({
  post: jest.fn(),
}));

const mockedApiPost = api.post as jest.Mock;

describe('LoginForm', () => {
  beforeEach(() => {
    mockedApiPost.mockResolvedValueOnce({ data: { token: 'test-token' } });
  });

  it('does field validation and only allow submit when form does not have errors', async () => {
    const onSuccessMock = jest.fn();

    render(
      <Provider store={store}>
        <LoginForm onSuccess={onSuccessMock} />
      </Provider>,
    );

    expect(screen.queryByText('Email is required')).toBeNull();
    expect(screen.queryByText('Password is required')).toBeNull();

    await user.click(screen.getByText('Login'));

    expect(screen.queryByText('Email is required')).toBeInTheDocument();
    expect(screen.queryByText('Password is required')).toBeInTheDocument();

    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'password123');

    await user.click(screen.getByText('Login'));

    expect(screen.queryByText('Email is required')).toBeNull();
    expect(screen.queryByText('Password is required')).toBeNull();

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/user_token', {
        auth: { email: 'test@example.com', password: 'password123' },
      });
    });
  });
});
