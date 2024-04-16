import { useState } from "react";

import axiosInstance from "@/util/axios";

type ProductData = {
  productId: string;
};

const useAddToCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addToCart = async (data: ProductData) => {
    setLoading(true);
    setError(null);

    const response = await axiosInstance.post("users/cart", data);
    if (response.status !== 201) {
      throw new Error("Adding to cart failed");
    }
    setLoading(false);
    return response.data;
  };

  return { addToCart, loading, error };
};

export default useAddToCart;
