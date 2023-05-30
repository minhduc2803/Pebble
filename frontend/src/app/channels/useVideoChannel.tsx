import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActionCable from 'actioncable';
import _ from 'lodash';

import { Video } from 'app/types/video';
import { receiveSharedVideo } from 'app/actions/video';
import { tranformObjectKeys } from 'app/utils/objectUtils';
import { User } from 'app/types/user';

const useVideoChannel = () => {
  const cable = ActionCable.createConsumer(
    `ws://${process.env.REACT_APP_BACKEND_URL}/cable`,
  );
  const dispatch = useDispatch();
  const user = useSelector(state => {
    const stateWithType = state as { user: User };
    return stateWithType.user;
  });

  useEffect(() => {
    if (user.token) {
      cable.subscriptions.create(
        { channel: 'VideosChannel' },
        {
          received: (snakeCaseVideo: Video) => {
            const video = tranformObjectKeys(snakeCaseVideo, _.camelCase);
            dispatch(receiveSharedVideo(video));
          },
        },
      );
    }
  }, [dispatch, user.token, cable.subscriptions]);
};

export default useVideoChannel;
