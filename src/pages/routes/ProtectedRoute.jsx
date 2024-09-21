import { Navigate } from "react-router-dom";


function ProtectedRoute({ state, element }) {
  if (state) {
    return <>{element};</>;
  }
  return <Navigate to="/accounts/login"  />;
}

export default ProtectedRoute;
