import { FETCH_VIDEOS_ACTION } from '../actions/type';
import { Video } from 'app/types/video';

const initialState: Video[] = [];

const videos = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIDEOS_ACTION: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default videos;
