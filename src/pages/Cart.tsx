import {
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  selectedCarts,
  selectedTotalAmount,
} from "@/redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { useUpdateProductQuantityMutation } from "@/redux/features/products/productsApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CartItem } from "@/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Cart = () => {
  const carts = useAppSelector(selectedCarts);
  const totalAmount = useAppSelector(selectedTotalAmount);
  const dispatch = useAppDispatch();
  const [updateProductQuantity] = useUpdateProductQuantityMutation();
  const [createOrder] = useCreateOrderMutation();
  const [loading, setLoading] = useState(false);
  const deliveryCharge: number = 15;
  const grandTotal: number = totalAmount + deliveryCharge;
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();


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

  const handleCheckOut = async () => {
    setLoading(true);
    const toastId = toast.loading("Ordered in....");
    if (!phone || !address) {
      toast.warning("Please provide (address and phone)!", { id: toastId });
      setLoading(false);
      return;
    }

    const cartItems = carts.map(({ productId, title, price, quantity }) => ({
      productId,
      title,
      price,
      quantity,
    }));

    const orderData = {
      phone,
      address,
      cartItems,
      totalAmount: grandTotal,
    };

    try {
      const res = await createOrder(orderData).unwrap();
      if (res.success) {
        dispatch(clearCart());
        toast.success("Order placed successfully.", { id: toastId });
        setOpen(false);
        setLoading(false);
        navigate("/booking");
      }
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "something went wrong", {
        id: toastId,
      });
      setLoading(false);
    }
  };

  if (carts.length === 0) {
    return (
      <div className="min-h-[calc(100vh-400px)] flex items-center justify-center text-2xl text-gray-600">
        Your cart is empty 🛒
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-400px)] max-w-5xl mx-auto py-10 px-4">
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
          Total: <span className="text-primary">${totalAmount}</span>
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button disabled={loading} className="mt-4">
              Proceed to Checkout
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <AlertDialogHeader>
              <DialogTitle>Checkout</DialogTitle>
              <DialogDescription>
                Please provide your delivery information to complete the order.
              </DialogDescription>
            </AlertDialogHeader>

            <div className="grid gap-4 py-4">
              <div className="text-sm text-muted-foreground bg-secondary px-4 py-2 rounded">
                Payment Method: <strong>Cash on Delivery</strong>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input
                  id="address"
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your full address"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone"
                  placeholder="Enter your phone number"
                  className="col-span-3"
                />
              </div>

              <div className="text-sm text-muted-foreground bg-secondary px-4 py-2 rounded">
                Delivery Charge: <strong>${deliveryCharge}</strong>
              </div>
              <div className="text-sm text-primary font-semibold bg-background px-4 py-2 rounded border">
                Total Amount (incl. delivery): <strong>${grandTotal}</strong>
              </div>
            </div>

            <AlertDialogFooter>
              <Button disabled={loading} onClick={handleCheckOut}>
                Confirm Order
              </Button>
            </AlertDialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Cart;
