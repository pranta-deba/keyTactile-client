import { Button } from "./button";
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
      <div className="container mx-auto relative z-10 text-white">
        <h1 className="text-5xl font-bold mb-4">
          Premium Mechanical Keyboards
        </h1>
        <p className="text-xl mb-8">
          Discover the perfect blend of style and performance
        </p>
        <Button size="lg" asChild>
          <a href="#featured">Shop Now</a>
        </Button>
      </div>
    </section>
  );
};

export default AppHero;
