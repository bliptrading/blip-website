import { Link } from "react-router-dom";
import noresults from "../../assets/no-results.png";

function NotFound() {
  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-[60px] text-red-500  font-bold mx-auto my-4">404</h1>

      <div className="mx-auto my-4">
        <img className="w-48 mx" src={noresults} />
      </div>
      <h1 className="text-lg font-bold">Page Not Found</h1>
      <Link
        to="/"
        className="mx-auto  my-4 flex  w-40 justify-center items-center h-10 rounded-sm px-3 py-4 text-white bg-red-500"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
