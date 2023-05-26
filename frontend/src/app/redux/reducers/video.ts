import {
  FETCH_VIDEOS_ACTION,
  RECEIVE_SHARED_VIDEO_ACTION,
  SHARE_VIDEO_ACTION,
} from '../actions/type';
import { Video } from 'app/types/video';

const initialState: Video[] = [];

const videos = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIDEOS_ACTION: {
      return action.payload;
    }
    case SHARE_VIDEO_ACTION: {
      const index = state.findIndex(video => video.id === action.payload.id);
      if (index === -1) return [action.payload, ...state];
      else return state;
    }
    case RECEIVE_SHARED_VIDEO_ACTION: {
      const index = state.findIndex(video => video.id === action.payload.id);
      if (index === -1) return [action.payload, ...state];
      else return state;
    }
    default:
      return state;
  }
};

export default videos;
