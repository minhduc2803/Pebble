import axios from 'axios';

export const fetchVideoInfo = async ytVideoId => {
  const data = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${ytVideoId}&key=${process.env.REACT_APP_API_KEY}`,
  );

  return data.data.items[0].snippet;
};
