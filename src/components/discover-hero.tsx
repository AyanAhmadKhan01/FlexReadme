'use client'

import { Search, Sparkles, TrendingUp } from "lucide-react"
import { useState } from "react"

interface DiscoverHeroProps {
  onSearch: (query: string) => void
  onFilterChange: (filter: string) => void
  searchQuery: string
  activeFilter: string
}

export default function DiscoverHero({ onSearch, onFilterChange, searchQuery, activeFilter }: DiscoverHeroProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery)

  const filters = [
    { id: "all", label: "All Templates", count: 142 },
    { id: "trending", label: "Trending", count: 28, icon: TrendingUp },
    { id: "professional", label: "Professional", count: 45 },
    { id: "creative", label: "Creative", count: 32 },
    { id: "minimal", label: "Minimal", count: 37 },
    { id: "portfolio", label: "Portfolio", count: 24 },
    { id: "open-source", label: "Open Source", count: 56 }
  ]

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(localSearch)
  }

  return (
    <section className="relative bg-background overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <div className="absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/5 rotate-12 rounded-3xl blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/5 rotate-45 rounded-3xl blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 border border-purple-500/10 rotate-12 rounded-3xl" />
      </div>

      <div className="container max-w-[1200px] mx-auto px-4 relative z-10 py-20">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-mono text-primary">Image-Based Templates</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            <span className="text-primary">Discover</span>
            <span className="block">README Templates</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
            {'>'} Browse curated README templates with live image previews
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative group/search max-w-2xl mx-auto mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl blur-xl group-hover/search:blur-2xl transition-all duration-300" />
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="flex items-center space-x-4 bg-card/80 backdrop-blur-sm border border-border/60 rounded-xl p-4 group-hover/search:border-primary/30 transition-all duration-300 shadow-lg">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search templates by name, category, or technology..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none font-mono text-sm placeholder:text-muted-foreground"
              />
              <div className="flex items-center space-x-2">
                <div className="px-3 py-1.5 bg-primary/10 rounded-lg text-xs font-mono text-primary border border-primary/20">
                  AI Search
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {filters.map((filter) => {
            const Icon = filter.icon
            const isActive = activeFilter === filter.id
            
            return (
              <button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                className={`group relative flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                  isActive
                    ? 'bg-primary/10 border-primary/30 text-primary'
                    : 'bg-card/50 border-border/60 text-muted-foreground hover:bg-card/80 hover:border-primary/20 hover:text-foreground'
                }`}
              >
                {Icon && <Icon className="h-3 w-3" />}
                <span className="text-sm font-mono">{filter.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                }`}>
                  {filter.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Stats */}
        <div className="text-center">
          <p className="text-sm font-mono text-muted-foreground">
            Showing templates for <span className="text-primary font-semibold">{activeFilter}</span> category
          </p>
        </div>
      </div>
    </section>
  )
}
