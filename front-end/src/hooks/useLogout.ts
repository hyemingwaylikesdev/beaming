import { useState } from "react";
import { useSetRecoilState } from "recoil";

import { userInfoState, userState } from "@/store";
import axiosInstance from "@/util/axios";

const useLoout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const setUser = useSetRecoilState(userState);
  const setUserInfo = useSetRecoilState(userInfoState);

  const logout = async () => {
    setLoading(true);
    setError(null);

    const response = await axiosInstance.post("/users/logout");
    if (response.status !== 200) {
      throw new Error("Logout failed");
    }
    setUser({ email: "", password: "" });
    setUserInfo({ isAuth: false });
    localStorage.removeItem("accessToken");
    setLoading(false);
    return response.data;
  };

  return { logout, loading, error };
};

export default useLoout;
