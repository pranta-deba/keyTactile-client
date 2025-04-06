import { featuredProducts } from "@/constants/home.constants";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Star } from "lucide-react";
import { Button } from "../ui/button";

const FeaturedProducts = () => {
  return (
    <section id="featured" className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProducts.map((product) => (
          <Card key={product._id}>
            <CardHeader>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-muted-foreground">{product.brand}</p>
              <div className="flex items-center gap-2 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < product.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-2 font-bold">${product.price}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <a href={`/products/${product._id}`}>View Details</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button variant="outline" size="lg" asChild>
          <a href="/products">View All Products</a>
        </Button>
      </div>
    </section>
  );
};

export default FeaturedProducts;
