import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  selectedCarts,
} from "@/redux/features/cart/cartSlice";
import { useUpdateProductQuantityMutation } from "@/redux/features/products/productsApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CartItem } from "@/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const Cart = () => {
  const carts = useAppSelector(selectedCarts);
  const dispatch = useAppDispatch();
  const [updateProductQuantity] = useUpdateProductQuantityMutation();
  const [loading, setLoading] = useState(false);

  const totalPrice = useMemo(() => {
    return carts
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  }, [carts]);

  const handleDecrease = async (id: string) => {
    setLoading(true);
    try {
      const res = await updateProductQuantity({
        productId: id,
        action: "increase",
      }).unwrap();
      if (res.success) {
        dispatch(decrementQuantity(id));
        setLoading(false);
      }
      setLoading(false);
    } catch {
      toast.error("something went wrong!");
      setLoading(false);
    }
  };

  const handleIncrease = async (id: string) => {
    setLoading(true);
    try {
      const res = await updateProductQuantity({
        productId: id,
        action: "decrease",
      }).unwrap();
      if (res.success) {
        dispatch(incrementQuantity(id));
        setLoading(false);
      }
    } catch {
      toast.error("something went wrong!");
      setLoading(false);
    }
  };

  const handleRemove = async (item: CartItem) => {
    setLoading(true);
    try {
      const res = await updateProductQuantity({
        productId: item.productId,
        action: "increase-by-value",
        quantity: item?.quantity,
      }).unwrap();
      if (res.success) {
        dispatch(removeFromCart(item.productId));
        setLoading(false);
      }
    } catch {
      toast.error("something went wrong!");
      setLoading(false);
    }
  };

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
                onClick={() => handleDecrease(item.productId)}
                disabled={item.quantity <= 1 || loading}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="px-3 font-semibold">{item.quantity}</span>
              <Button
                size="icon"
                variant="outline"
                onClick={() => {
                  if (item.quantity < item.availableQuantity) {
                    handleIncrease(item.productId);
                  }
                }}
                disabled={item.quantity >= item.availableQuantity || loading}
              >
                <Plus className="w-4 h-4" />
              </Button>
              <Button
                disabled={loading}
                variant="destructive"
                size="icon"
                onClick={() => handleRemove(item)}
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
