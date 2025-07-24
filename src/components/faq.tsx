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
      <div className="container max-w-2xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 bg-muted/80 backdrop-blur-sm border border-border/60 rounded-lg px-4 py-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <span className="text-sm font-mono text-muted-foreground">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mt-6 mb-2 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">Frequently Asked Questions</h2>
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