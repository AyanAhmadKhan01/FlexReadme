'use client'

import { useState } from "react"
import { User, Download, Copy } from "lucide-react"
import StatsCard from "../../components/readme-generators/stats-card"
import BadgeGenerator from "../../components/readme-generators/badge-generator"
import ContributionGraph from "../../components/readme-generators/contribution-graph"
import SocialLinksGenerator from "../../components/readme-generators/social-links"

export default function GeneratorPage() {
  const [username, setUsername] = useState("octocat")
  const [generatedContent, setGeneratedContent] = useState<string[]>([])
  const [copied, setCopied] = useState(false)

  const addToContent = (content: string) => {
    setGeneratedContent(prev => [...prev, content])
  }

  const clearContent = () => {
    setGeneratedContent([])
  }

  const copyAllContent = async () => {
    const allContent = generatedContent.join('\n\n')
    await navigator.clipboard.writeText(allContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadReadme = () => {
    const content = `# Hi there! 👋

Welcome to my GitHub profile!

${generatedContent.join('\n\n')}

---

⭐ From [${username}](https://github.com/${username})
`
    
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'README.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container max-w-[1400px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">README Image Generator</h1>
              <p className="text-sm text-muted-foreground">Generate beautiful image-based components for your GitHub README</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="GitHub username"
                  className="px-3 py-2 bg-background border border-border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {generatedContent.length > 0 && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={copyAllContent}
                    className="flex items-center space-x-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                    <span>{copied ? 'Copied!' : 'Copy All'}</span>
                  </button>
                  
                  <button
                    onClick={downloadReadme}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download README</span>
                  </button>

                  <button
                    onClick={clearContent}
                    className="px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg text-sm transition-colors"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-[1400px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Generators */}
          <div className="space-y-8">
            {/* GitHub Stats Card */}
            <StatsCard
              username={username}
              theme="default"
              showIcons={true}
              hideRank={false}
              hideBorder={false}
            />

            {/* Badge Generator */}
            <BadgeGenerator onBadgeGenerated={addToContent} />

            {/* Social Links */}
            <SocialLinksGenerator onLinksGenerated={addToContent} />
          </div>

          {/* Right Column - Analytics & Preview */}
          <div className="space-y-8">
            {/* GitHub Analytics */}
            <ContributionGraph username={username} />

            {/* Generated Content Preview */}
            {generatedContent.length > 0 && (
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Generated Content</h3>
                  <div className="text-sm text-muted-foreground">
                    {generatedContent.length} item{generatedContent.length !== 1 ? 's' : ''}
                  </div>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {generatedContent.map((content, index) => (
                    <div key={index} className="p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">Item {index + 1}</span>
                        <button
                          onClick={async () => {
                            await navigator.clipboard.writeText(content)
                          }}
                          className="p-1 hover:bg-muted rounded transition-colors"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                      <pre className="text-xs font-mono whitespace-pre-wrap break-all">
                        {content.length > 200 ? content.substring(0, 200) + '...' : content}
                      </pre>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <div className="relative">
                    <pre className="bg-muted/50 p-4 rounded text-xs font-mono overflow-x-auto whitespace-pre-wrap max-h-40">
                      {generatedContent.join('\n\n')}
                    </pre>
                    <button
                      onClick={copyAllContent}
                      className="absolute top-2 right-2 p-1 bg-background/80 hover:bg-background rounded border border-border transition-colors"
                    >
                      {copied ? '✓' : <Copy className="h-3 w-3" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tips & Instructions */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold text-lg mb-4">💡 Tips</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Enter your GitHub username above to generate personalized stats and graphs</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>All images are generated dynamically and will update automatically</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Copy individual components or download the complete README file</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Mix and match different themes and styles for unique combinations</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Images are hosted on reliable CDNs and work in all README files</span>
                </div>
              </div>
            </div>

            {/* Popular Image Services */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold text-lg mb-4">🔗 Popular Services</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>GitHub Stats</span>
                  <code className="text-xs bg-muted px-2 py-1 rounded">github-readme-stats</code>
                </div>
                <div className="flex items-center justify-between">
                  <span>Streak Stats</span>
                  <code className="text-xs bg-muted px-2 py-1 rounded">github-readme-streak-stats</code>
                </div>
                <div className="flex items-center justify-between">
                  <span>Activity Graph</span>
                  <code className="text-xs bg-muted px-2 py-1 rounded">github-readme-activity-graph</code>
                </div>
                <div className="flex items-center justify-between">
                  <span>Badges</span>
                  <code className="text-xs bg-muted px-2 py-1 rounded">shields.io</code>
                </div>
                <div className="flex items-center justify-between">
                  <span>Typing Animation</span>
                  <code className="text-xs bg-muted px-2 py-1 rounded">readme-typing-svg</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
