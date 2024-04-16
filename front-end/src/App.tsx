import "./App.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useRecoilValue } from "recoil";

import NotAuthRoutes from "./components/NotAuthRoutes";
import ProtectedRoutes from "./components/ProtectedRoutes";
import useAuth from "./hooks/useAuth";
import Navbar from "./layout/Navbar";
import CartPage from "./pages/CartPage";
import DetailProductPage from "./pages/DetailProductPage";
import HistoryPage from "./pages/HistoryPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UploadProductPage from "./pages/UploadProductPage";
import { userInfoState } from "./store";

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
      </div>
    );
  }

  const user = useRecoilValue(userInfoState);

  const { authUser } = useAuth();

  useEffect(() => {
    if (user.isAuth) {
      authUser();
    }
  }, [user]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />}></Route>

          {/* 로그인한 사람만 갈 수 있는 경로 */}
          <Route element={<ProtectedRoutes isAuth={user.isAuth} />}>
            <Route path="/product/upload" element={<UploadProductPage />} />
            <Route path="/products/:productId" element={<DetailProductPage />} />
            <Route path="/user/cart" element={<CartPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Route>
          {/* 로그인한 사람은 갈 수 없는 경로 */}
          <Route element={<NotAuthRoutes isAuth={user.isAuth} />}>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
          </Route>
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
