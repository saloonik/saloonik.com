import { Section, SectionHeading } from "@/components/layout/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/components/json-ld";
import type { FaqItem } from "@/content/faq";
import { faqJsonLd } from "@/lib/seo";

export function FaqSection({
  items,
  title = "Najczęściej zadawane pytania",
  eyebrow = "FAQ",
  className,
}: {
  items: FaqItem[];
  title?: string;
  eyebrow?: string;
  className?: string;
}) {
  return (
    <Section className={className}>
      <SectionHeading eyebrow={eyebrow} title={title} />
      <Accordion type="single" collapsible className="mx-auto mt-12 max-w-3xl">
        {items.map((item, i) => (
          <AccordionItem key={item.question} value={`q-${i}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <JsonLd data={faqJsonLd(items)} />
    </Section>
  );
}
