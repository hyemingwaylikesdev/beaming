import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ isAuth }: { isAuth: boolean }) => {
  return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
