import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  selectedCarts,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useMemo } from "react";

const Cart = () => {
  const carts = useAppSelector(selectedCarts);
  const dispatch = useAppDispatch();

  const totalPrice = useMemo(() => {
    return carts
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  }, [carts]);

  if (carts.length === 0) {
    return (
      <div className="min-h-[calc(100vh-450px)] flex items-center justify-center text-2xl text-gray-600">
        Your cart is empty 🛒
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-6">
        {carts.map((item) => (
          <Card
            key={item.productId}
            className="flex flex-col md:flex-row items-center justify-between p-4"
          >
            <div className="flex items-center gap-4 w-full md:w-2/3">
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-500">${item.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Button
                size="icon"
                variant="outline"
                onClick={() => dispatch(decrementQuantity(item.productId))}
                disabled={item.quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="px-3 font-semibold">{item.quantity}</span>
              <Button
                size="icon"
                variant="outline"
                onClick={() => {
                  if (item.quantity < item.availableQuantity) {
                    dispatch(incrementQuantity(item.productId));
                  }
                }}
                disabled={item.quantity >= item.availableQuantity}
              >
                <Plus className="w-4 h-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => dispatch(removeFromCart(item.productId))}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-right">
        <h2 className="text-2xl font-semibold">
          Total: <span className="text-primary">${totalPrice}</span>
        </h2>
        <Button className="mt-4">Proceed to Checkout</Button>
      </div>
    </div>
  );
};

export default Cart;
