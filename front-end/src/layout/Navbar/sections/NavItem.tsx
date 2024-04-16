import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import useLogout from "@/hooks/useLogout";
import { userAuthData, userInfoState } from "@/store";

const routes = [
  { to: "/login", name: "로그인", auth: false },
  { to: "/register", name: "회원가입", auth: false },
  { to: "/product/upload", name: "업로드", auth: true },
  {
    to: "/user/cart",
    name: "카트",
    auth: true,
    icon: <AiOutlineShoppingCart style={{ fontSize: "1.4rem" }} />,
  },

  { to: "", name: "로그아웃", auth: true },
  { to: "/history", name: "주문목록", auth: true },
];

const NavItem = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userInfoState);
  const userData = useRecoilValue(userAuthData);
  const mobile = false;
  const isAuth = user.isAuth;
  const cart = userData.cart;

  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <ul
      className={`text-md justify-center w-full flex gap-4 ${
        mobile && "flex-col bg-gray-900 h-full"
      } items-center bg-white`}
    >
      {routes.map(({ to, name, auth, icon }) => {
        if (isAuth !== auth) return null;

        if (name === "로그아웃") {
          return (
            <li key={name} className="py-2 text-center cursor-pointer text-purple-500">
              <button onClick={handleLogout}>{name}</button>
            </li>
          );
        } else if (icon) {
          return (
            <li
              className="relative py-2 text-center cursor-pointer text-purple-500"
              key={name}
            >
              {cart?.length > 0 && (
                <Link to={to}>
                  {icon}
                  <span className="absolute top-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -right-3">
                    {cart?.length}
                  </span>
                </Link>
              )}
            </li>
          );
        } else {
          return (
            <li key={name} className="py-2 text-center cursor-pointer text-purple-500">
              <Link to={to}>{name}</Link>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default NavItem;
