import api from 'app/api/api';
import { fetchVideoInfo } from 'app/api/youtubeApi';
import {
  ADD_VIDEO_ACTION,
  ADD_YOUTUBE_VIDEO_ACTION,
  FETCH_VIDEOS_ACTION,
} from 'app/redux/actions/type';
import { Video, VideoFormData } from 'app/types/video';
import { alertError, alertInfo } from 'app/utils/alert';
import { AxiosError } from 'axios';

export const fetchVideos = () => async (dispatch, getState) => {
  try {
    const data = await api.get('/videos');
    const { videos } = data.data;
    dispatch({ type: FETCH_VIDEOS_ACTION, page: 0, videos });
    Array.from(new Set(videos.map(({ ytVideoId }) => ytVideoId))).forEach(
      ytVideoId => {
        dispatch(addYtVideo(ytVideoId));
      },
    );
  } catch (errorWithoutType) {
    alertError('Failed to fetch videos');
  }
};

export const shareVideo =
  (video: VideoFormData, onSuccess?: () => void) => async dispatch => {
    try {
      const data = await api.post('/videos', {
        url: video.url,
      });
      dispatch({
        type: ADD_VIDEO_ACTION,
        video: data.data,
      });
      if (onSuccess) onSuccess();
    } catch (errorWithoutType) {
      const error = errorWithoutType as AxiosError;
      const dataFromBE = error.response?.data as { errors: string[] };
      const errorMessage = dataFromBE.errors.join('\n');
      if (errorMessage) alertError(errorMessage);
      else alertError('Failed to share the video');
    }
  };

export const addYtVideo = ytVideoId => async dispatch => {
  try {
    const videoInfo = await fetchVideoInfo(ytVideoId);
    dispatch({
      type: ADD_YOUTUBE_VIDEO_ACTION,
      ytVideo: {
        ytVideoId,
        title: videoInfo.title,
        description: videoInfo.description,
      },
    });
  } catch (errorWithoutType) {
    const error = errorWithoutType as AxiosError;
    const dataFromApi = error.response?.data as { message: string };
    const errorMessage = dataFromApi.message;
    if (errorMessage) alertError(errorMessage);
    else alertError('Failed to use API key');
  }
};

export const receiveSharedVideo = (video: Video) => (dispatch, getState) => {
  const user = getState().user;
  if (video.user.id !== user.id) {
    alertInfo(`${video.user.fullName} just shared a video: ${video.title}`);
    dispatch({
      type: ADD_VIDEO_ACTION,
      video,
    });
  }
};
