import { Navigate } from "react-router-dom";


function ProtectedRoute({ state, element }) {
  if (state === false) {
    return <Navigate to="/accounts/login" replace />;
  }
  return <>{element};</>;
}

export default ProtectedRoute;
