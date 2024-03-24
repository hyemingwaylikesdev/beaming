import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";

import CheckBox from "@/components/CheckBox";
import CardItem from "@/components/ProductCard";
import RadioBox from "@/components/RadioBox";
import SearchInput from "@/components/SearchInput";
import axiosInstance from "@/util/axios";
import { category, prices } from "@/util/filterData";
interface Writer {
  _id: string;
  email: string;
  password: string;
  role: number;
  image: string;
  __v: number;
}
interface Product {
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
interface ProductResponse {
  products: Product[];
  hasMore: boolean;
}

const LandingPage: React.FC = () => {
  const limit = 8;
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: [] as string[],
    price: [] as string[],
  });

  const fetchProducts = async ({
    skip,
    filters = { category: [], price: [] },
    searchTerm = "",
  }: {
    skip: number;
    filters: { category: string[]; price: string[] };
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

  const { data, isLoading, fetchNextPage } = useInfiniteQuery<ProductResponse>({
    queryKey: ["products", filters, searchTerm],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetchProducts({
        skip: pageParam as number,
        filters,
        searchTerm,
      });
      return response;
    },
    getNextPageParam: (lastPage: ProductResponse) =>
      lastPage.hasMore ? lastPage.products.length : undefined,
    initialPageParam: 0,
    staleTime: Infinity,
  });

  type FilterCategory = "category" | "price";

  const handleFilters = (
    newFilteredData: string[] | number[],
    category: FilterCategory,
  ) => {
    const newFilters = { ...filters };
    if (category === "price") {
      const value = parseInt(newFilteredData[0] as string);
      const foundPrice = prices.find((price) => price._id === value);
      if (foundPrice && foundPrice.array.length !== 0) {
        const priceRange = foundPrice.array;
        newFilters[category] = [priceRange[0].toString(), priceRange[1].toString()];
      } else {
        newFilters[category] = [];
      }
    } else if (Array.isArray(newFilteredData) && typeof newFilteredData[0] === "number") {
      newFilters[category] = newFilteredData.map(String);
    } else {
      newFilters[category] = newFilteredData as string[];
    }

    setFilters({ ...filters, ...newFilters }); // 이 부분 수정
  };

  // const handleFilters = (newFilteredData: string | string[], category: string) => {
  //   const newFilters = {
  //     ...filters,
  //     [category]: Array.isArray(newFilteredData)
  //       ? newFilteredData.flat()
  //       : [newFilteredData],
  //   };
  //   if (category === "price") {
  //     const priceValues = Array.isArray(newFilteredData)
  //       ? newFilteredData.map(handlePrice).flat()
  //       : [handlePrice(newFilteredData)];
  //     console.log("priceValues", priceValues);
  //   }
  //   setFilters(newFilters);
  // };

  // const handlePrice = (value: string): string[] => {
  //   let array: string[] = [];
  //   for (const key in prices) {
  //     if (prices[key]._id === parseInt(value, 10)) {
  //       array = prices[key].array.map(String);
  //     }
  //   }
  //   return array;
  // };

  const handleSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <section>
      <div className="text-center m-7">
        <h2 className="text-2xl">여행 상품 사이트</h2>
      </div>
      {/* Filter */}
      <div className="flex gap-3">
        <div className="w-1/2">
          <CheckBox
            category={category}
            checkedCategory={filters.category}
            onFilters={(filters) => handleFilters(filters, "category")}
          />
        </div>
        <div className="w-1/2">
          <RadioBox
            prices={prices}
            checkedPrice={filters.price.map(Number)}
            onFilters={(filters) => handleFilters(filters, "price")}
          />
        </div>
      </div>

      {/* Search */}
      <div className="flex justify-end mb-3">
        <SearchInput searchTerm={searchTerm} onSearch={handleSearchTerm} />
      </div>

      {/* Card */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {data &&
          data.pages.map((page) =>
            page.products.map((product) => (
              <CardItem product={product} key={product._id} />
            )),
          )}
      </div>

      {/* LoadMore */}
      {data && data.pages[data.pages.length - 1].hasMore && (
        <div className="flex justify-center mt-5">
          <button
            onClick={() => fetchNextPage()}
            className="px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500"
          >
            더 보기
          </button>
        </div>
      )}
    </section>
  );
};

export default LandingPage;
