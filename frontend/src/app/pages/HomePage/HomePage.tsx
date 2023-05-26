import NavBar from 'app/components/NavBar/NavBar';
import { Masthead } from './Masthead';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchVideos } from 'app/actions/video';

export function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVideos());
  }, []);

  return (
    <>
      <NavBar />
      <Masthead />
    </>
  );
}

export default HomePage;
