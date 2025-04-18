import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { selectedCarts } from "@/redux/features/cart/cartSlice";
import { useGetSingleProductQuery } from "@/redux/features/products/productsApi";
import { useAppSelector } from "@/redux/hooks";
import { Loader, Star } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetSingleProductQuery(id!);
  const product = data?.data || {};
  const carts = useAppSelector(selectedCarts)
  console.log(carts)

  const handleAddToCart = async () => {
    if (
      product?.availableQuantity === 0 ||
      product?.availableQuantity - 1 === 0
    ) {
      toast.error("Product is out of stock!");
      return;
    }
    console.log(product);
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

          <Button onClick={handleAddToCart} className="w-full mt-4">
            Add To Cart
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetails;
