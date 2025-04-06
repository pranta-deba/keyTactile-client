import { Clock, HeadphonesIcon, Star, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const Services = () => {
  return (
    <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
      {[
        {
          icon: Truck,
          title: "Free Shipping",
          description: "On orders over $150",
        },
        {
          icon: Clock,
          title: "Fast Delivery",
          description: "2-3 business days",
        },
        {
          icon: HeadphonesIcon,
          title: "24/7 Support",
          description: "Always here to help",
        },
        {
          icon: Star,
          title: "Best Quality",
          description: "Guaranteed satisfaction",
        },
      ].map((service, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-col justify-center items-center">
            <service.icon className="w-8 h-8 mb-2 text-primary" />
            <CardTitle>{service.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center">
              {service.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default Services;
