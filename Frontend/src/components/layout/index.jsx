import { Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AdminDashboard from "../../pages/Admin/home/AdminDashboard";

const Layout = () => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation;
  console.log(pathname);

  const render = () => {
    if (
      isAuthenticated &&
      pathname.toLowerCase().startsWith("/admin-dashboard")
    ) {
      return <AdminDashboard />;
    }
    return null;
  };

  return <div>index</div>;
};

export default Layout;
