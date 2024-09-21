import { Navigate } from "react-router-dom";

function AdminProtected({ state, element }) {
  if (state) {
    return <>{element};</>;
  }
  return <Navigate to="/admin/login" />;
}

export default AdminProtected;
