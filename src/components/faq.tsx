import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is FlexReadme?",
    answer: "FlexReadme is a GitHub README generator powered by AI that creates polished, context‑aware documentation in seconds."
  },
  {
    question: "How many free uses do I get?",
    answer: "Every user receives 5 free AI‑powered README generations per month."
  },
  {
    question: "What templates are available?",
    answer: "We offer a free Bento template by default, and you can customize it to match your project’s style."
  },
  {
    question: "Where are my generated READMEs stored?",
    answer: "All your READMEs are saved automatically on the Discover page of your FlexReadme account."
  },
  {
    question: "Is FlexReadme really free?",
    answer: "Yes—FlexReadme is completely free to use. There are no hidden fees or paid tiers."
  },
  {
    question: "Can I customize the Bento theme?",
    answer: "Absolutely—you can tweak colors, layout, and typography in the Bento theme to fit your brand."
  }
];


export default function Faq() {
  return (
    <section className="relative py-20 bg-background/80 overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mt-6 mb-2 text-white">Frequently Asked <span className="text-primary">Questions</span></h2>
          <p className="text-base text-muted-foreground font-mono">{'>'} Everything you need to know</p>
        </div>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-lg overflow-hidden">
              <AccordionTrigger className="px-6 py-4 font-mono text-lg text-foreground hover:bg-muted/40 transition-all">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pt-3 pb-6 text-muted-foreground font-mono text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}