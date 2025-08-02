'use client'

import { Heart, Eye, Download, Star, ExternalLink, Github } from "lucide-react"
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
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    createdAt: string
    isPopular?: boolean
    isTrending?: boolean
  }
}

export default function TemplateCard({ template }: TemplateCardProps) {
  const difficultyColors = {
    beginner: 'bg-green-500/10 text-green-400 border-green-500/20',
    intermediate: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    advanced: 'bg-red-500/10 text-red-400 border-red-500/20'
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
  }

  return (
    <div className="group relative rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 overflow-hidden">
      {/* Popular/Trending Badge */}
      {(template.isPopular || template.isTrending) && (
        <div className="absolute top-4 left-4 z-20">
          <div className={`px-3 py-1 rounded-full text-xs font-mono border ${
            template.isTrending 
              ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' 
              : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
          }`}>
            {template.isTrending ? '🔥 Trending' : '⭐ Popular'}
          </div>
        </div>
      )}

      {/* README Image Preview */}
      <div className="relative h-48 overflow-hidden bg-white dark:bg-gray-900 rounded-t-2xl">
        {/* Simulated README Preview Image */}
        <div className="absolute inset-0 p-4 overflow-hidden">
          <div className="w-full h-full bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 shadow-sm">
            {/* GitHub-style README preview */}
            <div className="p-4 space-y-3 text-xs">
              {/* Header with avatar and title */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">{template.title.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white"># {template.title}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-xs">@{template.author.username}</div>
                </div>
              </div>

              {/* Badges Row */}
              <div className="flex space-x-1">
                <div className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-mono">MIT</div>
                <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-mono">v1.0.0</div>
                <div className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-mono">⭐ {template.stats.stars}</div>
              </div>

              {/* Description */}
              <div className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed">
                {template.description.substring(0, 80)}...
              </div>

              {/* Simulated GitHub Stats Image */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded p-3 border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">GitHub Stats</span>
                  <span className="text-xs text-gray-500">⭐ 1.2k</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="font-semibold text-orange-600">245</div>
                    <div className="text-gray-500">Commits</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-600">12</div>
                    <div className="text-gray-500">PRs</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">8</div>
                    <div className="text-gray-500">Issues</div>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
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

        {/* Hover Overlay */}
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

        {/* Preview Label */}
        <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
          README Preview
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate mb-1">{template.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
          </div>
          <div className={`ml-3 px-2 py-1 rounded-lg text-xs font-mono border ${difficultyColors[template.difficulty]}`}>
            {template.difficulty}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {template.tags.slice(0, 4).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted/50 rounded text-xs font-mono text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {template.tags.length > 4 && (
            <span className="px-2 py-1 bg-muted/50 rounded text-xs font-mono text-muted-foreground">
              +{template.tags.length - 4}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Heart className="h-3 w-3" />
              <span>{formatNumber(template.stats.likes)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <span>{formatNumber(template.stats.views)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Download className="h-3 w-3" />
              <span>{formatNumber(template.stats.downloads)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3" />
              <span>{formatNumber(template.stats.stars)}</span>
            </div>
          </div>
        </div>

        {/* Author */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-xs font-mono text-primary">
                {template.author.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-xs font-mono text-foreground">{template.author.name}</p>
              <p className="text-xs text-muted-foreground">@{template.author.username}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-1.5 hover:bg-muted/50 rounded-lg transition-colors group/btn">
              <Heart className="h-3 w-3 text-muted-foreground group-hover/btn:text-red-400 transition-colors" />
            </button>
            <button className="p-1.5 hover:bg-muted/50 rounded-lg transition-colors group/btn">
              <Github className="h-3 w-3 text-muted-foreground group-hover/btn:text-foreground transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
