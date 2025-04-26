import { reviews } from "@/constants/home.constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Star } from "lucide-react";

const Reviews = () => {
  return (
    <section className="container mx-auto w-full overflow-hidden px-4">
      <h2 data-aos="fade-left" className="text-3xl font-bold mb-8 text-center md:text-start">What Our Customers Say</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {reviews.map((review) => (
            <CarouselItem
              key={review._id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default Reviews;
