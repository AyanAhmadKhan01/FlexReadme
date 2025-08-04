'use client'

import { Sparkles } from "lucide-react"

export default function DiscoverHero(){
 
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <div className="absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/5 rotate-12 rounded-3xl blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/5 rotate-45 rounded-3xl blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 border border-purple-500/10 rotate-12 rounded-3xl" />
      </div>

      <div className="container max-w-[1200px] mx-auto px-4 relative z-10 pt-20">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-mono text-primary">Newest Templates</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            <span className="text-primary">Discover</span>
            <span className="block">README Templates</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
            {'>'} Browse curated README templates with live image previews
          </p>
        </div>
      </div>
    </section>
  )
}
