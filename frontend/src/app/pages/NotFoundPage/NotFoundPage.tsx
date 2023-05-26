import { P } from './P';
import { Link } from 'app/components/Link';
import NavBar from 'app/components/NavBar/NavBar';

const NotFoundPage = () => {
  return (
    <>
      <div>
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
      </div>
      <NavBar />
      <div>
        <div>
          4
          <span role="img" aria-label="Crying Face">
            😢
          </span>
          4
        </div>
        <P>Page not found.</P>
        <Link to={process.env.PUBLIC_URL + '/'}>Return to Home Page</Link>
      </div>
    </>
  );
};

export default NotFoundPage;
