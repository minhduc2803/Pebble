import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Provider } from 'react-redux';
import api from 'app/api/api';
import ShareVideoModal from './ShareVideoModal';
import store from 'app/redux/store';
import { embedUrl } from 'app/utils/validationUtils';
import { fetchVideoInfo } from 'app/api/youtubeApi';

jest.mock('app/api/api', () => ({
  post: jest.fn(),
}));

jest.mock('app/api/youtubeApi', () => ({
  fetchVideoInfo: jest.fn(),
}));

const mockedApiPost = api.post as jest.Mock;
const mockFetchVideoInfo = fetchVideoInfo as jest.Mock;

describe('ShareVideoModal', () => {
  beforeEach(() => {
    mockedApiPost.mockResolvedValueOnce({ data: { token: 'test-token' } });
    mockFetchVideoInfo.mockResolvedValue({
      title: 'Video title',
      description: 'Video description',
    });
  });

  it('does field validation and only allow submit when form does not have errors', async () => {
    const urlError = 'Youtube URL is required';
    const ytVideoId = 'GQFE1W1B4A4';
    const validUrl = `${embedUrl}${ytVideoId}`;

    render(
      <Provider store={store}>
        <ShareVideoModal />
      </Provider>,
    );

    await user.click(screen.getByText('Share a video'));

    expect(screen.queryByText(urlError)).toBeNull();

    await user.click(screen.getByText('Share'));

    expect(screen.queryByText(urlError)).toBeInTheDocument();

    await user.clear(
      screen.getByPlaceholderText("What's Youtube URL you want to share?"),
    );
    await user.type(
      screen.getByPlaceholderText("What's Youtube URL you want to share?"),
      validUrl,
    );

    expect(screen.queryByText(urlError)).toBeNull();

    await user.click(screen.getByText('Share'));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/videos', {
        url: validUrl,
      });
    });
  });
});
