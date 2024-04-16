import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/util/axios";

const getCartItem = async (productIds: string[]) => {
  const { data } = await axiosInstance.get(`/products/${productIds.join(",")}`, {
    params: {
      type: "array",
    },
  });
  return data;
};

const useGetCartItem = (productIds: string[]) => {
  return useQuery({
    queryKey: ["cartItem", productIds],
    queryFn: () => getCartItem(productIds),
  });
};

export default useGetCartItem;
