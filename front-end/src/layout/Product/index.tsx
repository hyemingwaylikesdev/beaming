import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useRecoilState } from "recoil";

import CheckBox from "@/components/CheckBox";
import ProductCard from "@/components/ProductCard";
import RadioBox from "@/components/RadioBox";
import { useProduceList } from "@/hooks/useProduceList";
import { inputState } from "@/store";
import { category, prices } from "@/util/filterData";
const Product = () => {
  const [inputValue, setInputValue] = useRecoilState(inputState);
  const [searchTerm, setSearchTerm] = useState("");

  const limit = 8;
  const [skip, setSkip] = useState(0);
  const [filters, setFilters] = useState<Filters>({ category: [], price: [] });
  const [isFilters, setIsFilters] = useState(false);

  const { produceList, isLoading } = useProduceList({ skip, limit, filters, searchTerm });

  const performSearch = () => {
    setSearchTerm(inputValue);
  };

  type Filters = {
    [key: string]: string[] | number[];
    category: string[];
    price: number[];
  };

  const handleFilters = (newFilteredData: string[] | number[], category: string) => {
    const newFilters = { ...filters };
    if (category === "price") {
      const value = parseInt(newFilteredData[0] as string);
      const foundPrice = prices.find((price) => price._id === value);
      if (foundPrice && foundPrice.array.length !== 0) {
        const priceRange = foundPrice.array;
        newFilters[category] = [priceRange[0], priceRange[1]];
      } else {
        newFilters[category] = [];
      }
    } else {
      newFilters[category] = newFilteredData;
    }

    setFilters(newFilters);
  };

  return (
    <div className="flex flex-wrap ">
      <div className="flex w-full pt-2 flex-col px-4">
        <div className="flex justify-end">
          <div className="w-[500px] flex h-10 ">
            <button
              className="flex text-black p-4 rounded-lg items-center border border-gray-300 mr-2"
              onClick={() => {
                setIsFilters(!isFilters);
              }}
            >
              필터
              {isFilters ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:border-gray-300 focus:ring-0"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
            <button
              className="bg-purple-500 text-white px-4 py-2 rounded-r-lg hover:bg-purple-600 "
              onClick={() => performSearch()}
            >
              검색
            </button>
          </div>
        </div>
        {isFilters && (
          <div className="flex justify-end">
            <div className="flex pt-2 gap-3 w-[500px]">
              <div className="w-1/2">
                <CheckBox
                  category={category}
                  checkedCategory={filters.category}
                  onFilters={(filters: string[]) => handleFilters(filters, "category")}
                />
              </div>
              <div className="w-1/2">
                <RadioBox
                  prices={prices}
                  checkedPrice={filters.price}
                  onFilters={(filters: string[]) => handleFilters(filters, "price")}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {produceList?.products.length !== 0 ? (
            <div className="w-full p-4 flex flex-wrap">
              {produceList?.products.map((product, index) => (
                <div key={index} className="w-full sm:w-1/2 lg:w-1/4 p-1">
                  <ProductCard product={product} />
                </div>
              ))}
              {produceList?.hasMore && (
                <button
                  className="px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500"
                  onClick={() => setSkip((oldSkip) => oldSkip + limit)}
                >
                  더보기
                </button>
              )}
            </div>
          ) : (
            <div>검색조건에 맞는 상품이 존재하지 않습니다</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Product;
