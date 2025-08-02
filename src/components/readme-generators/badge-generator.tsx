'use client'

import { useState } from "react"
import { Copy, Plus, X } from "lucide-react"

interface BadgeGeneratorProps {
  onBadgeGenerated?: (badge: string) => void
}

export default function BadgeGenerator({ onBadgeGenerated }: BadgeGeneratorProps) {
  const [badges, setBadges] = useState<Array<{
    id: string
    label: string
    message: string
    color: string
    style: string
    logo?: string
  }>>([])

  const [currentBadge, setCurrentBadge] = useState({
    label: "license",
    message: "MIT",
    color: "blue",
    style: "flat",
    logo: ""
  })

  const [copied, setCopied] = useState<string | null>(null)

  const badgeStyles = [
    { value: "flat", label: "Flat" },
    { value: "flat-square", label: "Flat Square" },
    { value: "plastic", label: "Plastic" },
    { value: "for-the-badge", label: "For the Badge" },
    { value: "social", label: "Social" }
  ]

  const predefinedColors = [
    "brightgreen", "green", "yellowgreen", "yellow", "orange", "red", 
    "lightgrey", "blue", "blueviolet", "ff69b4", "9cf", "success",
    "important", "critical", "informational", "inactive"
  ]

  const commonBadges = [
    { label: "license", message: "MIT", color: "blue" },
    { label: "version", message: "v1.0.0", color: "brightgreen" },
    { label: "build", message: "passing", color: "success" },
    { label: "coverage", message: "95%", color: "brightgreen" },
    { label: "downloads", message: "1k/month", color: "blue" },
    { label: "stars", message: "⭐ 100", color: "yellow" },
    { label: "issues", message: "0 open", color: "brightgreen" },
    { label: "PRs", message: "welcome", color: "brightgreen" },
    { label: "TypeScript", message: "strict", color: "blue" },
    { label: "React", message: "18.x", color: "61DAFB" },
    { label: "Next.js", message: "14.x", color: "000000" },
    { label: "Tailwind", message: "CSS", color: "06B6D4" },
  ]

  const generateBadgeUrl = (badge: { label: string; message: string; color: string; style: string; logo?: string }) => {
    const baseUrl = "https://img.shields.io/badge"
    let url = `${baseUrl}/${encodeURIComponent(badge.label)}-${encodeURIComponent(badge.message)}-${badge.color}`
    
    const params = new URLSearchParams()
    if (badge.style !== "flat") params.append("style", badge.style)
    if (badge.logo) params.append("logo", badge.logo)
    
    return params.toString() ? `${url}?${params.toString()}` : url
  }

  const generateMarkdown = (badge: { label: string; message: string; color: string; style: string; logo?: string }) => {
    const url = generateBadgeUrl(badge)
    return `![${badge.label}](${url})`
  }

  const addBadge = () => {
    const newBadge = {
      ...currentBadge,
      id: Date.now().toString()
    }
    setBadges([...badges, newBadge])
    if (onBadgeGenerated) {
      onBadgeGenerated(generateMarkdown(newBadge))
    }
  }

  const removeBadge = (id: string) => {
    setBadges(badges.filter(badge => badge.id !== id))
  }

  const copyBadge = async (badge: { label: string; message: string; color: string; style: string; logo?: string }, id?: string) => {
    const markdown = generateMarkdown(badge)
    await navigator.clipboard.writeText(markdown)
    setCopied(id || 'current')
    setTimeout(() => setCopied(null), 2000)
  }

  const copyAllBadges = async () => {
    const allMarkdown = badges.map(badge => generateMarkdown(badge)).join('\n')
    await navigator.clipboard.writeText(allMarkdown)
    setCopied('all')
    setTimeout(() => setCopied(null), 2000)
  }

  const addCommonBadge = (badge: { label: string, message: string, color: string }) => {
    const newBadge = {
      ...badge,
      id: Date.now().toString(),
      style: currentBadge.style,
      logo: ""
    }
    setBadges([...badges, newBadge])
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">Badge Generator</h3>
        {badges.length > 0 && (
          <button
            onClick={copyAllBadges}
            className="flex items-center space-x-2 px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition-colors"
          >
            <Copy className="h-3 w-3" />
            <span>{copied === 'all' ? 'Copied!' : 'Copy All'}</span>
          </button>
        )}
      </div>

      {/* Quick Add Common Badges */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Quick Add:</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {commonBadges.map((badge, index) => (
            <button
              key={index}
              onClick={() => addCommonBadge(badge)}
              className="p-2 text-left text-xs bg-muted/50 hover:bg-muted rounded border border-border hover:border-primary/30 transition-colors"
            >
              <div className="font-mono">{badge.label}</div>
              <div className="text-muted-foreground">{badge.message}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Badge Builder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Label</label>
            <input
              type="text"
              value={currentBadge.label}
              onChange={(e) => setCurrentBadge({ ...currentBadge, label: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="license"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <input
              type="text"
              value={currentBadge.message}
              onChange={(e) => setCurrentBadge({ ...currentBadge, message: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="MIT"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
            <div className="flex space-x-2">
              <select
                value={currentBadge.color}
                onChange={(e) => setCurrentBadge({ ...currentBadge, color: e.target.value })}
                className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {predefinedColors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
              <input
                type="text"
                value={currentBadge.color}
                onChange={(e) => setCurrentBadge({ ...currentBadge, color: e.target.value })}
                className="w-20 px-3 py-2 bg-background border border-border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="hex"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Style</label>
            <select
              value={currentBadge.style}
              onChange={(e) => setCurrentBadge({ ...currentBadge, style: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {badgeStyles.map(style => (
                <option key={style.value} value={style.value}>{style.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Logo (optional)</label>
            <input
              type="text"
              value={currentBadge.logo}
              onChange={(e) => setCurrentBadge({ ...currentBadge, logo: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="github, react, typescript..."
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Preview</label>
            <div className="p-4 bg-muted/30 rounded-lg">
              <img
                src={generateBadgeUrl(currentBadge)}
                alt="Badge preview"
                className="max-w-full h-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Markdown</label>
            <div className="relative">
              <pre className="bg-muted/50 p-3 rounded text-xs font-mono overflow-x-auto">
                {generateMarkdown(currentBadge)}
              </pre>
              <button
                onClick={() => copyBadge(currentBadge)}
                className="absolute top-2 right-2 p-1 bg-background/80 hover:bg-background rounded border border-border transition-colors"
              >
                {copied === 'current' ? '✓' : <Copy className="h-3 w-3" />}
              </button>
            </div>
          </div>

          <button
            onClick={addBadge}
            disabled={!currentBadge.label || !currentBadge.message}
            className="w-full flex items-center justify-center space-x-2 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Badge</span>
          </button>
        </div>
      </div>

      {/* Generated Badges */}
      {badges.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-3">Generated Badges ({badges.length})</h4>
          <div className="space-y-3">
            {badges.map((badge) => (
              <div key={badge.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img
                    src={generateBadgeUrl(badge)}
                    alt={`${badge.label} badge`}
                    className="max-w-full h-auto"
                  />
                  <div className="text-xs font-mono text-muted-foreground">
                    {badge.label} • {badge.message}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => copyBadge(badge, badge.id)}
                    className="p-1 hover:bg-muted rounded transition-colors"
                  >
                    {copied === badge.id ? '✓' : <Copy className="h-3 w-3" />}
                  </button>
                  <button
                    onClick={() => removeBadge(badge.id)}
                    className="p-1 hover:bg-red-500/20 text-red-400 rounded transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
