import ProductCard from "../../components/ProductCard";

const ProductList = () => {
  const products = [
    {
      id: 1,
      title: "Product 1",
      imageUrl: "https://picsum.photos/300/400",
      index: 1,
      seller: "Seller 1",
      price: 1000,
    },
    {
      id: 2,
      title: "Product 2",
      imageUrl: "https://picsum.photos/300/400",
      index: 2,
      seller: "Seller 2",
      price: 2000,
    },
    {
      id: 3,
      title: "Product 3",
      imageUrl: "https://picsum.photos/300/400",
      index: 3,
      seller: "Seller 3",
      price: 3000,
    },
    {
      id: 4,
      title: "Product 4",
      imageUrl: "https://picsum.photos/300/400",
      index: 4,
      seller: "Seller 4",
      price: 4000,
    },
    {
      id: 1,
      title: "Product 1",
      imageUrl: "https://picsum.photos/300/400",
      index: 1,
      seller: "Seller 1",
      price: 1000,
    },
    {
      id: 2,
      title: "Product 2",
      imageUrl: "https://picsum.photos/300/400",
      index: 2,
      seller: "Seller 2",
      price: 2000,
    },
    {
      id: 3,
      title: "Product 3",
      imageUrl: "https://picsum.photos/300/400",
      index: 3,
      seller: "Seller 3",
      price: 3000,
    },
    {
      id: 4,
      title: "Product 4",
      imageUrl: "https://picsum.photos/300/400",
      index: 4,
      seller: "Seller 4",
      price: 4000,
    },
  ];

  const productGroups = [];
  for (let i = 0; i < products.length; i += 4) {
    productGroups.push(products.slice(i, i + 4));
  }

  return (
    <div>
      {productGroups.map((group, index) => (
        <div key={index} className="product-group grid grid-cols-4 gap-4">
          {group.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
