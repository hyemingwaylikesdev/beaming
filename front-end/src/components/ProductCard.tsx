import ImageSlider from "@/components/ImageSlider";
import { category } from "@/util/filterData";

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

const ProductCard = ({ product }: { product: ProduceList }) => {
  const categoryItem = category.find((item) => item._id === product?.category);

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden mb-4 mt-4">
      <a href={`/products/${product._id}`} title={product.title}>
        <div className="relative">
          <div className="w-full h-64 bg-center bg-cover">
            <ImageSlider images={product.images} />
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-500">{categoryItem?.name}</p>
          </div>
          <div className="mt-2">
            <span className="text-lg font-bold">{product.price}</span>
            <span className="text-sm text-gray-500">원</span>
          </div>
        </div>
      </a>
    </div>
  );
};
export default ProductCard;
