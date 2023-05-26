import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ActionCable from 'actioncable';
import _ from 'lodash';

import { Video } from 'app/types/video';
import { receiveSharedVideo } from 'app/actions/video';
import { tranformObjectKeys } from 'app/utils/objectUtils';

const useVideoChannel = () => {
  const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
  const dispatch = useDispatch();

  useEffect(() => {
    cable.subscriptions.create(
      { channel: 'VideosChannel' },
      {
        received: (snakeCaseVideo: Video) => {
          const video = tranformObjectKeys(snakeCaseVideo, _.camelCase);
          dispatch(receiveSharedVideo(video));
        },
      },
    );
  }, [dispatch, cable.subscriptions]);
};

export default useVideoChannel;
