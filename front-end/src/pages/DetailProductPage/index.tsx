import ReactHtmlParser from "react-html-parser";
import { useParams } from "react-router-dom";

import ProductCarousel from "@/components/ProductCarousel";
import UseProduceDetail from "@/hooks/useProduceDetail";
import { category } from "@/util/filterData";

const DetailProductPage = () => {
  const { productId } = useParams();

  if (!productId) {
    return <div>상품 정보를 불러오는 중...</div>;
  }

  const { data } = UseProduceDetail(productId);
  const categoryItem = category.find((item) => item._id === data?.category);
  return (
    <div className="flex flex-col min-h-screen bg-white gap-6">
      <div className="flex-grow flex justify-center">
        <div className="flex flex-col md:justify-between gap-4 md:grid md:grid-cols-2 md:gap-20 md:p-20 p-8">
          <ProductCarousel images={data?.images || []} />
          <div className="flex flex-col  justify-between md:max-h-[450px] lg:max-h-[650px]">
            <div>
              <h2 className="text-2xl font-bold mb-2 mt-4">{data?.title}</h2>
              <p className="text-gray-500 mb-4">{categoryItem?.name}</p>
              <p className="text-gray-500 text-lg font-bold mb-8">
                {data?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원
              </p>
              <div className="border-b border-gray-300"></div>
            </div>

            <div className="flex gap-x-4 mt-2">
              <button className="px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500">
                장바구니 담기
              </button>
              <button className="px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500">
                구매하기
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-auto text-gray-700 text-lg leading-relaxed p-4">
        <p className="text-gray-500 mb-4">상품정보</p>
        {ReactHtmlParser(data?.description || "")}
      </div>
    </div>
  );
};

export default DetailProductPage;
