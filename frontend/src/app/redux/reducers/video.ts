import {
  ADD_VIDEO_ACTION,
  ADD_YOUTUBE_VIDEO_ACTION,
  FETCH_VIDEOS_ACTION,
} from '../actions/type';
import { Video, YoutubeVideo } from 'app/types/video';

const initialState: {
  allIds: number[];
  byId: Record<number, Video>;
  byYtVideoId: Record<number, YoutubeVideo>;
} = {
  allIds: [],
  byId: {},
  byYtVideoId: {},
};

const videos = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIDEOS_ACTION: {
      return {
        ...state,
        allIds: action.videos.map(({ id }) => id),
        byId: {
          ...initialState.byId,
          ...action.videos.reduce(
            (acc: Record<number, Video>, video: Video) => {
              acc[video.id] = video;
              return acc;
            },
            {},
          ),
        },
      };
    }
    case ADD_VIDEO_ACTION: {
      const index = state.allIds.findIndex(
        videoId => videoId === action.video.id,
      );
      const newAllIds =
        index === -1 ? [action.video.id, ...state.allIds] : [...state.allIds];
      return {
        ...state,
        allIds: newAllIds,
        byId: {
          ...initialState.byId,
          [action.video.id]: {
            ...initialState.byId[action.video.id],
            ...action.video,
          },
        },
      };
    }
    case ADD_YOUTUBE_VIDEO_ACTION: {
      return {
        ...state,
        byYtVideoId: {
          ...initialState.byYtVideoId,
          [action.ytVideo.ytVideoId]: {
            ...initialState.byYtVideoId[action.ytVideo.ytVideoId],
            ...action.ytVideo,
          },
        },
      };
    }
    default:
      return state;
  }
};

export default videos;
