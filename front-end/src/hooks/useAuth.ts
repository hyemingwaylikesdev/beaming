import { useState } from "react";

import axiosInstance from "@/util/axios";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const authUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.get("/users/auth");
      if (response.status !== 200) {
        throw new Error("Register failed");
      }
      setLoading(false);
      return response.data;
    } catch (e) {
      setError(e instanceof Error ? e : new Error("An error occurred"));
      setLoading(false);
    }
  };

  return { authUser, loading, error };
};

export default useAuth;
