import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4 text-center text-primary">
        About KeyTactile
      </h1>
      <p className="text-lg text-muted-foreground text-center mb-10">
        Where precision meets passion — your go-to shop for premium mechanical
        keyboards.
      </p>

      <Separator className="mb-10" />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-background shadow-md">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-2 text-primary">
              Our Mission
            </h2>
            <p className="text-muted-foreground">
              At KeyTactile, we're obsessed with providing enthusiasts and
              newcomers alike with keyboards that enhance productivity, typing
              satisfaction, and style.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background shadow-md">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-2 text-primary">
              Quality First
            </h2>
            <p className="text-muted-foreground">
              We curate only the best switches, PCBs, and keycaps—tested by real
              users to ensure every keystroke feels right.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background shadow-md">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-2 text-primary">
              Community Driven
            </h2>
            <p className="text-muted-foreground">
              Built with feedback from the mechanical keyboard community, we're
              constantly evolving to meet your needs.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background shadow-md">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-2 text-primary">
              Worldwide Shipping
            </h2>
            <p className="text-muted-foreground">
              Whether you're in Tokyo or Toronto, we’ll get your gear to
              you—fast, safe, and reliable.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
