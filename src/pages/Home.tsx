import AppHero from "@/components/homeComponents/AppHero";
import FeaturedBrands from "@/components/homeComponents/FeaturedBrands";
import FeaturedProducts from "@/components/homeComponents/FeaturedProducts";
import Services from "@/components/homeComponents/Services";

const Home = () => {
  return (
    <div className="flex flex-col gap-5">
      <AppHero />
      <Services />
      <FeaturedProducts />
      <FeaturedBrands/>
    </div>
  );
};

export default Home;
