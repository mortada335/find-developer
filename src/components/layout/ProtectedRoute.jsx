import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

/**
 * ProtectedRoute
 *
 * Wrap any route that requires authentication.
 * Redirects to /admin/login if user is not authenticated.
 *
 * Usage in routes:
 *   { path: "/dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute> }
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <span className="loader"></span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
