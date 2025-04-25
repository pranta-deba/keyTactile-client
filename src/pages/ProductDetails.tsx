import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { selectedCurrentUser } from "@/redux/features/auth/authSlice";
import { addToCart, selectedCarts } from "@/redux/features/cart/cartSlice";
import {
  useGetSingleProductQuery,
  useUpdateProductQuantityMutation,
} from "@/redux/features/products/productsApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Loader, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

const ProductDetails = () => {
  const user = useAppSelector(selectedCurrentUser);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetSingleProductQuery(id!);
  const product = data?.data || {};
  const carts = useAppSelector(selectedCarts);
  const [updateProductQuantity] = useUpdateProductQuantityMutation();

  const productInCart = carts.find((item) => item.productId === product._id);

  const handleAddToCart = async () => {
    if (!product || product.availableQuantity === 0) {
      toast.error("Product is out of stock!");
      return;
    }

    const existingItem = carts.find((item) => item.productId === product._id);
    if (existingItem && existingItem.quantity >= product.availableQuantity) {
      toast.warning("You can't add more than available stock.");
      return;
    }

    const res = await updateProductQuantity({
      productId: product._id,
      action: "decrease",
    }).unwrap();

    if (res.success) {
      dispatch(
        addToCart({
          productId: product._id,
          title: product.title,
          price: product.price,
          quantity: 1,
          availableQuantity: product.availableQuantity,
          image: product.images[0],
        })
      );
      toast.success("Product added to cart!");
    }
  };

  if (isLoading)
    return (
      <div className="min-h-[calc(100vh-450px)] flex justify-center items-center">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-8">
      {/* Product Images */}
      <div className="space-y-4">
        <img
          src={product?.images?.[0]}
          alt={product?.title}
          className="rounded-xl w-full h-[300px] object-cover shadow-lg"
        />
        <div className="grid grid-cols-3 gap-2">
          {product?.images?.slice(1).map((img: string, index: number) => (
            <img
              key={index}
              src={img}
              alt={`Preview ${index}`}
              className="rounded-lg h-[80px] object-cover border shadow-sm"
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <Card className="p-6 space-y-4">
        <CardContent className="p-0 space-y-4">
          <h2 className="text-2xl font-bold text-primary">{product?.title}</h2>
          <p className="text-gray-500 text-sm">Brand: {product?.brand}</p>

          <div className="text-xl font-semibold text-green-600">
            ${product?.price.toFixed(2)}
          </div>

          <div className="flex items-center gap-1 text-yellow-500">
            {[...Array(Math.round(product?.rating))].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-yellow-500 stroke-yellow-500"
              />
            ))}
            <span className="text-sm text-gray-600 ml-1">
              ({product?.rating.toFixed(1)})
            </span>
          </div>

          <p className="text-sm text-gray-700">
            <span className="font-semibold">In Stock:</span>{" "}
            {product?.availableQuantity} items
          </p>

          <p className="text-gray-600 text-sm leading-relaxed">
            {product?.description}
          </p>

          {user?.role === "user" && (
            <Button
              disabled={!!productInCart || product.availableQuantity === 0}
              onClick={handleAddToCart}
              className="w-full mt-4"
            >
              {productInCart ? "Already in Cart" : "Add to Cart"}
            </Button>
          )}
          {!user && (
            <>
              <Button>
                <Link to={"/login"}>Add To cart</Link>
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetails;
