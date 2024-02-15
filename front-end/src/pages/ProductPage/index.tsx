import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  imageUrl: string;
  seller: string;
  price: number;
}

const ProductDetail = () => {
  const { productid } = useParams<{ productid: string }>();
  const [product, setProduct] = useState<Product | null>({
    id: 1,
    title: "Product 1",
    imageUrl: "https://via.placeholder.com/150",
    seller: "Seller 1",
    price: 10000,
  });

  useEffect(() => {
    fetch(`/api/products/${productid}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      });
  }, [productid]);

  return product === null ? (
    <div className="text-center">상품 정보를 불러오는 중...</div>
  ) : (
    <div className="p-4">
      <img
        src={product.imageUrl}
        alt={product.title}
        className="w-full h-64 object-cover mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
      <p className="text-gray-500 mb-4">{product.seller}</p>
      <p className="text-lg font-bold">{product.price}원</p>
    </div>
  );
};

export default ProductDetail;
