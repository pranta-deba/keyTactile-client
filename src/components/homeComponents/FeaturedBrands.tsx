import { brands } from "@/constants/home.constants";

const FeaturedBrands = () => {
    return (
        <section className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center md:text-start">Featured Brands</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {brands.map((brand, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-24 h-24 object-contain"
            />
            <p className="font-medium">{brand.name}</p>
          </div>
        ))}
      </div>
    </section>
    );
};

export default FeaturedBrands;