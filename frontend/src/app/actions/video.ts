import api from 'app/api/api';
import {
  FETCH_VIDEOS_ACTION,
  SHARE_VIDEO_ACTION,
} from 'app/redux/actions/type';
import { VideoFormData } from 'app/types/video';
import { alertError } from 'app/utils/alert';

export const fetchVideos = () => async (dispatch, getState) => {
  try {
    const data = await api.get('http://localhost:3000/videos');
    dispatch({ type: FETCH_VIDEOS_ACTION, payload: data.data.videos });
  } catch (errorWithoutType) {
    alertError('Failed to fetch videos');
  }
};

export const shareVideo =
  (video: VideoFormData, onSuccess?: () => void) =>
  async (dispatch, getState) => {
    try {
      const data = await api.post('http://localhost:3000/videos', {
        video,
      });
      dispatch({ type: SHARE_VIDEO_ACTION, payload: data.data });
      if (onSuccess) onSuccess();
    } catch (errorWithoutType) {
      alertError('Failed to share the video');
    }
  };
