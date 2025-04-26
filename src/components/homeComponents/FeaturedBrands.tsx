import { useGetAllBrandsQuery } from "@/redux/features/brands/brandsApi";
import { Loader } from "lucide-react";
import Marquee from "react-fast-marquee";

const FeaturedBrands = () => {
  const { data, isLoading } = useGetAllBrandsQuery({});
  const allBrands = data?.data || [];
  return (
    <section className="container mx-auto px-4 py-4 md:py-10">
      <h2 data-aos="fade-left" className="text-3xl font-bold mb-8 text-center md:text-start">
        Featured Brands
      </h2>
      {isLoading && (
        <div className="h-20 w-full flex justify-center items-center">
          <p>
            <Loader className="animate-spin" />
          </p>
        </div>
      )}
      <Marquee pauseOnHover={true}>
        {allBrands?.slice(0, 10).map((brand) => (
          <figure key={brand._id} className="mx-10">
            <img
              src={brand.image}
              alt={brand.brand}
              className="w-24 h-24 mx-auto"
            />
          </figure>
        ))}
      </Marquee>
    </section>
  );
};

export default FeaturedBrands;
