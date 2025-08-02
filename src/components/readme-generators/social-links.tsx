'use client'

import { useState } from "react"
import { Copy, Plus, X, Link as LinkIcon } from "lucide-react"

interface SocialLink {
  id: string
  platform: string
  url: string
  username: string
  color: string
  icon: string
}

interface SocialLinksGeneratorProps {
  onLinksGenerated?: (links: string) => void
}

export default function SocialLinksGenerator({ onLinksGenerated }: SocialLinksGeneratorProps) {
  const [links, setLinks] = useState<SocialLink[]>([])
  const [copied, setCopied] = useState(false)
  const [style, setStyle] = useState<'badges' | 'icons' | 'buttons'>('badges')

  const platforms = [
    { name: "GitHub", color: "100000", icon: "github", placeholder: "username" },
    { name: "LinkedIn", color: "0077B5", icon: "linkedin", placeholder: "username" },
    { name: "Twitter", color: "1DA1F2", icon: "twitter", placeholder: "username" },
    { name: "Instagram", color: "E4405F", icon: "instagram", placeholder: "username" },
    { name: "YouTube", color: "FF0000", icon: "youtube", placeholder: "channel" },
    { name: "Discord", color: "7289DA", icon: "discord", placeholder: "username#1234" },
    { name: "Telegram", color: "2CA5E0", icon: "telegram", placeholder: "username" },
    { name: "Email", color: "D14836", icon: "gmail", placeholder: "email@example.com" },
    { name: "Website", color: "4285F4", icon: "googlechrome", placeholder: "website.com" },
    { name: "Portfolio", color: "FF7139", icon: "aboutdotme", placeholder: "portfolio.com" },
    { name: "Medium", color: "12100E", icon: "medium", placeholder: "username" },
    { name: "Dev.to", color: "0A0A0A", icon: "devdotto", placeholder: "username" },
    { name: "Stack Overflow", color: "FE7A16", icon: "stackoverflow", placeholder: "userid" },
    { name: "CodePen", color: "000000", icon: "codepen", placeholder: "username" },
    { name: "Dribbble", color: "EA4C89", icon: "dribbble", placeholder: "username" },
    { name: "Behance", color: "1769FF", icon: "behance", placeholder: "username" }
  ]

  const [currentLink, setCurrentLink] = useState({
    platform: "GitHub",
    username: "",
    url: ""
  })

  const getCurrentPlatform = () => {
    return platforms.find(p => p.name === currentLink.platform) || platforms[0]
  }

  const generateUrl = (platform: string, username: string, customUrl?: string) => {
    if (customUrl) return customUrl

    const urlMap: Record<string, string> = {
      "GitHub": `https://github.com/${username}`,
      "LinkedIn": `https://linkedin.com/in/${username}`,
      "Twitter": `https://twitter.com/${username}`,
      "Instagram": `https://instagram.com/${username}`,
      "YouTube": `https://youtube.com/c/${username}`,
      "Discord": `https://discord.gg/${username}`,
      "Telegram": `https://t.me/${username}`,
      "Email": `mailto:${username}`,
      "Website": `https://${username}`,
      "Portfolio": `https://${username}`,
      "Medium": `https://medium.com/@${username}`,
      "Dev.to": `https://dev.to/${username}`,
      "Stack Overflow": `https://stackoverflow.com/users/${username}`,
      "CodePen": `https://codepen.io/${username}`,
      "Dribbble": `https://dribbble.com/${username}`,
      "Behance": `https://behance.net/${username}`
    }

    return urlMap[platform] || `https://${username}`
  }

  const generateBadgeMarkdown = (link: SocialLink) => {
    const platform = platforms.find(p => p.name === link.platform)!
    return `[![${link.platform}](https://img.shields.io/badge/${link.platform}-${link.color}?style=for-the-badge&logo=${platform.icon}&logoColor=white)](${link.url})`
  }

  const generateIconMarkdown = (link: SocialLink) => {
    return `[<img src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/${getCurrentPlatform().icon}.svg" alt="${link.platform}" height="30">](${link.url})`
  }

  const generateButtonMarkdown = (link: SocialLink) => {
    return `<a href="${link.url}"><img src="https://img.shields.io/badge/-${link.platform}-${link.color}?style=flat&logo=${getCurrentPlatform().icon}" alt="${link.platform}"></a>`
  }

  const generateMarkdown = (linksList: SocialLink[] = links) => {
    if (linksList.length === 0) return ""

    let markdown = "## 🌐 Connect with me:\n\n"
    
    if (style === 'badges') {
      markdown += linksList.map(generateBadgeMarkdown).join('\n')
    } else if (style === 'icons') {
      markdown += '<p align="center">\n'
      markdown += linksList.map(generateIconMarkdown).join(' ')
      markdown += '\n</p>'
    } else {
      markdown += '<p align="center">\n'
      markdown += linksList.map(generateButtonMarkdown).join(' ')
      markdown += '\n</p>'
    }

    return markdown
  }

  const addLink = () => {
    if (!currentLink.username) return

    const platform = getCurrentPlatform()
    const url = currentLink.url || generateUrl(currentLink.platform, currentLink.username)
    
    const newLink: SocialLink = {
      id: Date.now().toString(),
      platform: currentLink.platform,
      url,
      username: currentLink.username,
      color: platform.color,
      icon: platform.icon
    }

    const newLinks = [...links, newLink]
    setLinks(newLinks)
    
    if (onLinksGenerated) {
      onLinksGenerated(generateMarkdown(newLinks))
    }

    // Reset form
    setCurrentLink({ platform: "GitHub", username: "", url: "" })
  }

  const removeLink = (id: string) => {
    const newLinks = links.filter(link => link.id !== id)
    setLinks(newLinks)
  }

  const copyMarkdown = async () => {
    const markdown = generateMarkdown()
    await navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">Social Links</h3>
        <div className="flex items-center space-x-2">
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value as 'badges' | 'icons' | 'buttons')}
            className="px-3 py-1 bg-background border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="badges">Badges</option>
            <option value="icons">Icons</option>
            <option value="buttons">Buttons</option>
          </select>
          {links.length > 0 && (
            <button
              onClick={copyMarkdown}
              className="flex items-center space-x-2 px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition-colors"
            >
              <Copy className="h-3 w-3" />
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Add Link Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Platform</label>
          <select
            value={currentLink.platform}
            onChange={(e) => setCurrentLink({ ...currentLink, platform: e.target.value })}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {platforms.map(platform => (
              <option key={platform.name} value={platform.name}>{platform.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Username/Handle</label>
          <input
            type="text"
            value={currentLink.username}
            onChange={(e) => setCurrentLink({ ...currentLink, username: e.target.value })}
            placeholder={getCurrentPlatform().placeholder}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Custom URL (optional)</label>
          <input
            type="text"
            value={currentLink.url}
            onChange={(e) => setCurrentLink({ ...currentLink, url: e.target.value })}
            placeholder="https://..."
            className="w-full px-3 py-2 bg-background border border-border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={addLink}
            disabled={!currentLink.username}
            className="w-full flex items-center justify-center space-x-2 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Preview */}
      {links.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3">Preview</h4>
          <div className="p-4 bg-muted/30 rounded-lg">
            {style === 'badges' && (
              <div className="space-y-2">
                {links.map(link => (
                  <img
                    key={link.id}
                    src={`https://img.shields.io/badge/${link.platform}-${link.color}?style=for-the-badge&logo=${link.icon}&logoColor=white`}
                    alt={link.platform}
                    className="inline-block mr-2"
                  />
                ))}
              </div>
            )}
            
            {style === 'icons' && (
              <div className="flex items-center justify-center space-x-4">
                {links.map(link => (
                  <div
                    key={link.id}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: `#${link.color}` }}
                  >
                    {link.platform.charAt(0)}
                  </div>
                ))}
              </div>
            )}

            {style === 'buttons' && (
              <div className="flex flex-wrap gap-2 justify-center">
                {links.map(link => (
                  <img
                    key={link.id}
                    src={`https://img.shields.io/badge/-${link.platform}-${link.color}?style=flat&logo=${link.icon}`}
                    alt={link.platform}
                    className="h-6"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Added Links */}
      {links.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3">Added Links ({links.length})</h4>
          <div className="space-y-2">
            {links.map(link => (
              <div key={link.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: `#${link.color}` }}
                  >
                    {link.platform.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{link.platform}</div>
                    <div className="text-xs text-muted-foreground font-mono">{link.username}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 hover:bg-muted rounded transition-colors"
                  >
                    <LinkIcon className="h-3 w-3" />
                  </a>
                  <button
                    onClick={() => removeLink(link.id)}
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

      {/* Generated Markdown */}
      {links.length > 0 && (
        <div>
          <label className="block text-sm font-medium mb-2">Generated Markdown:</label>
          <div className="relative">
            <pre className="bg-muted/50 p-4 rounded text-xs font-mono overflow-x-auto whitespace-pre-wrap max-h-40">
              {generateMarkdown()}
            </pre>
            <button
              onClick={copyMarkdown}
              className="absolute top-2 right-2 p-1 bg-background/80 hover:bg-background rounded border border-border transition-colors"
            >
              {copied ? '✓' : <Copy className="h-3 w-3" />}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
