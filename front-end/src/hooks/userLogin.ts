import { useState } from "react";
import { useSetRecoilState } from "recoil";

import { userInfoState, userState } from "@/store";
import axiosInstance from "@/util/axios";
type FormData = {
  email: string;
  password: string;
};

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const setUser = useSetRecoilState(userState);
  const setUserInfo = useSetRecoilState(userInfoState);

  const login = async (data: FormData) => {
    setLoading(true);
    setError(null);

    const response = await axiosInstance.post("/users/login", data);
    if (response.status !== 200) {
      throw new Error("Login failed");
    }
    setUser({ email: data.email, password: data.password });
    setUserInfo({ isAuth: true });
    setLoading(false);
    return response.data;
  };

  return { login, loading, error };
};

export default useLogin;
