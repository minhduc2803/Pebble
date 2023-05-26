import NavBar from 'app/components/navbar/NavBar';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchVideos } from 'app/actions/video';
import VideoList from 'app/components/video/VideoList';

export function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVideos());
  }, []);

  return (
    <>
      <NavBar />
      <VideoList />
    </>
  );
}

export default HomePage;
