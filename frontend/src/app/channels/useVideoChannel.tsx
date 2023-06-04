import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ActionCable from 'actioncable';
import _ from 'lodash';

import { Video } from 'app/types/video';
import { receiveSharedVideo } from 'app/actions/video';
import { tranformObjectKeys } from 'app/utils/objectUtils';
import { useAppSelector } from 'app/redux/types';
import { userSelector } from 'app/selectors/user';

const useVideoChannel = () => {
  const cable = ActionCable.createConsumer(
    process.env.REACT_APP_BACKEND_WEBSOCKET,
  );
  const dispatch = useDispatch();
  const user = useAppSelector(userSelector);

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
