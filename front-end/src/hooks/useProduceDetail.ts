import { useQuery } from "@tanstack/react-query";

import { fetchProductDetail, ProductDetailResponse } from "@/util/api";

const UseProduceDetail = (id: string) => {
  const { data, isLoading } = useQuery<ProductDetailResponse, Error>({
    queryKey: ["product", id],
    queryFn: () => fetchProductDetail(id),
    staleTime: Infinity,
  });

  return {
    data,
    isLoading,
  };
};

export default UseProduceDetail;
