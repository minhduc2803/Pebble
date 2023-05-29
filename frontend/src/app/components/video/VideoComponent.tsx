import { Video } from 'app/types/video';
import { transformEmbedLink } from 'app/utils/videoUtils';

import styles from './VideoComponent.module.css';

type VideoComponentProps = {
  video: Video;
};

const VideoComponent = ({ video }: VideoComponentProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.videoContainer}>
        <img className={styles.ratio} src="http://placehold.it/16x9" />
        <iframe
          src={transformEmbedLink(video.url)}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
      <div className={styles.videoInfo}>
        <div className={styles.title}>{video.title}</div>
        <div>
          Shared by: <b>{video.user.fullName}</b>
        </div>
        <div>Email: {video.user.email}</div>
        {!!video.description && (
          <>
            <div>Description:</div>
            <div>{video.description}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoComponent;
