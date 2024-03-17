import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD ? "" : "http://localhost:4000",
});

//! 헤더에 토큰을 추가, 요청을 보내기 전에 실행
axiosInstance.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.data.includes("jwt expired")) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("recoil-persist");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
