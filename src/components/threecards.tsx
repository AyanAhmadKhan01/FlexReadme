export default function ThreeCards() {
  const cards = [
    {
      title: "AI-Powered Generation",
      description: "Generate professional documentation with smart AI suggestions and contextual awareness.",
      align: "left"
    },
    {
      title: "Live Markdown Editor",
      description: "Edit your README in real-time and see instant previews as you type.",
      align: "right"
    },
    {
      title: "Bento Grid Layouts",
      description: "Organize your docs with beautiful, modern bento-style grid layouts.",
      align: "left"
    }
  ];

  return (
    <section className="py-20 bg-background/80">
      <div className="container max-w-4xl mx-auto px-4 space-y-12">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`flex flex-col md:flex-row ${card.align === "right" ? "md:flex-row-reverse" : ""} items-center md:items-stretch gap-8 md:gap-16`}
          >
            <div className="flex-1 bg-card/70 border border-border/60 rounded-3xl shadow-xl p-8 md:p-12 backdrop-blur-md">
              <h3 className="text-2xl md:text-3xl font-bold font-mono mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {card.title}
              </h3>
              <p className="text-base md:text-lg text-muted-foreground font-mono">
                {card.description}
              </p>
            </div>
            <div className="hidden md:block flex-1" />
          </div>
        ))}
      </div>
    </section>
  );
}
