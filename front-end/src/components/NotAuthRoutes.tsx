import { Navigate, Outlet } from "react-router-dom";

const NotAuthRoutes = ({ isAuth }: { isAuth: boolean }) => {
  return isAuth ? <Navigate to={"/"} /> : <Outlet />;
};

export default NotAuthRoutes;
