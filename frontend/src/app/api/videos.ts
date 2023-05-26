import { User } from 'app/types/user';
import api from './api';
import { VideoFormData } from 'app/types/video';

export const getAllVideos = async (user: User) => {
  const data = await api.get('http://localhost:3000/videos');

  console.log('data', data);
};

export const shareVideo = async (video: VideoFormData) => {
  const data = await api.post('http://localhost:3000/videos', {
    video,
  });

  console.log('data', data);
};
