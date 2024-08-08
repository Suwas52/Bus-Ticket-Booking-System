import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AuthSpinner from "../components/General/AuthSpinner";
import { PATH_PUBLIC } from "../routes/path";

// AuthGuard component in JavaScript
const AuthGuard = ({ roles }) => {
  const { isAuthenticated, user, isAuthLoading } = useAuth();

  // Determine if the user has access to the requested page
  const hasAccess =
    isAuthenticated && user?.roles?.some((role) => roles.includes(role));

  if (isAuthLoading) {
    return <AuthSpinner />;
  }

  return hasAccess ? <Outlet /> : <Navigate to={PATH_PUBLIC.unauthorized} />;
};

export default AuthGuard;
