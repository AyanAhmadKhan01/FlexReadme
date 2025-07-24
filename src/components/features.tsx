'use client'

import { Bot, Edit3, Palette, Zap, Search, Sparkles } from "lucide-react"

export default function Features() {
  const fullText = "Make Modern Cool github Read me"

  const features = [
    {
      icon: Bot,
      title: "AI-Powered Generation",
      description: "Smart content generation with contextual understanding",
      gradient: "from-purple-500/10 to-blue-500/10",
      iconBg: "bg-purple-500/10 group-hover:bg-purple-500/20",
      iconColor: "text-purple-400",
      size: "large",
      hasSearchBar: true
    },
    {
      icon: Edit3,
      title: "Live Editor",
      description: "Real-time markdown editing with instant preview",
      detail: "See your changes instantly with our advanced live preview engine.",
      gradient: "from-blue-500/10 to-cyan-500/10",
      iconBg: "bg-blue-500/10 group-hover:bg-blue-500/20",
      iconColor: "text-blue-400",
      size: "medium",
      hasLiveEditor: true
    },
    {
      icon: Palette,
      title: "Premium Themes",
      description: "Beautiful templates for professional documentation",
      detail: "Choose from professionally designed themes and customize to match your brand.",
      gradient: "from-cyan-500/10 to-purple-500/10",
      iconBg: "bg-cyan-500/10 group-hover:bg-cyan-500/20",
      iconColor: "text-cyan-400",
      size: "medium",
      hasThemePreview: true
    },
    {
      icon: Zap,
      title: "Bento Design",
      description: "Modern grid-based layouts for better organization",
      detail: "Organize content with beautiful bento-style layouts.",
      gradient: "from-yellow-500/10 to-orange-500/10",
      iconBg: "bg-yellow-500/10 group-hover:bg-yellow-500/20",
      iconColor: "text-yellow-400",
      size: "small",
      hasBentoPreview: true
    }
  ]

  return (
    <section className="relative py-32 mt-16 bg-background overflow-hidden">
      {/* Grid Background - matching hero */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <div className="absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      {/* Geometric Elements - matching hero style */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/5 rotate-12 rounded-3xl blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/5 rotate-45 rounded-3xl blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 border border-purple-500/10 rotate-12 rounded-3xl" />
      </div>

      <div className="container max-w-[1200px] mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center space-x-2 bg-muted/80 backdrop-blur-sm border border-border/60 rounded-lg px-4 py-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <span className="text-sm font-mono text-muted-foreground">Features overview</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Everything
            </span>
            <span className="block">You Need</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
            {'>'} Professional tools for modern documentation
          </p>
        </div>

        {/* Bento Grid - 12 column layout matching hero aesthetic */}
        <div className="grid grid-cols-12 gap-10 max-w-8xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            const gridClass = feature.size === 'large' 
              ? 'col-span-12 md:col-span-12 lg:col-span-12 row-span-2 min-h-[500px]' 
              : feature.size === 'medium'
              ? 'col-span-12 md:col-span-6 lg:col-span-6 min-h-[500px]'
              : 'col-span-12 md:col-span-6 lg:col-span-6 min-h-[550px]'
            
            return (
              <div
                key={index}
                className={`group relative p-10 rounded-3xl border border-border/60 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 ${gridClass} overflow-hidden`}
              >
                {/* Dark shadow overlay instead of gradient */}
                <div className="absolute inset-0 rounded-xl bg-black/20 dark:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-2xl" />
                
                {/* AI Search Bar Animation for AI feature */}
                {feature.hasSearchBar && (
                  <div className="absolute inset-0 opacity-100 transition-all duration-700 transform group-hover:scale-105">
                    <div className="absolute inset-2 rounded-xl bg-primary/5 backdrop-blur-xl border border-primary/20 flex flex-col justify-center items-center space-y-8 p-8 pt-20 shadow-2xl">
                      {/* AI Loading Animation - Always show and animate */}
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                        <div className="absolute inset-0 w-12 h-12 rounded-full border border-primary/10 animate-pulse" />
                        <div className="absolute inset-2 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                        </div>
                      </div>
                      
                      {/* Search Input - Bigger */}
                      <div className="relative group/search w-full max-w-md">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl blur-xl group-hover/search:blur-2xl transition-all duration-300" />
                        <div className="relative flex items-center space-x-4 bg-background/80 border border-primary/30 rounded-xl p-6 group-hover/search:border-primary/50 transition-all duration-300 shadow-lg">
                          <Search className="h-6 w-6 text-primary animate-pulse" />
                          <div className="flex-1 font-mono text-base">
                            <span className="text-foreground">{fullText}</span>
                            <span className="text-primary animate-pulse">|</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="px-3 py-1.5 bg-primary/10 rounded-lg text-sm font-mono text-primary border border-primary/20">
                              AI
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* AI Status - Always show */}
                      <div className="text-center">
                        <div className="text-sm font-mono text-primary/80">
                          AI is generating your README...
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Live Editor Animation for Live Editor feature */}
                {feature.hasLiveEditor && (
                  <div className="absolute inset-0 opacity-100 transition-all duration-700 transform group-hover:scale-105">
                    <div className="absolute inset-2 rounded-xl bg-blue-500/5 backdrop-blur-xl border border-blue-500/20 flex flex-col justify-center items-center space-y-10 p-8 pt-24 shadow-2xl">
                      {/* Editor Loading Animation */}
                      <div className="relative mt-8">
                        <div className="w-10 h-10 rounded-lg border-2 border-blue-500/20 border-l-blue-500 animate-spin" />
                        <div className="absolute inset-0 w-10 h-10 rounded-lg border border-blue-500/10 animate-pulse" />
                        <div className="absolute inset-2 w-6 h-6 rounded-sm bg-blue-500/10 flex items-center justify-center">
                          <Edit3 className="h-3 w-3 text-blue-500 animate-pulse" />
                        </div>
                      </div>
                      
                      {/* Live Editor Interface */}
                      <div className="relative group/editor w-full max-w-sm">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/5 rounded-lg blur-xl group-hover/editor:blur-2xl transition-all duration-300" />
                        <div className="relative bg-background/90 border border-blue-500/30 rounded-lg overflow-hidden group-hover/editor:border-blue-500/50 transition-all duration-300 shadow-lg">
                          {/* Editor Header */}
                          <div className="flex items-center justify-between px-3 py-2 bg-blue-500/5 border-b border-blue-500/20">
                            <div className="flex items-center space-x-1.5">
                              <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                            </div>
                            <div className="text-xs font-mono text-blue-400 truncate">README.md</div>
                          </div>
                          
                          {/* Editor Content */}
                          <div className="p-3 space-y-1.5 min-h-[80px]">
                            <div className="flex items-start space-x-2">
                              <span className="text-xs text-blue-400 font-mono flex-shrink-0 w-4">1</span>
                              <div className="flex-1 min-w-0">
                                <span className="text-xs font-mono text-blue-400"># </span>
                                <span className="text-xs font-mono text-foreground">My Project</span>
                                <span className="text-blue-500 animate-pulse">|</span>
                              </div>
                            </div>
                            <div className="flex items-start space-x-2">
                              <span className="text-xs text-blue-400/60 font-mono flex-shrink-0 w-4">2</span>
                              <span className="text-xs font-mono text-muted-foreground flex-1 min-w-0 break-words">Live preview updates...</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <span className="text-xs text-blue-400/60 font-mono flex-shrink-0 w-4">3</span>
                              <span className="text-xs font-mono text-muted-foreground/60 flex-1 min-w-0"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Live Status */}
                      <div className="text-center mt-8">
                        <div className="text-xs font-mono text-blue-400/80">
                          Real-time preview active
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Theme Preview Animation for Premium Themes feature */}
                {feature.hasThemePreview && (
                  <div className="absolute inset-0 opacity-100 transition-all duration-700 transform group-hover:scale-105">
                    <div className="absolute inset-2 rounded-xl bg-cyan-500/5 backdrop-blur-xl border border-cyan-500/20 flex flex-col justify-center items-center space-y-10 p-8 pt-24 shadow-2xl">
                      {/* Theme Loading Animation */}
                      <div className="relative mt-8">
                        <div className="w-10 h-10 rounded-xl border-2 border-cyan-500/20 border-r-cyan-500 animate-spin" />
                        <div className="absolute inset-0 w-10 h-10 rounded-xl border border-cyan-500/10 animate-pulse" />
                        <div className="absolute inset-2 w-6 h-6 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                          <Palette className="h-3 w-3 text-cyan-500 animate-pulse" />
                        </div>
                      </div>
                      
                      {/* Theme Preview Interface */}
                      <div className="relative group/theme w-full max-w-sm">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/5 rounded-lg blur-xl group-hover/theme:blur-2xl transition-all duration-300" />
                        <div className="relative bg-background/90 border border-cyan-500/30 rounded-lg overflow-hidden group-hover/theme:border-cyan-500/50 transition-all duration-300 shadow-lg">
                          {/* Theme Selector Header */}
                          <div className="flex items-center justify-between px-3 py-2 bg-cyan-500/5 border-b border-cyan-500/20">
                            <div className="flex items-center space-x-1.5">
                              <div className="w-5 h-3 bg-purple-400/30 rounded-sm border border-purple-400/50" />
                              <div className="w-5 h-3 bg-blue-400/30 rounded-sm border border-blue-400/50" />
                              <div className="w-5 h-3 bg-cyan-400/30 rounded-sm border border-cyan-400/50 ring-1 ring-cyan-400" />
                            </div>
                            <div className="text-xs font-mono text-cyan-400">Modern</div>
                          </div>
                          
                          {/* Theme Preview Content - Skeleton Layout */}
                          <div className="p-3 space-y-2">
                            {/* Header skeleton */}
                            <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 bg-cyan-400/20 rounded border border-cyan-400/30" />
                              <div className="w-16 h-2 bg-cyan-400/30 rounded" />
                            </div>
                            
                            {/* Content blocks skeleton */}
                            <div className="space-y-1.5">
                              <div className="w-full h-2 bg-foreground/20 rounded" />
                              <div className="w-3/4 h-2 bg-foreground/15 rounded" />
                              <div className="w-1/2 h-2 bg-foreground/10 rounded" />
                            </div>
                            
                            {/* Feature cards skeleton */}
                            <div className="grid grid-cols-2 gap-1.5 mt-2">
                              <div className="h-6 bg-cyan-500/10 rounded border border-cyan-500/20" />
                              <div className="h-6 bg-cyan-500/10 rounded border border-cyan-500/20" />
                            </div>
                            
                            <div className="flex items-center justify-between pt-1">
                              <span className="text-xs font-mono text-muted-foreground">Live Preview</span>
                              <div className="px-2 py-0.5 bg-cyan-500/20 rounded text-xs font-mono text-cyan-400 border border-cyan-500/30">PRO</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Theme Status */}
                      <div className="text-center mt-8">
                        <div className="text-xs font-mono text-cyan-400/80">
                          Premium themes ready
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Bento Design Animation for Bento Design feature */}
                {feature.hasBentoPreview && (
                  <div className="absolute inset-0 opacity-100 transition-all duration-700 transform group-hover:scale-105">
                    <div className="absolute inset-2 rounded-xl bg-yellow-500/5 backdrop-blur-xl border border-yellow-500/20 flex flex-col justify-center items-center space-y-8 p-6 pt-20 shadow-2xl">
                      {/* Bento Loading Animation */}
                      <div className="relative mt-6">
                        <div className="w-10 h-10 rounded-lg border-2 border-yellow-500/20 border-r-yellow-500 animate-spin" />
                        <div className="absolute inset-0 w-10 h-10 rounded-lg border border-yellow-500/10 animate-pulse" />
                        <div className="absolute inset-2 w-6 h-6 rounded-sm bg-yellow-500/10 flex items-center justify-center">
                          <Zap className="h-3 w-3 text-yellow-500 animate-pulse" />
                        </div>
                      </div>
                      {/* Bento Grid Preview - Social/Dev Cards */}
                      <div className="relative group/bento w-full max-w-sm">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/5 rounded-lg blur-xl group-hover/bento:blur-2xl transition-all duration-300" />
                        <div className="relative bg-background/90 border border-yellow-500/30 rounded-lg overflow-hidden group-hover/bento:border-yellow-500/50 transition-all duration-300 shadow-lg">
                          {/* Bento Header */}
                          <div className="flex items-center justify-center px-3 py-2 bg-yellow-500/5 border-b border-yellow-500/20">
                            <div className="text-xs font-mono text-yellow-400">Bento Layout</div>
                          </div>
                          {/* Bento Grid Components - Social/Dev Cards */}
                          <div className="p-3 space-y-2">
                            {/* First Row */}
                            <div className="grid grid-cols-3 gap-1.5 h-6">
                              <div className="col-span-2 bg-blue-500/15 border border-blue-500/25 rounded flex items-center justify-center">
                                <span className="text-xs text-blue-500 font-mono">LinkedIn</span>
                              </div>
                              <div className="bg-gray-900/10 border border-gray-900/20 rounded flex items-center justify-center">
                                <span className="text-xs text-gray-900/80 font-mono">GitHub</span>
                              </div>
                            </div>
                            {/* Second Row */}
                            <div className="grid grid-cols-4 gap-1.5 h-4">
                              <div className="bg-black/10 border border-black/20 rounded flex items-center justify-center">
                                <span className="text-xs text-black font-mono">Portfolio</span>
                              </div>
                              <div className="bg-blue-400/10 border border-blue-400/20 rounded flex items-center justify-center">
                                <span className="text-xs text-blue-400 font-mono">X</span>
                              </div>
                              <div className="col-span-2 bg-green-500/10 border border-green-500/20 rounded flex items-center justify-center">
                                <span className="text-xs text-green-500 font-mono">Contribution</span>
                              </div>
                            </div>
                            {/* Third Row */}
                            <div className="grid grid-cols-3 gap-1.5 h-5">
                              <div className="bg-purple-500/10 border border-purple-500/20 rounded flex items-center justify-center">
                                <span className="text-xs text-purple-500 font-mono">Blog</span>
                              </div>
                              <div className="col-span-2 bg-orange-500/15 border border-orange-500/25 rounded flex items-center justify-center">
                                <span className="text-xs text-orange-500 font-mono">Projects</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-1">
                              <span className="text-xs font-mono text-muted-foreground">Grid System</span>
                              <div className="px-2 py-0.5 bg-yellow-500/20 rounded text-xs font-mono text-yellow-400 border border-yellow-500/30">AUTO</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Bento Status */}
                      <div className="text-center mt-6">
                        <div className="text-xs font-mono text-yellow-400/80">
                          Perfect grid layouts
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="relative space-y-4 h-full flex flex-col z-10">
                  {/* Icon and title - Keep visible on hover */}
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${feature.iconBg} transition-colors`}>
                      <IconComponent className={`h-5 w-5 ${feature.iconColor}`} />
                    </div>
                    <h3 className="font-semibold font-mono text-lg">{feature.title}</h3>
                  </div>
                  
                  {/* Description - Keep visible on hover */}
                  <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Detail for larger cards - Hide on hover */}
                  {feature.size === 'large' && feature.detail && (
                    <div className="mt-auto group-hover:opacity-0 transition-opacity duration-500">
                      <div className="p-4 rounded-lg bg-muted/30 border border-border/40">
                        <p className="text-sm text-muted-foreground font-mono">
                          {feature.detail}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Interactive element matching hero terminal style - Hide on hover */}
                  {!feature.hasSearchBar && !feature.hasLiveEditor && !feature.hasThemePreview && !feature.hasBentoPreview && (
                    <div className="mt-auto pt-4 group-hover:opacity-0 transition-opacity duration-500">
                      <div className="flex items-center space-x-2 text-xs font-mono text-muted-foreground">
                        <span className={`w-2 h-2 rounded-full ${feature.iconColor.replace('text-', 'bg-')}`} />
                        <span>./feature-{index + 1}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA section matching hero style */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-muted/80 backdrop-blur-sm border border-border/60 rounded-lg px-6 py-3">
            <span className="text-sm font-mono text-muted-foreground">
              {'>'} Ready to experience the future of documentation?
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
