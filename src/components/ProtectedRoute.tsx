import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if(!token){
    <Navigate to="/" replace/>
  }

  return (token && token !== "undefined") 
    ? <Outlet /> 
    : <Navigate to="/" replace />;
};

export default ProtectedRoute;