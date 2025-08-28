import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RedirectToRoleDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  if (user?.role === "admin") {
    return <Navigate to="/admin-dashboard" replace />;
  }
  if (user?.role === "branchManager") {
    return <Navigate to="/branch-dashboard" replace />;
  }
  return <Navigate to="/user-dashboard" replace />;
};

export default RedirectToRoleDashboard;
