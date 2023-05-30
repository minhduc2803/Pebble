import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Provider } from 'react-redux';
import api from 'app/api/api';
import ShareVideoModal from './ShareVideoModal';
import store from 'app/redux/store';
import { embedUrl, urlError } from 'app/utils/validationUtils';

jest.mock('app/api/api', () => ({
  post: jest.fn(),
}));

const mockedApiPost = api.post as jest.Mock;

describe('ShareVideoModal', () => {
  beforeEach(() => {
    mockedApiPost.mockResolvedValueOnce({ data: { token: 'test-token' } });
  });

  it('does field validation and only allow submit when form does not have errors', async () => {
    const titleError = 'Title is required';
    const validUrl = `${embedUrl}validUrl`;
    const validTitle = 'valid title';
    const description = 'this is a description';

    render(
      <Provider store={store}>
        <ShareVideoModal />
      </Provider>,
    );

    await user.click(screen.getByText('Share a video'));

    expect(screen.queryByText(urlError)).toBeNull();
    expect(screen.queryByText(titleError)).toBeNull();

    await user.click(screen.getByText('Share'));

    expect(screen.queryByText(urlError)).toBeInTheDocument();
    expect(screen.queryByText(titleError)).toBeInTheDocument();

    await user.type(screen.getByLabelText('Youtube URL'), 'invalid url');
    await user.click(screen.getByText('Share'));

    expect(screen.queryByText(urlError)).toBeInTheDocument();

    await user.clear(screen.getByLabelText('Youtube URL'));
    await user.type(screen.getByLabelText('Youtube URL'), validUrl);
    await user.clear(screen.getByLabelText('Title'));
    await user.type(screen.getByLabelText('Title'), validTitle);
    await user.type(screen.getByLabelText('Desription'), description);

    expect(screen.queryByText(urlError)).toBeNull();
    expect(screen.queryByText(titleError)).toBeNull();

    await user.click(screen.getByText('Share'));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/videos', {
        video: { url: validUrl, title: validTitle, description },
      });
    });
  });
});
