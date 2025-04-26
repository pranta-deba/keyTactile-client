import { TProduct } from "@/types/products.types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Star } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const AppProductCard = ({
  _id,
  title,
  brand,
  price,
  rating,
  images,
  availableQuantity,
}: TProduct) => {
  return (
    <Card data-aos="fade-up">
      <CardHeader>
        <img
          src={images ? (images?.length > 0 ? images[0] : "") : ""}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-muted-foreground">{brand}</p>
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between">
          <p className="font-bold">${price}</p>
          <p className={``}>{availableQuantity} available</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link to={`/products/${_id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AppProductCard;
