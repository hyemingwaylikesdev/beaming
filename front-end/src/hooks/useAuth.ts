import { useState } from "react";
import { useSetRecoilState } from "recoil";

import { userAuthData } from "@/store";
import axiosInstance from "@/util/axios";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const setUserAuthData = useSetRecoilState(userAuthData);

  const authUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.get("/users/auth");
      if (response.status !== 200) {
        throw new Error("Register failed");
      }
      setLoading(false);
      console.log("userAuthData", response.data);
      setUserAuthData(response.data);
      return response.data;
    } catch (e) {
      setError(e instanceof Error ? e : new Error("An error occurred"));
      setLoading(false);
    }
  };

  return { authUser, loading, error };
};

export default useAuth;
