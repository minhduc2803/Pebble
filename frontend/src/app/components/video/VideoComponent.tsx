import { useSelector } from 'react-redux';

import { Video, YoutubeVideo } from 'app/types/video';

import styles from './VideoComponent.module.css';
import { embedUrl } from 'app/utils/validationUtils';

type VideoComponentProps = {
  videoId: number;
};

const VideoComponent = ({ videoId }: VideoComponentProps) => {
  const video = useSelector(state => {
    const stateWithType = state as {
      videos: {
        byId: Record<number, Video>;
      };
    };
    return stateWithType.videos.byId[videoId];
  });
  const ytVideo = useSelector(state => {
    const stateWithType = state as {
      videos: {
        byYtVideoId: Record<number, YoutubeVideo>;
      };
    };
    return video?.ytVideoId ? stateWithType.videos.byYtVideoId[video.ytVideoId] : null;
  });

  if (!video) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.videoContainer}>
        <img
          className={styles.ratio}
          src="http://placehold.it/16x9"
          alt="Not Found"
        />
        <iframe
          src={`${embedUrl}${video.ytVideoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
      <div className={styles.videoInfo}>
        <div className={styles.title}>{ytVideo?.title}</div>
        <div>
          Shared by: <b>{video.user.fullName}</b>
        </div>
        <div>Email: {video.user.email}</div>
        <div>Description:</div>
        <div>{ytVideo?.description}</div>
      </div>
    </div>
  );
};

export default VideoComponent;
