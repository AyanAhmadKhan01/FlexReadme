import Link from "next/link"
import { ArrowRight, Github, Code2, Terminal, Cpu, Grid3X3 } from "lucide-react"
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
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <div className="absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      {/* Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/5 rotate-45 rounded-3xl blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-500/5 rotate-12 rounded-3xl blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-purple-500/10 rotate-45 rounded-3xl" />
      </div>

      <div className="container max-w-[1200px] mx-auto px-4 py-32 relative z-10">
        {/* Main Content */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2 bg-muted/80 backdrop-blur-sm border border-border/60 rounded-lg px-4 py-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-mono text-muted-foreground">System operational</span>
          </div>

          {/* Hero Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none">
              <span className="block">Build</span>
              <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                README
              </span>
              <span className="block">Like a Pro</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-mono">
              {'>'} Modern markdown editor for professional documentation
              <br />
              {'>'} Ship better docs, faster
            </p>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button 
              size="lg" 
              className="text-base px-8 py-6 h-auto bg-purple-600 hover:bg-purple-700 text-white font-mono"
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
              className="text-base px-8 py-6 h-auto font-mono border-border/60"
              asChild
            >
              <Link href="https://github.com/yourusername/flexreadme" target="_blank">
                <Github className="mr-2 h-4 w-4" />
                View source
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
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

        {/* Terminal Mock */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm overflow-hidden">
            <div className="flex items-center space-x-2 px-4 py-3 bg-muted/50 border-b border-border/60">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-sm font-mono text-muted-foreground ml-4">flexreadme-editor.md</span>
            </div>
            <div className="p-6 font-mono text-sm">
              <div className="space-y-2">
                <div className="flex">
                  <span className="text-purple-400">1</span>
                  <span className="ml-4 text-blue-400"># FlexReadme</span>
                </div>
                <div className="flex">
                  <span className="text-purple-400">2</span>
                  <span className="ml-4 text-muted-foreground">Beautiful documentation made simple</span>
                </div>
                <div className="flex">
                  <span className="text-purple-400">3</span>
                  <span className="ml-4"></span>
                </div>
                <div className="flex">
                  <span className="text-purple-400">4</span>
                  <span className="ml-4 text-green-400">## Features</span>
                </div>
                <div className="flex">
                  <span className="text-purple-400">5</span>
                  <span className="ml-4 text-muted-foreground">- Live preview</span>
                </div>
                <div className="flex">
                  <span className="text-purple-400">6</span>
                  <span className="ml-4 text-muted-foreground">- Smart templates</span>
                </div>
                <div className="flex">
                  <span className="text-purple-400">7</span>
                  <span className="ml-4 text-yellow-400 animate-pulse">|</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}