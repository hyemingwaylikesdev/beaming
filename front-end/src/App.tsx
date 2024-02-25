import "./App.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProductDetail from "./pages/ProductPage";
import RegisterPage from "./pages/RegisterPage";
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

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/products/:productid" element={<ProductDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
