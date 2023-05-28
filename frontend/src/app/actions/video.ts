import api from 'app/api/api';
import {
  FETCH_VIDEOS_ACTION,
  RECEIVE_SHARED_VIDEO_ACTION,
  SHARE_VIDEO_ACTION,
} from 'app/redux/actions/type';
import { Video, VideoFormData } from 'app/types/video';
import { alertError, alertInfo } from 'app/utils/alert';

export const fetchVideos = () => async (dispatch, getState) => {
  try {
    const data = await api.get('/videos');
    dispatch({ type: FETCH_VIDEOS_ACTION, payload: data.data.videos });
  } catch (errorWithoutType) {
    alertError('Failed to fetch videos');
  }
};

export const shareVideo =
  (video: VideoFormData, onSuccess?: () => void) =>
  async (dispatch, getState) => {
    try {
      const data = await api.post('/videos', {
        video,
      });
      dispatch({ type: SHARE_VIDEO_ACTION, payload: data.data });
      if (onSuccess) onSuccess();
    } catch (errorWithoutType) {
      alertError('Failed to share the video');
    }
  };

export const receiveSharedVideo = (video: Video) => (dispatch, getState) => {
  const allVideos = getState().videos;
  const user = getState().user;
  const isExistingVideo = allVideos.some(({ id }) => id === video.id);
  if (video.user.id !== user.id && !isExistingVideo) {
    alertInfo(`${video.user.fullName} just shared a video: ${video.title}`);
    dispatch({ type: RECEIVE_SHARED_VIDEO_ACTION, payload: video });
  }
};
