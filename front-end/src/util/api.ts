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

export interface ProductDetailResponse {
  images: string[];
  _id: string;
  writer: Writer;
  title: string;
  description: string;
  price: number;
  category: number;
  views: number;
  sold: number;
}

export const fetchProducts = async ({
  skip,
  limit,
  filters,
  searchTerm,
}: {
  skip: number;
  limit: number;
  filters: { category: string[]; price: number[] };
  searchTerm: string;
}) => {
  const params = {
    skip,
    limit,
    filters,
    searchTerm,
  };
  const response = await axiosInstance.get("/products", { params });
  return response.data;
};

export const fetchProductDetail = async (id: string) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data[0];
};
