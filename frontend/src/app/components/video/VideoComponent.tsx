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
        <div>{video.title}</div>
        <div>
          Shared by: {video.user.fullName} - {video.user.email}
        </div>
        <div>Description:</div>
        <div>{video.description}</div>
      </div>
    </div>
  );
};

export default VideoComponent;
