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
  skip: number;
  limit: number;
  filters: {
    category: string[];
    price: number[];
  };
  searchTerm: string;
}

export const useProduceList = ({
  skip,
  limit,
  filters,
  searchTerm,
}: UseProduceListParams) => {
  const { data: produceList, isLoading } = useQuery<ProduceResponse>(
    ["produceList", searchTerm, filters],
    async () => {
      const response = await axiosInstance.get("/products", {
        params: { skip, limit, filters, searchTerm },
      });
      return response.data;
    },
  );

  return {
    produceList,
    hasMore: produceList?.hasMore,
    isLoading,
  };
};
