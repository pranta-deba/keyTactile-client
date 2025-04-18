import AppHero from "@/components/homeComponents/AppHero";
import Compare from "@/components/homeComponents/Compare";
import FeaturedBrands from "@/components/homeComponents/FeaturedBrands";
import FeaturedProducts from "@/components/homeComponents/FeaturedProducts";
import Reviews from "@/components/homeComponents/Reviews";
import Services from "@/components/homeComponents/Services";

const Home = () => {
  return (
    <div className="flex flex-col gap-5">
      <AppHero />
      <Services />
      <FeaturedProducts />
      <FeaturedBrands/>
      <Compare/>
      <Reviews/>
    </div>
  );
};

export default Home;
