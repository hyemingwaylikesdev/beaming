import { useState } from "react";
import { useQuery } from "react-query";

import axiosInstance from "@/util/axios";

interface Writer {
  _id: string;
  email: string;
  password: string;
  role: number;
  image: string;
  __v: number;
}

interface ProduceList {
  _id: string;
  writer: Writer;
  title: string;
  description: string;
  price: number;
  images: Array<string>;
  sold: number;
  category: number;
  views: number;
  __v: number;
}

interface ProduceResponse {
  products: ProduceList[];
  hasMore: boolean;
}

interface UseProduceListParams {
  limit: number;
  filters: {
    category: string[];
    price: number[];
  };
  searchTerm: string;
}

export const useProduceList = ({ limit, filters, searchTerm }: UseProduceListParams) => {
  const [skip, setSkip] = useState<number>(0);
  const [produceList, setProduceList] = useState<ProduceList[]>([]);

  const handleLoadMore = () => {
    setSkip((prevSkip) => prevSkip + limit);
  };

  const { isLoading } = useQuery<ProduceResponse>(
    ["produceList", searchTerm, filters, skip],
    async () => {
      interface Params {
        skip?: number;
        limit?: number;
        filters?: { category: string[]; price: number[] };
        searchTerm?: string;
      }

      const params: Params = {};

      if (skip !== 0) {
        params.skip = skip;
      }

      if (limit !== undefined) {
        params.limit = limit;
      }

      if (filters !== undefined && Object.keys(filters).length > 0) {
        params.filters = filters;
      }

      if (searchTerm !== undefined && searchTerm !== "") {
        params.searchTerm = searchTerm;
      }

      const response = await axiosInstance.get("/products", {
        params: params,
      });

      return response.data;
    },
    {
      staleTime: Infinity,
      onSuccess: (data) => {
        setProduceList(data.products);
      },
    },
  );

  return {
    produceList,
    hasMore: produceList.length > 0 && produceList.length % limit === 0,
    isLoading,
    handleLoadMore,
  };
};
