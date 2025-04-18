export interface FAQItem {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
}
