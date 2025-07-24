import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is FlexReadme?",
    answer: "FlexReadme is a modern documentation tool that helps you create beautiful, interactive, and professional README files with ease."
  },
  {
    question: "How does AI-powered generation work?",
    answer: "Our AI analyzes your project and generates context-aware content to jumpstart your documentation."
  },
  {
    question: "Can I customize the themes?",
    answer: "Yes! You can choose from premium themes and customize them to match your brand."
  },
  {
    question: "Is there a live editor?",
    answer: "Absolutely. Edit your markdown and see instant previews as you type."
  },
  {
    question: "What is Bento Design?",
    answer: "Bento Design is a modern grid-based layout system for organizing your documentation in visually appealing sections."
  }
]

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
              <AccordionContent className="px-6 pb-6 text-muted-foreground font-mono text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}