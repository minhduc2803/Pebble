import { embedUrl } from 'app/utils/validationUtils';
import { videoSelector, ytVideoSelector } from 'app/selectors/video';
import { useAppSelector } from 'app/redux/types';

import styles from './VideoComponent.module.css';

type VideoComponentProps = {
  videoId: number;
};

const VideoComponent = ({ videoId }: VideoComponentProps) => {
  const video = useAppSelector(state => videoSelector(state, videoId));
  const ytVideo = useAppSelector(state =>
    ytVideoSelector(state, video.ytVideoId),
  );

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
        <div className={styles.description}>{ytVideo?.description}</div>
      </div>
    </div>
  );
};

export default VideoComponent;
