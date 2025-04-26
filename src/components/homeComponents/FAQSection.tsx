import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { faqItems } from "@/constants/home.constants";
import { FAQSectionProps } from "@/types";
import { Link } from "react-router-dom";

const FAQSection = ({
  title = "Have a question? We are here to help.",
  subtitle = "Check out the full FAQ page or reach out to our customer support team.",
  buttonText = "MORE QUESTIONS",
  buttonLink = "/",
}: FAQSectionProps) => {
  return (
    <section className="container mx-auto w-full overflow-hidden py-16 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start justify-center">
          {/* Left Column - Heading and CTA */}
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-lg text-muted-foreground max-w-md">{subtitle}</p>
            <div className="pt-4">
              <Link to={buttonLink}>
                <Button size="lg" variant="default" className="rounded-full ">
                  {buttonText}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - FAQ Accordion */}
          <div className="flex-1 bg-muted rounded-xl p-6">
            <Accordion
              type="single"
              collapsible
              className="space-y-2"
              defaultValue={faqItems
                .findIndex((item) => item.defaultOpen)
                ?.toString()}
            >
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={index.toString()}
                  className="border-b border-border py-2"
                >
                  <AccordionTrigger className="flex justify-between items-center w-full py-4 text-left font-medium">
                    <span>{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="py-4 text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
