import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, screenLoading } = useSelector((state) => state.userReducer);

  if (screenLoading) return null;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
