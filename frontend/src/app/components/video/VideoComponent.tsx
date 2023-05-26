import { Video } from 'app/types/video';
import { transformEmbedLink } from 'app/utils/videoUtils';

import styles from './VideoComponent.module.css';

type VideoComponentProps = {
  video: Video;
};

const VideoComponent = ({ video }: VideoComponentProps) => {
  return (
    <div className={styles.videoContainer}>
      <div>
        <iframe
          width="480"
          height="270"
          src={transformEmbedLink(video.url)}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
      <div>
        <div className={styles.title}>{video.title}</div>
        <div className={styles.fullName}>
          Shared by: <b>{video.user.fullName}</b>
        </div>
        <div>Email: {video.user.email}</div>
        {!!video.description && (
          <>
            <div>Description:</div>
            <div className={styles.description}>{video.description}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoComponent;
