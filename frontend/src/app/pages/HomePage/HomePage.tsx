import NavBar from 'app/components/navbar/NavBar';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchVideos } from 'app/actions/video';
import VideoList from 'app/components/video/VideoList';
import useVideoChannel from 'app/channels/useVideoChannel';

export function HomePage() {
  const dispatch = useDispatch();
  useVideoChannel();

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <VideoList />
    </>
  );
}

export default HomePage;
