import { useState } from "react";

import axiosInstance from "@/util/axios";

type FormData = {
  email: string;
  password: string;
  passwordAgain: string;
};

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const register = async (data: FormData) => {
    setLoading(true);
    setError(null);

    const response = await axiosInstance.post("/users/register", data);
    if (response.status !== 201) {
      throw new Error("Register failed");
    }
    setLoading(false);
    return response.data;
  };

  return { register, loading, error };
};

export default useRegister;
