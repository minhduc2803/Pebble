import { Link } from 'react-router-dom';
import NavBar from 'app/components/navbar/NavBar';

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
        <p>page not found.</p>
        <Link to={process.env.PUBLIC_URL + '/'}>Return to Home Page</Link>
      </div>
    </>
  );
};

export default NotFoundPage;
