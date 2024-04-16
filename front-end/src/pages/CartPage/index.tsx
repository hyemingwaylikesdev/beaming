import { useRecoilValue } from "recoil";

import { userAuthData } from "@/store";

import useGetCartItem from "../../hooks/useGetCartItem";

const CartPage = () => {
  const productIds = useRecoilValue(userAuthData).cart.map((item) => item.id);

  const { data: cartItems, isLoading, isError } = useGetCartItem(productIds);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred</div>;
  }

  interface CartItem {
    id: string;
    images: string;
    title: string;
    price: number;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cart Page</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Product Image</th>
            <th className="px-4 py-2">Product Title</th>
            <th className="px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems?.map((item: CartItem) => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-2">
                <img
                  src={`${import.meta.env.VITE_SERVER_URL}/${item.images}`}
                  alt={item.title}
                  className="w-20 h-20 object-cover"
                />
              </td>
              <td className="px-4 py-2">{item.title}</td>
              <td className="px-4 py-2">${item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartPage;
