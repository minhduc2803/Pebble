import { Video } from 'app/types/video';
import { useSelector } from 'react-redux';
import VideoComponent from './VideoComponent';

import styles from './VideoList.module.css';

const VideoList = () => {
  const videos = useSelector(state => {
    const stateWithType = state as {
      videos: Video[];
    };
    return stateWithType.videos;
  });

  return (
    <div className={styles.listContainer}>
      {videos.map(video => (
        <VideoComponent key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoList;
