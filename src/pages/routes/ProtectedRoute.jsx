import { Navigate } from "react-router-dom";


function ProtectedRoute({ state, element, path }) {
  if (state) {
    return <>{element};</>;
  }
  return <Navigate to={path}  />;
}

export default ProtectedRoute;
