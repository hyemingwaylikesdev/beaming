import axiosInstance from "./axios";

export interface Writer {
  _id: string;
  email: string;
  password: string;
  role: number;
  image: string;
  __v: number;
}

export interface Product {
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

export interface ProductResponse {
  products: Product[];
  hasMore: boolean;
}

export const fetchProducts = async ({
  skip,
  limit,
  filters = { category: [], price: [] },
  searchTerm = "",
}: {
  skip: number;
  limit: number;
  filters: { category: string[]; price: number[] };
  searchTerm: string;
}): Promise<ProductResponse> => {
  const params = {
    skip,
    limit,
    filters,
    searchTerm,
  };
  const response = await axiosInstance.get("/products", { params });
  return response.data;
};
