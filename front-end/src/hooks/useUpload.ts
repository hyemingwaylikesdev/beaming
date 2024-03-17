import { useState } from "react";

import axiosInstance from "@/util/axios";

interface FormData {
  title: string;
  description: string;
  price: number;
  category: number;
  images: string[];
}

const useUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const upload = async (data: FormData) => {
    setLoading(true);
    setError(null);

    const response = await axiosInstance.post("/product/upload", data);
    if (response.status !== 201) {
      throw new Error("Register failed");
    }
    setLoading(false);
    return response.data;
  };

  return { upload, loading, error };
};

export default useUpload;
