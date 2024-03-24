import { useInfiniteQuery } from "react-query";

import { fetchProducts, ProductResponse } from "@/util/api";

export const useProduceList = ({
  filters,
  limit,
  searchTerm,
}: {
  filters: { category: string[]; price: number[] };
  limit: number;
  searchTerm: string;
}) => {
  const { data, isLoading, fetchNextPage } = useInfiniteQuery<
    ProductResponse,
    Error,
    ProductResponse
  >(
    ["products", filters, searchTerm],
    async ({ pageParam = 0 }) => {
      const response = await fetchProducts({
        skip: pageParam as number,
        limit,
        filters,
        searchTerm,
      });
      return response;
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.products.length : undefined,
      staleTime: Infinity,
    },
  );

  return {
    data,
    isLoading,
    fetchNextPage,
  };
};
