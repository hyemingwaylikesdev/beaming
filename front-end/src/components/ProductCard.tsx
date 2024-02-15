interface Product {
  id: number;
  title: string;
  imageUrl: string;
  index: number;
  seller: string;
  price: number;
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden mb-4 mt-4">
      <a href={`/products/${product.id}`} title={product.title}>
        <div className="relative">
          <div
            className="w-full h-64 bg-center bg-cover"
            style={{ backgroundImage: `url(${product.imageUrl})` }}
          ></div>
          <span className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 rounded">
            {product.index}
          </span>
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-500">{product.seller}</p>
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
