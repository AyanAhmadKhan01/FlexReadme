'use client'

import { useState } from "react"
import { Copy, Download } from "lucide-react"

interface StatsCardProps {
  username: string
  theme?: string
  showIcons?: boolean
  hideRank?: boolean
  hideBorder?: boolean
  customTitle?: string
}

export default function StatsCard({ 
  username, 
  theme = "default", 
  showIcons = true, 
  hideRank = false,
  hideBorder = false,
  customTitle 
}: StatsCardProps) {
  const [copied, setCopied] = useState(false)

  const themes = {
    default: { bg: "#0d1117", text: "#c9d1d9", accent: "#58a6ff" },
    dark: { bg: "#151515", text: "#ffffff", accent: "#ff6b6b" },
    radical: { bg: "#141321", text: "#a9fef7", accent: "#fe428e" },
    merko: { bg: "#0a0f0b", text: "#68b684", accent: "#abd200" },
    gruvbox: { bg: "#282828", text: "#ebdbb2", accent: "#fabd2f" },
    tokyonight: { bg: "#1a1b27", text: "#a9b1d6", accent: "#7aa2f7" },
    onedark: { bg: "#282c34", text: "#abb2bf", accent: "#61afef" },
    cobalt: { bg: "#193549", text: "#ffffff", accent: "#ffc600" },
    synthwave: { bg: "#2d0b69", text: "#ffffff", accent: "#e2e9ec" }
  }

  const currentTheme = themes[theme as keyof typeof themes] || themes.default

  // Generate the GitHub Stats URL
  const generateStatsUrl = () => {
    const baseUrl = "https://github-readme-stats.vercel.app/api"
    const params = new URLSearchParams({
      username: username,
      theme: theme,
      show_icons: showIcons.toString(),
      hide_rank: hideRank.toString(),
      hide_border: hideBorder.toString(),
    })

    if (customTitle) {
      params.append('custom_title', customTitle)
    }

    return `${baseUrl}?${params.toString()}`
  }

  // Generate markdown code
  const generateMarkdown = () => {
    const url = generateStatsUrl()
    return `![GitHub Stats](${url})`
  }

  const handleCopy = async () => {
    const markdown = generateMarkdown()
    await navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const url = generateStatsUrl()
    const link = document.createElement('a')
    link.href = url
    link.download = `${username}-github-stats.svg`
    link.click()
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">GitHub Stats Card</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="p-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
            title="Copy Markdown"
          >
            <Copy className="h-4 w-4" />
          </button>
          <button
            onClick={handleDownload}
            className="p-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
            title="Download SVG"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="relative mb-6 p-4 bg-muted/30 rounded-lg">
        <div 
          className="rounded-lg p-6 font-mono text-sm"
          style={{ 
            backgroundColor: currentTheme.bg,
            color: currentTheme.text,
            border: hideBorder ? 'none' : `1px solid ${currentTheme.accent}20`
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold" style={{ color: currentTheme.accent }}>
              {customTitle || `${username}'s GitHub Stats`}
            </h3>
            {!hideRank && (
              <div className="text-right">
                <div className="text-xs opacity-70">Rank</div>
                <div className="font-bold" style={{ color: currentTheme.accent }}>A+</div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                {showIcons && <span>🔥</span>}
                <span className="text-xs">Total Stars Earned:</span>
                <span className="font-bold" style={{ color: currentTheme.accent }}>1,234</span>
              </div>
              <div className="flex items-center space-x-2">
                {showIcons && <span>📦</span>}
                <span className="text-xs">Total Commits (2024):</span>
                <span className="font-bold" style={{ color: currentTheme.accent }}>567</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                {showIcons && <span>📋</span>}
                <span className="text-xs">Total PRs:</span>
                <span className="font-bold" style={{ color: currentTheme.accent }}>89</span>
              </div>
              <div className="flex items-center space-x-2">
                {showIcons && <span>🔧</span>}
                <span className="text-xs">Contributed to (last year):</span>
                <span className="font-bold" style={{ color: currentTheme.accent }}>45</span>
              </div>
            </div>
          </div>

          {/* Languages bar */}
          <div className="mt-4">
            <div className="flex h-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 flex-1" style={{ flex: '40' }}></div>
              <div className="bg-yellow-500 flex-1" style={{ flex: '25' }}></div>
              <div className="bg-red-500 flex-1" style={{ flex: '20' }}></div>
              <div className="bg-green-500 flex-1" style={{ flex: '15' }}></div>
            </div>
            <div className="flex justify-between text-xs mt-1 opacity-70">
              <span>JavaScript 40%</span>
              <span>Python 25%</span>
              <span>HTML 20%</span>
              <span>CSS 15%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Code */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Generated Markdown:</label>
          <div className="relative">
            <pre className="bg-muted/50 p-3 rounded text-xs font-mono overflow-x-auto">
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

        <div>
          <label className="block text-sm font-medium mb-2">Direct URL:</label>
          <div className="relative">
            <pre className="bg-muted/50 p-3 rounded text-xs font-mono overflow-x-auto break-all">
              {generateStatsUrl()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
