import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import AppProductCard from "../productComponents/AppProductCard";
import { TProduct } from "@/types/products.types";

const FeaturedProducts = () => {
  const { data: products, isLoading } = useGetAllProductsQuery(undefined);

  if (isLoading) {
    return (
      <div className="h-20 w-full flex justify-center items-center">
        <p>
          <Loader className="animate-spin" />
        </p>
      </div>
    );
  }

  return (
    <section id="featured" className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center md:text-start">
        Featured Products
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
        {products?.data?.map((product: TProduct) => (
          <AppProductCard key={product._id} {...product} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button variant="outline" size="lg" asChild>
          <Link to="/products">View All Products</Link>
        </Button>
      </div>
    </section>
  );
};

export default FeaturedProducts;
