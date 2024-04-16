import { useInfiniteQuery } from "@tanstack/react-query";

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
  const { data, isLoading, fetchNextPage } = useInfiniteQuery<ProductResponse, Error>({
    queryKey: ["products", filters, searchTerm],
    queryFn: ({ pageParam = 0 }) =>
      fetchProducts({
        skip: pageParam as number,
        limit,
        filters,
        searchTerm,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length * limit : undefined,
    staleTime: Infinity,
    gcTime: 300 * 1000,
  });

  return {
    data,
    isLoading,
    fetchNextPage,
  };
};
