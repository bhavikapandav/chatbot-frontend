import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAuth }) => {
  const token = localStorage.getItem("_token");

  if (!token && isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (token && !isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;