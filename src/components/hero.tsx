import Link from "next/link"
import { ArrowRight, Github, Code2, Terminal, Cpu, Grid3X3, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const features = [
    { icon: Code2, text: "Smart Editor", desc: "Intelligent markdown editing" },
    { icon: Terminal, text: "Live Preview", desc: "See changes instantly" },
    { icon: Cpu, text: "Fast Rendering", desc: "Optimized performance" },
    { icon: Grid3X3, text: "Templates", desc: "Professional layouts" },
  ]

  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
     
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <div className="absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
    
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/5 rotate-45 rounded-3xl blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-500/5 rotate-12 rounded-3xl blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-purple-500/10 rotate-45 rounded-3xl" />
      </div>

      <div className="container max-w-[1200px] mx-auto px-4 py-32 relative z-10">
       
        <div className="text-center space-y-8 max-w-4xl mx-auto">
        
          <div className="inline-flex items-center space-x-2 bg-muted/30 backdrop-blur-sm border border-border/60 rounded-4xl px-4 py-2">
            <Zap size={20} className="text-yellow-400 animate-pulse"/>
            <span className="text-sm font-mono text-muted-foreground">Trusted by 2 developers</span>
          </div>

      
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none">
              <span className="block">Build</span>
              <span className="block text-primary">
                README
              </span>
              <span className="block">Like a Pro</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-mono">
              {'>'} Generate better READMEs, faster — with AI
              <br />
              {'>'} Ship better docs, faster
            </p>
          </div>

         
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button 
              size="lg" 
              className="text-base px-8 py-4 h-auto bg-purple-600 hover:bg-purple-700 text-white font-mono"
              asChild
            >
              <Link href="/editor">
                ./start-building
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="text-base px-8 py-4 h-auto font-mono border-border/60"
              asChild
            >
              <Link href="https://github.com/AyanAhmadKhan01/FlexReadme" target="_blank">
                <Github className="mr-2 h-4 w-4" />
                View source
              </Link>
            </Button>
          </div>
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="group relative p-6 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                      <IconComponent className="h-5 w-5 text-purple-400" />
                    </div>
                    <h3 className="font-semibold font-mono">{feature.text}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
       </div>
    </section>
  )
}