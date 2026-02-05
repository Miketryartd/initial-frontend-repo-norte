import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  // Only render children (Outlet) if a valid token exists
  return (token && token !== "undefined") 
    ? <Outlet /> 
    : <Navigate to="/" replace />;
};

export default ProtectedRoute;