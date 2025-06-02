import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, screenLoading } = useSelector(state => state.userReducer);

  if (screenLoading) return null;

  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute;
