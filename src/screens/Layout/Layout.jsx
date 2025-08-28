import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar.jsx";

const Layout = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const hideNavbarRoutes = ["/", "/login", "/signup"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && (
        <Navbar role={user?.role} />
      )}
      <Outlet />

    </>
  );
};

export default Layout;
