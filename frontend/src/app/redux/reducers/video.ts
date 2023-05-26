import { FETCH_VIDEOS_ACTION, SHARE_VIDEO_ACTION } from '../actions/type';
import { Video } from 'app/types/video';

const initialState: Video[] = [];

const videos = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIDEOS_ACTION: {
      return action.payload;
    }
    case SHARE_VIDEO_ACTION: {
      return [action.payload, ...state];
    }
    default:
      return state;
  }
};

export default videos;
