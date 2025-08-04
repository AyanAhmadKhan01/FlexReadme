'use client'

import { Eye, ExternalLink, Github } from "lucide-react"
import Link from "next/link"

interface TemplateCardProps {
  template: {
    id: string
    title: string
    description: string
    preview: string
    category: string
    tags: string[]
    stats: {
      likes: number
      views: number
      downloads: number
      stars: number
    }
    author: {
      name: string
      avatar: string
      username: string
    }
    createdAt: string
    isPopular?: boolean
    isTrending?: boolean
  }
}

export default function TemplateCard({ template }: TemplateCardProps) {
  return (
    <div className="group relative rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 overflow-hidden">
    
      <div className="relative h-48 overflow-hidden bg-white dark:bg-gray-900 rounded-t-2xl">
        <div className="absolute inset-0 p-4 overflow-hidden">
          <div className="w-full h-full bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="p-4 space-y-3 text-xs">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">{template.title.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white"># {template.title}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-xs">@{template.author.username}</div>
                </div>
              </div>
            
              <div className="flex space-x-1">
                <div className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-mono">MIT</div>
                <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-mono">v1.0.0</div>
                <div className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-mono">⭐ {template.stats.stars}</div>
              </div>
     
              <div className="flex space-x-1">
                {template.tags.slice(0, 3).map((tag, i) => (
                  <div key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-2">
            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
              <Eye className="h-4 w-4 text-white" />
            </button>
            <Link 
              href={`/discover/${template.id}`}
              className="p-2 bg-primary/80 backdrop-blur-sm rounded-lg hover:bg-primary transition-colors"
            >
              <ExternalLink className="h-4 w-4 text-white" />
            </Link>
          </div>
        </div>

        <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
          README Preview
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate mb-1">{template.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-xs font-mono text-primary">
                {template.author.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-xs font-mono text-foreground">{template.author.name}</p>        
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-1.5 hover:bg-muted/50 rounded-lg transition-colors group/btn">
              <Github className="h-3 w-3 text-muted-foreground group-hover/btn:text-foreground transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
