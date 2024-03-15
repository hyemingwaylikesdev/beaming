import "./App.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useRecoilValue } from "recoil";

import NotAuthRoutes from "./components/NotAuthRoutes";
import useAuth from "./hooks/useAuth";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProductDetail from "./pages/ProductPage";
import RegisterPage from "./pages/RegisterPage";
import { userState } from "./store";

function App() {
  function Layout() {
    return (
      <div className="flex flex-col h-screen justify-between">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <ToastContainer
          position="bottom-right"
          theme="light"
          pauseOnHover
          autoClose={1500}
          style={{ height: "200px" }}
        />
        <Footer />
      </div>
    );
  }

  const user = useRecoilValue(userState);
  const { authUser } = useAuth();

  useEffect(() => {
    if (user.isAuth) {
      authUser();
    }
    console.log("user", user);
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />}></Route>
        {/* 로그인한 사람은 갈 수 없는 경로 */}
        <Route element={<NotAuthRoutes isAuth={user.isAuth} />}>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
        </Route>
        <Route path="/products/:productid" element={<ProductDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
