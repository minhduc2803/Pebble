import { RootState } from 'app/redux/store';

export const videoSelector = (state: RootState, videoId: number) => {
  return state.videos.byId[videoId];
};

export const ytVideoSelector = (
  state: RootState,
  ytVideoId?: string | null,
) => {
  return ytVideoId ? state.videos.byYtVideoId[ytVideoId] : null;
};
