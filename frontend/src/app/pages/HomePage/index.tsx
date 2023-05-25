import NavBar from 'app/components/NavBar/NavBar';
import { Masthead } from './Masthead';
import { Features } from './Features';

export function HomePage() {
  return (
    <>
      <NavBar />
      <Masthead />
      <Features />
    </>
  );
}
