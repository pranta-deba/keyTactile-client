import { Button } from "../ui/button";

const AppHero = () => {

  return (
    <section className="relative h-[600px] flex items-center">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?auto=format&fit=crop&q=80&w=2000"
          alt="Mechanical Keyboard"
          className="w-full h-full object-cover brightness-50"
        />
      </div>
      <div className="container mx-auto px-4 md:px-20 relative z-10 text-white">
        <h1 data-aos="fade-up" className="text-5xl font-bold mb-4">
          Premium Mechanical Keyboards
        </h1>
        <p data-aos="fade-up" className="text-xl mb-8">
          Discover the perfect blend of style and performance
        </p>
        <Button data-aos="fade-up" size="lg" asChild>
          <a href="#featured">Shop Now</a>
        </Button>
      </div>
    </section>
  );
};

export default AppHero;
