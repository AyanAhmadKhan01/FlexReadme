'use client'

import { useState } from "react"
import { Copy } from "lucide-react"

interface ContributionGraphProps {
  username: string
}

export default function ContributionGraph({ username }: ContributionGraphProps) {
  const [theme, setTheme] = useState("default")
  const [copied, setCopied] = useState(false)

  const themes = {
    default: "github",
    dark: "github_dark", 
    radical: "radical",
    merko: "merko",
    gruvbox: "gruvbox",
    tokyonight: "tokyonight",
    onedark: "onedark",
    cobalt: "cobalt",
    synthwave: "synthwave",
    dracula: "dracula"
  }

  // Generate contribution graph URL
  const generateGraphUrl = () => {
    return `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${themes[theme as keyof typeof themes]}`
  }

  // Generate activity graph URL 
  const generateActivityUrl = () => {
    return `https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=${themes[theme as keyof typeof themes]}`
  }

  // Generate languages stats URL
  const generateLanguagesUrl = () => {
    return `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&theme=${themes[theme as keyof typeof themes]}&layout=compact`
  }

  const generateMarkdown = () => {
    const streakUrl = generateGraphUrl()
    const activityUrl = generateActivityUrl()
    const languagesUrl = generateLanguagesUrl()
    
    return `## 📊 GitHub Analytics

### 🔥 Streak Stats
![GitHub Streak](${streakUrl})

### 📈 Activity Graph  
![Activity Graph](${activityUrl})

### 🗣️ Most Used Languages
![Top Languages](${languagesUrl})`
  }

  const handleCopy = async () => {
    const markdown = generateMarkdown()
    await navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">GitHub Analytics</h3>
        <div className="flex items-center space-x-2">
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="px-3 py-1 bg-background border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {Object.keys(themes).map((key) => (
              <option key={key} value={key} className="capitalize">{key}</option>
            ))}
          </select>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition-colors"
          >
            <Copy className="h-3 w-3" />
            <span>{copied ? 'Copied!' : 'Copy All'}</span>
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="space-y-6 mb-6">
        {/* Streak Stats */}
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center space-x-2">
            <span>🔥</span>
            <span>Streak Stats</span>
          </h4>
          <div className="p-4 bg-muted/30 rounded-lg">
            <img
              src={generateGraphUrl()}
              alt="GitHub Streak Stats"
              className="max-w-full h-auto mx-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
          </div>
        </div>

        {/* Activity Graph */}
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center space-x-2">
            <span>📈</span>
            <span>Activity Graph</span>
          </h4>
          <div className="p-4 bg-muted/30 rounded-lg">
            <img
              src={generateActivityUrl()}
              alt="GitHub Activity Graph"
              className="max-w-full h-auto mx-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
          </div>
        </div>

        {/* Languages */}
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center space-x-2">
            <span>🗣️</span>
            <span>Most Used Languages</span>
          </h4>
          <div className="p-4 bg-muted/30 rounded-lg">
            <img
              src={generateLanguagesUrl()}
              alt="Top Languages"
              className="max-w-full h-auto mx-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
          </div>
        </div>
      </div>

      {/* Generated Markdown */}
      <div>
        <label className="block text-sm font-medium mb-2">Generated Markdown:</label>
        <div className="relative">
          <pre className="bg-muted/50 p-4 rounded text-xs font-mono overflow-x-auto whitespace-pre-wrap max-h-60">
            {generateMarkdown()}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-1 bg-background/80 hover:bg-background rounded border border-border transition-colors"
          >
            {copied ? '✓' : <Copy className="h-3 w-3" />}
          </button>
        </div>
      </div>

      {/* Individual URLs */}
      <div className="mt-4 space-y-2">
        <details className="group">
          <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            View Individual URLs
          </summary>
          <div className="mt-2 space-y-2">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Streak Stats:</label>
              <pre className="bg-muted/30 p-2 rounded text-xs font-mono overflow-x-auto">{generateGraphUrl()}</pre>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Activity Graph:</label>
              <pre className="bg-muted/30 p-2 rounded text-xs font-mono overflow-x-auto">{generateActivityUrl()}</pre>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Languages:</label>
              <pre className="bg-muted/30 p-2 rounded text-xs font-mono overflow-x-auto">{generateLanguagesUrl()}</pre>
            </div>
          </div>
        </details>
      </div>
    </div>
  )
}
